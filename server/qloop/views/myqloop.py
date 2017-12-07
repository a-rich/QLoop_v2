import re
import json
import os
from qloop import app
from flask import request, send_from_directory
from qloop.models import User
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
        friends = [User.objects.get(username=f) for f in user.friends_list]
        data = {
            'profile_pic': user.profile_pic,
            'email': user.email,
            'favorite_songs': user.favorite_songs_list,
            'friends': [
                (f['username'], f['email'], f['creator_status'])
                for f in friends
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
    path = None
    user = User.objects.get(username=get_jwt_identity())

    if request.files:
        try:
            img = request.files['files']
            path = app.config['UPLOAD_FOLDER'] + user.username + "-" + secure_filename(img.filename)
            img.save(path)
        except KeyError:
            img = request.files['']
            path = app.config['UPLOAD_FOLDER'] + user.username + "-" + secure_filename(img.filename)
            img.save(path)
        except:
            raise "Upload file key error{}".format(request.files)

        try:
            os.remove(user.profile_pic)
        except:
            pass

        user.modify(profile_pic=path)

    return json.dumps({'errors': {}, 'profile_pic': path})


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

    return json.dumps({'data': [(u['username'], u['profile_pic']) for u in users]})


@app.route('/api/add_friend/', methods=['POST'])
@jwt_required
def add_friend():
    """
        Add user FID to user's friends.
    """

    errors = {}
    friend = request.get_json()['username']

    user = User.objects.get(username=get_jwt_identity())
    if friend not in user.friends_list:
        user.modify(push__friends_list=(friend))

    friends = [User.objects.get(username=f) for f in user.friends_list]
    friends = [
        (f['username'], f['email'], f['creator_status'])
        for f in friends
    ]

    return json.dumps({'errors': errors, 'data': friends})


@app.route('/api/remove_friend/', methods=['POST'])
@jwt_required
def remove_friend():
    """
        Remove user FID from user's friends.
    """

    errors = {}
    friend = request.get_json()['username']

    user = User.objects.get(username=get_jwt_identity())
    if friend in user.friends_list:
        user.modify(pull__friends_list=friend)

    friends = [User.objects.get(username=f) for f in user.friends_list]
    friends = [
        (f['username'], f['email'], f['creator_status'])
        for f in friends
    ]

    return json.dumps({'errors': errors, 'data': friends})


@app.route('/api/remove_song/', methods=['POST'])
@jwt_required
def remove_song():
    """
        Remove song SID from user's favorite songs.
    """

    song = request.get_json()['song']
    user = User.objects.get(username=get_jwt_identity())
    user.modify(pull__favorite_songs_list=json.dumps(song))

    return json.dumps({'errors': {}, 'data': user.favorite_songs_list})
