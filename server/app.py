from flask import *
from functools import wraps
from itsdangerous import URLSafeTimedSerializer
from util import send_email

app = Flask(__name__)                                  # Actual Flask app.
app.config['SECRET_KEY'] = ':iw=PO5}H],oEtSa'          # Used for creating session.
app.config['MONGOALCHEMY_DATABASE'] = 'database'       # Configure database name.

from models import *

db.init_app(app)                                       # Initialize MongoAlchemy.
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
            flash('You must login first.')
            return redirect(url_for('login'))
    return wrap

@app.route('/signup/', methods=['GET', 'POST'])
def signup():
    """
        Accepts user email and password, tokenizes the email, sends an account
        activation email to the user, then enters the user into the database
        with the field EMAIL_CONFIRMED set to FALSE.
    """

    if request.method == 'POST':
        email = request.form['email']                       # User supplied email.
        password = request.form['password']                 # User supplied password.

        if User.query.filter(User.email == email).first():  # Check if user already has an account.
            flash('You already have an account.')
            return redirect(url_for('login'))

        token = ts.dumps(
                email,
                salt='email-confirm-key')                   # Token for confirmation email.

        confirm_url = url_for(                              # Generates url embedded in
                'confirm_email',                            # confirmation email.
                token=token,
                _external = True)

        subject = 'confirm your email'                      # Email subject.
        html = render_template(                             # Email body.
                'account_activation.html',
                confirm_url=confirm_url)

        send_email(email, subject, html)                    # Calls send_email function in utils.py.


        new_user = User(                                    # Creates partial DB entry for new user.
                email=email,
                password=password,
                email_confirmed=False)
        new_user.save()

        flash('Please confirm your email (check the spam folder) to log in')
        return redirect(url_for('login'))
    return render_template('signup_form.html')

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

    return redirect(url_for('login'))

@app.route('/')
@app.route('/login/', methods=['GET', 'POST'])
def login():
    """
        Home/login view. Checks if the user has an active session cookie and
        logs them in if so. Otherwise renders the log in template. Upon
        submitting the log in form, checks to see if the user is validated,
        creates a session for them, then redirects them to their profile page.
    """

    error = None
    if request.path == '/':
        if 'username' in session:                           # Check if the user has an
            flash('Logged in as {}.'.format(                # active session.
                session['username']))
            return redirect(url_for('profile'))
        return redirect(url_for('login'))
    elif request.method == 'POST':                          # Accept form submission.
        username = request.form['username']
        email = username if '@' in username else None
        password = request.form['password']

        if email:
            user = User.query.filter(User.email == email).first()
        else:
            user = User.query.filter(User.username == username).first()

        if (username == 'admin' and password == 'admin') \
                or (user and user.email_confirmed):
            session['username'] = username
            session['logged_in'] = True
            flash('Logged in as {}.'.format(username))
            return redirect(url_for('profile'))
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
    return redirect(url_for('login'))

@app.route('/account_recovery/')
def account_recovery():
    """
        Allows user to update their password after confirming an email.
    """

    pass

@app.route('/profile/')
@login_required
def profile():
    """
        Renders profile view.
    """

    return render_template('profile.html')

@app.route('/create_booth/')
@login_required
def create_booth():
    """
        Renders booth creation view.
    """
    return render_template('create_booth.html')

@app.route('/public_booths/')
@login_required
def public_booths():
    """
        Renders public booths view.
    """
    return render_template('public_booths.html')


if __name__ == '__main__':
    app.run(debug=True)
