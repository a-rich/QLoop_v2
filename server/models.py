from __main__ import app
from flask_mongoalchemy import MongoAlchemy

db = MongoAlchemy(app)

class User(db.Document):
    username = db.StringField(default="")
    email = db.StringField(default="")
    email_confirmed = db.BoolField(default=False)
    password = db.StringField(default="")
