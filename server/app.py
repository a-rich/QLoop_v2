from flask import Flask
from flask_cors import CORS
from flask_jwt import JWT, jwt_required, current_identity

def authenticate(username, password):
    if username == user.username and password == user.password:
        return user

def identity(payload):
    return user

UPLOAD_FOLDER = 'static/imgs/'

app = Flask(__name__)                                  # Actual Flask app.
CORS(app)                                              # Cross origin requests
app.config['SECRET_KEY'] = ':iw=PO5}H],oEtSa'          # Used for creating session.
app.config['MONGOALCHEMY_DATABASE'] = 'database'       # Configure database name.
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

jwt = JWT(app, authenticate, identity)

from views.myqloop import *
from views.account import *
from views.booths import *
from views.queue import *

try:
    db.init_app(app)                                       # Initialize MongoAlchemy.
except:
    pass

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
