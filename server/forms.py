from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import DataRequired, Email
from validators import Unique
from models import User

class SignupForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email(),
        Unique(User, User.email,
            message='There is already an account with that email.'
        )])
    username = StringField('Username', validators=[DataRequired(),
        Unique(User, User.username,
            message='There is already an account with that username.'
        )])
    password = PasswordField('Password', validators=[DataRequired()])


