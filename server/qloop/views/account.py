import json
from qloop import app
from flask import request, redirect, url_for, render_template
from qloop.models import User
from qloop.utils import send_email
from itsdangerous import URLSafeTimedSerializer
from werkzeug.security import generate_password_hash

ts = URLSafeTimedSerializer(app.config['SECRET_KEY'])  # Tokenize acct. mgmt. emails


"""
   ***************************************************************
    Creating, recovering, fetching, and updating a user's profile
   ***************************************************************
"""


@app.route('/api/new_user/', methods=['POST'])
def create_account():
    """
        Tokenize user's email, username, and password and then send an email
        confirmation link.

    """
    # TODO: use Celery to make `send_email` asynchronous

    req = request.get_json()
    email = req['email']
    username = req['username']
    password = req['password']

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


@app.route('/api/confirm_account_creation/<token>/', methods=['GET'])
def confirm_account_creation(token):
    """
        Upon email confirmation, add new user to the User collection.
    """
    # TODO: redirect to React component for login
    #       if errors, log errors

    try:
        token = ts.loads(token, salt='account-creation-key', max_age=21600)
    except:
        abort(404)

    try:
        User.objects.get(email=token['email'])
        errors = {'user': 'User already exists.'}
    except:
        User(
            email=token['email'],
            username=token['username'],
            password=generate_password_hash(token['password'])).save()

    return redirect('http://www.google.com')


@app.route('/api/reset_password/', methods=['POST'])
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
        recovery_url = "http://localhost:3000/reset_password/" + token
        subject = 'Reset your QLoop account password'
        html = render_template(
                'account_recovery.html',
                recovery_url=recovery_url)
        try:
            send_email(email, subject, html)
        except:
            errors['recovery'] = 'Failed to send account recovery email...please try again.'

    return json.dumps({'errors': errors})


@app.route('/api/reset_password/<token>/', methods=['GET', 'POST'])
def confirm_account_recovery(token):
    """
        Upon account recovery confirmation, redirect to the React component
        that sends a POST with an updated password.

        When React component for password reset POSTs the new password,
        deserialize the accompanying token, find the user in the User model,
        and then update their document to reflect the new password.
    """
    # TODO: redirect to React component WITH token for password reset

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
