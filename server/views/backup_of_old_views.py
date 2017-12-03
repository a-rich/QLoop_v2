import json
import os
from bson import Binary
from __main__ import app
from flask import request, session, redirect, url_for, render_template, flash, send_from_directory
from models import db, User, Song
from util import send_email, allowed_file
from itsdangerous import URLSafeTimedSerializer
from werkzeug import secure_filename
from queue_manager import Booth, BoothRegistry

ts = URLSafeTimedSerializer(app.config['SECRET_KEY'])  # Tokenize acct. mgmt. emails
booth_registry = BoothRegistry()


"""
   ***************************************************************
    Creating, recovering, fetching, and updating a user's profile
   ***************************************************************
"""


@app.route('/api/users/new/', methods=['POST'])
def create_account():
    """
        Tokenize user's email, username, and password and then send an email
        confirmation link.

    """
    # TODO: use Celery to make `send_email` asynchronous

    req = request.get_json()
    email = req['email']
    username = req['username']
    password = req['password']

    errors = User.check_for_existing_user(email, username)

    if not errors:
        token = ts.dumps(
                {'email':email,
                 'username': username,
                 'password': password},
                salt='account-creation-key')
        email_url = url_for(
                'confirm_account_creation',
                token=token,
                _external=True)
        subject = 'Confirm your new QLoop account'
        html = render_template(
                'account_activation.html',
                email_url=email_url)
        try:
            send_email(email, subject, html)
        except:
            errors['confirmation_email'] = 'Failed to send confirmation email...please try again.'

    return json.dumps({'errors': errors})


@app.route('/api/users/confirm_account_creation/<token>/', methods=['GET'])
def confirm_account_creation(token):
    """
        Upon email confirmation, add new user to the User collection.
    """
    # TODO: redirect to React component for login
    #       if errors, log errors

    try:
        token = ts.loads(token, salt='account-creation-key', max_age=21600)
    except:
        abort(404)

    try:
        User.objects.get(email=token['email'])
        errors = {'user': 'User already exists.'}
    except:
        User(
            email=token['email'],
            username=token['username'],
            password=token['password']).save()

    return redirect('http://www.google.com')


@app.route('/api/users/reset_password/', methods=['POST'])
def recover_account():
    """
        Send recovery email to user so they may reset their password.
    """

    errors = {}
    email = request.get_json()['email']
    resp = User.check_for_existing_user(email, None)

    if not resp['email']:
       errors['email'] = 'No account has been created using that email.'
    else:
        token = ts.dumps(
                email,
                salt='account-recovery-key')
        recovery_url = url_for(
                'confirm_account_recovery',
                token=token,
                _external=True)
        subject = 'Reset your QLoop account password'
        html = render_template(
                'account_recovery.html',
                recovery_url=recovery_url)
        try:
            send_email(email, subject, html)
        except:
            errors['recovery'] = 'Failed to send account recovery email...please try again.'

    return json.dumps({'errors': errors})


@app.route('/api/users/reset_password/<token>/', methods=['GET', 'POST'])
def confirm_account_recovery(token):
    """
        Upon account recovery confirmation, redirect to the React component
        that sends a POST with an updated password.

        When React component for password reset POSTs the new password,
        deserialize the accompanying token, find the user in the User model,
        and then update their document to reflect the new password.
    """
    # TODO: redirect to React component WITH token for password reset

    if request.method == 'GET':
        return redirect('http://www.google.com')

    errors = {}
    password = request.get_json()['password']

    try:
        email = ts.loads(token, salt='account-recovery-key', max_age=21600)
    except:
        abort(404)

    try:
        user = User.objects.get(email=email)
        user.update(password=password)
    except:
        errors['password_reset'] = 'Invalid credentials...please try again.'

    return json.dumps({'errors': errors})


@app.route('/api/users/', methods=['POST'])
def fetch_profile():
    """
        Fetch user info: pic, username, email, friends, and favorite songs. To
        fetch the profile pic, put the path specified in the GET_IMAGE route as
        the src for the IMG tag substituting <path:filename> with the path
        returned as the PROFILE_PIC attribute in this method's JSON response.

    """

    errors = {}

    try:
        req = request.get_json()
        user = User.objects.get(email=req['email'], password=req['password'])
        data = {
            'profile_pic': user.profile_pic,
            'email': user.email,
            'favorite_songs': user.favorite_songs_list,
            'friends': user.friends_list
        }
        session['user'] = user.to_json()
    except:
        errors['login'] = 'Invalid credentials...please try again.'
        data = {}

    return json.dumps({'errors': errors, 'data': data, 'token': "ToBeReplacedWithActualJWT"})


@app.route('/api/users/edit_profile/', methods=['PUT'])
def edit_profile():
    """
        Update user's profile image.

    """
    # TODO: figure out how to force client browser to refresh user in session

    errors = {}
    user = User.from_json(session['user'])

    if request.files:
        img = request.files[''] if request.files[''] else request.files['files']
        path = app.config['UPLOAD_FOLDER'] + user.username + "-" + secure_filename(img.filename)
        img.save(path)

        try:
            os.remove(user.profile_pic)
        except:
            pass

        user.update(profile_pic=path)

    session['user'] = user.to_json()

    return json.dumps({'errors': {}})


@app.route('/api/static/<path:filename>', methods=['GET'])
def get_image(filename):
    """
        Serves user profile images to front end.
    """

    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/api/users/find_users/', methods=['POST'])
def find_users():
    """
        Returns the list of users in the User model whose username or email
        match the search string.
    """

    search_string = request.get_json()['query']
    users = User.objects(Q(username=search_string)
            or Q(email=search_string)).only('username', 'email')

    return json.dumps({'data': users})


@app.route('/api/users/add_friend/', methods=['POST'])
def add_friend():
    """
        Add user FID to user's friends.
    """

    errors = {}
    friend_email = request.get_json()['email']
    friend = User.objects.get(email=friend_email)

    if not friend:
        errors['add_friend'] = 'There is no user with that email.'
        return json.dumps({'errors': errors})

    user = User.from_json(session['user'])
    if friend.id not in [User.from_json(f).id for f in user.friends_list]:
        user.update(push__friends_list=friend.to_json())

    return json.dumps({'errors': errors})


@app.route('/api/users/remove_friend/', methods=['POST'])
def remove_friend():
    """
        Remove user FID from user's friends.
    """

    errors = {}
    friend_email = request.get_json()['email']
    friend = User.objects.get(email=friend_email)

    if not friend:
        errors['remove_friend'] = 'There is no user with that email.'
        return json.dumps({'errors': errors})

    user = User.from_json(session['user'])
    if friend.id in [User.from_json(f).id for f in user.friends_list]:
        user.update(pull__friends_list=friend.to_json())

    return json.dumps({'errors': errors})


@app.route('/api/users/remove_song/', methods=['POST'])
def remove_song():
    """
        Remove song SID from user's favorite songs.
    """

    song = request.get_json()['sid']
    user = User.from_json(session['user'])
    user.update(pull__favorite_songs_list=song)

    return json.dumps({})



"""
   ***************************************
    Creating, finding, and joining booths
   ***************************************
"""


@app.route('/api/create_booth/', methods=['POST'])
def create_booth():
    """
        Create a new booth using the request's ACCESS_LEVEL parameter and the
        name of the user stored in the session. Returns the booth ID of the
        newly created booth.
    """

    req = request.get_json()
    access_level = req['access_level']
    user = User.from_json(session['user'])
    bid = booth_registry.add_booth(user.username, access_level)
    user.update(creator_status=bid) # Use BID as req param for JOIN_BOOTH view
    return json.dumps({'booth_id': bid})


@app.route('/api/booths/', methods=['GET'])
def fetch_public_booths():
    """
        Fetch all the public and password protected booths. Returns a list of
        tuples of the form (BOOTH_ID, CREATOR, CURRENT_SONG, ACCESS_LEVEL).
    """

    data = booth_registry.show_booths()
    return json.dumps({'data': data})


@app.route('/api/booths/<bid>/', methods=['GET'])
def join_booth(bid):
    """
        Join a booth by adding the username of the user stored in the session
        into that booth's DJ list. Requires the booth ID. Returns the relevant
        details needed to render the booth view.
    """

    user = User.from_json(session['user'])
    booth_details = booth_registry.join_booth(bid, user.username)
    return json.dumps({'data': booth_details})



"""
   *****************************************
    Queuing, favoriting, and skipping songs
   *****************************************
"""


@app.route('/api/booth/enqueue/', methods=['POST'])
def enqueue_song():
    """
    """

    pass


@app.route('/api/booth/favorite/', methods=['POST'])
def favorite_song():
    """
    """

    pass


@app.route('/api/booth/skip/', methods=['POST'])
def skip_song():
    """
    """

    pass



"""
   ****************************************
    Toggle song selection and audio stream
   ****************************************
"""


@app.route('/api/booth/toggle_selection/', methods=['POST'])
def toggle_selection():
    """
    """

    pass


@app.route('/api/booth/toggle_audio/', methods=['POST'])
def toggle_audio():
    """
    """

    pass
