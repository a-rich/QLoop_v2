from flask import *
from flask_pymongo import PyMongo
from functools import wraps

app = Flask(__name__)
mongo = PyMongo(app)
app.secret_key = ':iw=PO5}H],oEtSa'

def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('You must login first.')
            return redirect(url_for('login'))
    return wrap

@app.route('/')
@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html')

@app.route('/friends')
def friends():
    return render_template('friends.html')

@app.route('/create_booth')
def create_booth():
    return render_template('create_booth.html')

@app.route('/public_booths')
def public_booths():
    return render_template('public_booths.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
			error = 'Invalid credentials. Please try again.'
        else:
            session['logged_in'] = True
            return redirect(url_for('profile'))
    return render_template('login.html', error=error)

@app.route('/logout')
def logout():
    session.pop('logged_in', None)
    return redirect(url_for('profile'))

if __name__ == '__main__':
    app.run(debug=True)
