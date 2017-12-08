from qloop import app
from flask_mongoengine import MongoEngine
from qloop.utils import BoothRegistry
import json

db = MongoEngine(app)
booth_registry = BoothRegistry()


class Song(db.Document):
    title = db.StringField(default='')
    url = db.URLField()
    mp3 = db.StringField(default='')


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
