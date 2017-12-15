from qloop import app
from flask_mongoengine import MongoEngine
from qloop.utils import BoothRegistry
import json

db = MongoEngine(app)
booth_registry = BoothRegistry()


class Song(db.Document):
    """
        Persistent data model used to retain list of User's
        favorite songs.
    """

    title = db.StringField(default='')
    url = db.URLField()
    mp3 = db.StringField(default='')


class User(db.Document):
    """
        Persistent data model used to retain information about Users and
        defines in-memory variables relevant for joining other Users' booths.
    """

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

        if User.objects(username=username):
            errors['username'] = 'A user with this username has already created an account.'

        return errors
