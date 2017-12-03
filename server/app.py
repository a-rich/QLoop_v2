from flask import Flask
from flask_cors import CORS
from flask_jwt import JWT, jwt_required, current_identity

UPLOAD_FOLDER = 'static/imgs/'

app = Flask(__name__)                                  # Actual Flask app.
CORS(app, resources=r"/api/*")
app.config['SECRET_KEY'] = ':iw=PO5}H],oEtSa'          # Used for creating session.
app.config['MONGOALCHEMY_DATABASE'] = 'database'       # Configure database name.
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

from views.myqloop import *
from views.account import *
from views.booths import *
from views.queue import *

try:
    db.init_app(app)                                       # Initialize MongoAlchemy.
except:
    pass

def authenticate(username, password):
    user = User.objects(username=username, password=password)
    if user:
        return user
    else:
        return False

def identity(payload):
    user_id = payload['identity']
    return {"user_id": user_id}

jwt = JWT(app, authenticate, identity)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
