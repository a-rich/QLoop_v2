from __main__ import app
from flask_mongoengine import MongoEngine
import json

db = MongoEngine(app)


class Song(db.Document):
    song_title = db.StringField(default='')
    artist_name = db.StringField(default='')
    url = db.URLField()
    mp3 = db.BinaryField()


class User(db.Document):
    username = db.StringField(default='')
    email = db.EmailField()
    password = db.StringField(default='')
    profile_pic = db.StringField(default='')
    favorite_songs_list = db.ListField(db.StringField(default=''))
    friends_list = db.ListField(db.StringField(default=''))
    creator_status = db.IntField()

    @staticmethod
    def check_for_existing_user(email, username):
        errors = {}

        if User.objects(email=email):
            errors['email'] = 'A user with this email has already created an account'
        if User.objects(username=username):
            errors['username'] = 'A user with this username has already created an account.'

        return errors
