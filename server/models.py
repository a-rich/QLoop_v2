from __main__ import app
from flask_mongoengine import MongoEngine

db = MongoEngine(app)

class User(db.Document):
    username = db.StringField(default='')
    email = db.EmailField()
    password = db.StringField(default='')
    profile_pic = db.ImageField(size=(400, 400, True))
    favorite_songs_list = db.EmbeddedDocumentListField('Song')
    friends_list = db.EmbeddedDocumentListField('User')

    @staticmethod
    def check_for_existing_user(email, username):
        errors = {}

        if User.objects(email=email):
            errors['email'] = 'A user with this email has already created an account'
        if User.objects(username=username):
            errors['username'] = 'A user with this username has already created an account.'

        return errors

    @staticmethod
    def add(email, username, password):
        errors = {}

        try:
            User.objects.create(email=email, username=username, password=password)
        except:
            errors['save_user'] = 'Failed to save user document.'

        return errors


class Song(db.Document):
    song_title = db.StringField(default='')
    artist_name = db.StringField(default='')
    url = db.URLField()
    mp3 = db.BinaryField()
