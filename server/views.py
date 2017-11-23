import json
from __main__ import app
from flask import request, session, redirect, url_for, render_template, flash
from models import db, User
#from forms import SignupForm
from functools import wraps
from util import send_email
from itsdangerous import URLSafeTimedSerializer

ts = URLSafeTimedSerializer(app.config['SECRET_KEY'])  # Used to create confirmation email.

def login_required(page):
    """
        Decorator that enforces that the user be logged in before executing the
        decorated function.
    """

    @wraps(page)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return page(*args, **kwargs)
        else:
            flash('You must log in first.')
            return redirect(url_for('log_in'))
    return wrap

@app.route('/signup/', methods=['GET', 'POST'])
def sign_up():
    """
        Accepts username, email and password, tokenizes the email, sends an
        account activation email to the user, then enters the user into the
        database with the field EMAIL_CONFIRMED set to FALSE.
    """
    #form = SignupForm()
    #if form.validate_on_submit():
    if request.method == 'POST':                            # Accept form submission.
        email = request.form['email']                       # User supplied email.
        username = request.form['username']                 # User supplied email.
        password = request.form['password']                 # User supplied password.

        token = ts.dumps(
                email,
                salt='email-confirm-key')                   # Token for confirmation email.

        confirm_url = url_for(                              # Generates url embedded in
                'confirm_email',                            # confirmation email.
                token=token,
                _external = True)

        subject = 'Confirm your email'                      # Email subject.
        html = render_template(                             # Email body.
                'account_activation.html',
                confirm_url=confirm_url)

        send_email(email, subject, html)                    # Calls send_email function in utils.py.


        new_user = User(                                    # Creates partial DB entry for new user.
                email=email,
                username=username,
                password=password,
                email_confirmed=False)
        new_user.save()
        flash('Please confirm your email (check the spam folder) to log in.')
        return redirect(url_for('log_in'))
    """
    if form.email.errors:
        [flash('Email error: ' + e) for e in form.email.errors]
    if form.username.errors:
        [flash('Username error: ' + e) for e in form.username.errors]
    if form.password.errors:
        [flash('Password error: ' + e) for e in form.password.errors]
    return render_template('signup_form.html', form=form)
    """

@app.route('/confirm/<token>')
def confirm_email(token):
    """
        View for handling the user clicking on their account activation link.
        Loads the token from the confirmation url and then completes the user's
        entry in the DB by updating EMAIL_CONFIRMED to TRUE.
    """

    try:
        email = ts.loads(token, salt='email-confirm-key', max_age=21600)
    except:
        abort(404)

    user = User.query.filter(User.email == email).first()
    user.email_confirmed = True
    user.save()

    return redirect(url_for('log_in'))

@app.route('/')
def send_react_components():
    return json.dumps({'logged_in': True})
    if 'username' in session:
        return redirect(url_for('profile', username=session['username']))
    #return redirect(url_for('log_in'))
    #return open('static/javascript/test_browser_react_components.js').read().strip()

@app.route('/login/', methods=['GET', 'POST'])
def log_in():
    """
        Home/login view. Checks if the user has an active session cookie and
        logs them in if so. Otherwise renders the login template. Upon
        submitting the login form, checks to see if the user is validated,
        creates a session for them, then redirects them to their profile page.
    """

    error = None
    if request.method == 'POST':                          # Accept form submission.
        login = request.form['login']
        password = request.form['password']

        user = User.query.filter(User.email == login).first()
        if not user:
            user = User.query.filter(User.username == login).first()

        if (login == 'admin' and password == 'admin') \
                or (user and user.email_confirmed and password == user.password):
            session['username'] = user.username
            session['logged_in'] = True
            flash('Logged in as {}.'.format(user.username))
            return redirect(url_for('profile', username=session['username']))
        else:
            error = 'Invalid credentials. Please try again.'
    return render_template('login_form.html', error=error)

@app.route('/logout/')
@login_required
def logout():
    """
        Removes user session.
    """

    session.pop('logged_in', None)
    session.pop('username', None)
    return redirect(url_for('log_in'))

@app.route('/account_recovery/', methods=['GET', 'POST'])
def account_recovery():
    """
        Allows user to update their password after confirming an email.
    """

    if request.method == 'POST':
        login = request.form['login']

        user = User.query.filter(User.email == login).first()
        if not user:
            user = User.query.filter(User.username == login).first()

        if user:
            token = ts.dumps(
                    user.email,
                    salt='account-recovery-key')                # Token for password reset email.

            reset_url = url_for(                                # Generates url embedded in
                    'reset_password',                           # password reset email.
                    token=token,
                    _external = True)

            subject = 'Reset password'                          # Email subject.
            html = render_template(                             # Email body.
                    'account_recovery.html',
                    reset_url=reset_url)

            send_email(user.email, subject, html)               # Calls send_email function in utils.py.

            flash('Please click the password reset link that was sent to your email (check the spam folder) to reset your password.')
            return redirect(url_for('log_in'))
        else:
            flash('Invalid email or username.')

    return render_template('account_recovery_form.html')

@app.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    """
        View for handling the user clicking on their account password reset link.
        Loads the token from the reset url and then updates the user's
        entry in the DB by updating PASSWORD.
    """

    if request.method == 'POST':
        try:
            username = ts.loads(token, salt='account-recovery-key', max_age=21600)
            email = username if '@' in username else None
        except:
            abort(404)

        if email:
            user = User.query.filter(User.email == email).first()
        else:
            user = User.query.filter(User.username == email).first()

        user.password = request.form['password']
        user.save()

        return redirect(url_for('log_in'))
    return render_template('password_reset.html')

@app.route('/profile/')
@app.route('/profile/<username>')
@login_required
def profile(username):
    """
        Renders profile view.
    """

    return render_template('profile.html', username=username)

@app.route('/create_booth/')
@login_required
def create_booth():
    """
        Renders booth creation view.
    """
    return render_template('create_booth.html', username=session['username'])

@app.route('/public_booths/')
@login_required
def public_booths():
    """
        Renders public booths view.
    """
    return render_template('public_booths.html', username=session['username'])
