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


@app.route('/api/users/edit_profile/', methods=['POST'])
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
