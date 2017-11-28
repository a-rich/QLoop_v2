import json
from bson import Binary
from __main__ import app
from flask import request, session, redirect, url_for, render_template, flash, send_from_directory
from models import db, User, Song
from util import send_email, allowed_file
from itsdangerous import URLSafeTimedSerializer
from werkzeug import secure_filename

ts = URLSafeTimedSerializer(app.config['SECRET_KEY'])  # Tokenize acct. mgmt. emails


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

        TODO: use Celery to make `send_email` asynchronous
    """

    email = request.get_json()['email']
    username = request.get_json()['username']
    password = request.get_json()['password']

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

        TODO: * redirect to React component for login
              * if errors, log errors
    """

    try:
        user = ts.loads(token, salt='account-creation-key', max_age=21600)
    except:
        abort(404)

    try:
        User.objects.get(email=user['email'])
        errors = {'user': 'User already exists.'}
    except:
        User(
            email=user['email'],
            username=user['username'],
            password=user['password']).save()

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

        TODO: redirect to React component WITH token for password reset
    """

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


@app.route('/api/user/', methods=['POST'])
def fetch_profile():
    """
        Fetch user info: pic, email, friends, and favorite songs.

        TODO: return data about friend's online/creator status
    """

    errors = {}

    try:
        user = User.objects.get(
                email=request.get_json()['email'],
                password=request.get_json()['password'])
        data = {
            'email': user.email,
            'favorite_songs': user.favorite_songs_list,
            'friends': user.friends_list
        }
        session['user'] = user.to_json()
    except:
        errors['login'] = 'Invalid credentials...please try again.'
        data = {}

    return json.dumps({'errors': errors, 'data': data, 'token': "ToBeReplacedWithActualJWT"})


@app.route('/api/user/edit_profile/', methods=['PUT'])
def edit_profile():
    """
        Update user's email and/or profile image.

        TODO: figure out how to force client browser to refresh user in session
    """

    errors = {}
    user = User.from_json(session['user'])

    if request.files:
        img = request.files[''] if request.files[''] else request.files['files']
        path = app.config['UPLOAD_FOLDER'] + user.username + "-" + secure_filename(img.filename)
        img.save(path)
        user.update(profile_pic=path)

        # TODO: Remove old image file

    if request.get_json():
        try:
            old_password = request.get_json()['old_password']
            new_password = request.get_json()['new_password']
        except:
            errors['password'] = 'Must supply both old and new passwords.'
            return json.dumps({'errors': errors})

        if user.password == old_password:
            user.update(password=new_password)

    session['user'] = user.to_json()
    return json.dumps({'errors': {}})


@app.route('/api/static/<path:filename>', methods=['GET'])
def get_image(filename):
    """
        Serves user profile images to front end.
    """

    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/api/user/add_friend/', methods=['POST'])
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

@app.route('/api/user/remove_friend/', methods=['POST'])
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


@app.route('/api/remove_song/<sid>/', methods=['DELETE'])
def remove_song():
    """
        Remove song SID from user's favorite songs.
    """

    pass


"""
   ***************************************
    Creating, finding, and joining booths
   ***************************************
"""

@app.route('/api/create_booth/', methods=['POST'])
def create_booth():
    """
        Create a new booth.
    """

    pass


@app.route('/api/booths/', methods=['GET'])
def fetch_public_booths():
    """
        Fetch all the public and password protected booths.
    """

    pass


@app.route('/api/booths/<bid>/', methods=['GET'])
def join_booth():
    """
        Join booth BID.
    """

    pass
