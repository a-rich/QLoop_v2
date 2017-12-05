import re
import json
import os
from __main__ import app
from flask import request, send_from_directory
from models import User
from mongoengine.queryset.visitor import Q
from werkzeug import secure_filename
from flask_jwt_simple import jwt_required, create_jwt, get_jwt_identity


"""
   ***************************************************************
    Creating, recovering, fetching, and updating a user's profile
   ***************************************************************
"""


@app.route('/api/my_qloop/', methods=['POST'])
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
            'friends': [
                (f,
                 User.objects.get(username=f)['email'],
                 User.objects.get(username=f)['creator_status']
                )
                for f in user.friends_list
            ]
        }
        token = create_jwt(identity=user.username)
        username = user.username
    except:
        errors['login'] = 'Invalid credentials...please try again.'
        token = None
        data = {}
        username = None

    return json.dumps({'username': username,'errors': errors, 'data': data, 'jwt': token})


@app.route('/api/update_profile/', methods=['POST'])
@jwt_required
def edit_profile():
    """
        Update user's profile image.

    """

    errors = {}
    user = User.objects.get(username=get_jwt_identity())

    if request.files:
        try:
            img = request.files['files']
        except KeyError:
            img = request.files['']
        except:
            raise "Upload file key error{}".format(request.files)
        path = app.config['UPLOAD_FOLDER'] + user.username + "-" + secure_filename(img.filename)
        img.save(path)

        try:
            os.remove(user.profile_pic)
        except:
            pass

        user.update(profile_pic=path)

    return json.dumps({'errors': {}})


@app.route('/api/static/<path:filename>', methods=['GET'])
@jwt_required
def get_image(filename):
    """
        Serves user profile images to front end.
    """

    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


@app.route('/api/find_users/', methods=['POST'])
@jwt_required
def find_users():
    """
        Returns the list of users in the User model whose username or email
        match the search string.
    """
    # TODO: only() doesn't work

    search_string = request.get_json()['query']
    regex = re.compile('.*{}.*'.format(search_string))
    users = User.objects((Q(email=regex) | Q(username=regex)) & Q(username__ne=get_jwt_identity())).only('username', 'email')

    return json.dumps({'data': [u.to_json() for u in users]})


@app.route('/api/add_friend/', methods=['POST'])
@jwt_required
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

    user = User.objects.get(username=get_jwt_identity())
    if friend.id not in [User.from_json(f).id for f in user.friends_list]:
        user.update(push__friends_list=(friend['username']))

    return json.dumps({'errors': errors})


@app.route('/api/remove_friend/', methods=['POST'])
@jwt_required
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

    user = User.objects.get(username=get_jwt_identity())
    if friend.id in [User.from_json(f).id for f in user.friends_list]:
        user.update(pull__friends_list=friend.to_json())

    return json.dumps({'errors': errors})


@app.route('/api/remove_song/', methods=['POST'])
@jwt_required
def remove_song():
    """
        Remove song SID from user's favorite songs.
    """
    # TODO: test remove_song endpoint

    song = request.get_json()['song']
    user = User.objects.get(username=get_jwt_identity())
    #user.update(pull__favorite_songs_list=song)
    user.update(pull__favorite_songs_list=song)

    return json.dumps({})
