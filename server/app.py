import datetime
from flask import Flask
from flask_cors import CORS
from flask_jwt_simple import JWTManager
from flask_socketio import SocketIO

UPLOAD_FOLDER = 'static/imgs/'

app = Flask(__name__)
CORS(app, resources=r"/api/*")
app.config['SECRET_KEY'] = ":iw=PO5}H],oEtSa"
app.config['JWT_SECRET_KEY'] = "fzgk0+\!>~mi`#l'"
app.config['JWT_EXPIRES'] = datetime.timedelta(days=7)
app.config['MONGOALCHEMY_DATABASE'] = 'database'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

jwt = JWTManager(app)
socketio = SocketIO(app)

from views.myqloop import *
from views.account import *
from views.booths import *
from views.queue import *



if __name__ == '__main__':
    socketio.run(app, debug=True)
