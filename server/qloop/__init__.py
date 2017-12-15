import datetime
from flask import Flask
from flask_cors import CORS
from flask_jwt_simple import JWTManager
from flask_socketio import SocketIO


def create_app():
    app = Flask(__name__)
    CORS(app, resources=r"/api/*", supports_credentials=True)
    app.config['SECRET_KEY'] = ":iw=PO5}H],oEtSa"
    app.config['JWT_SECRET_KEY'] = "fzgk0+\!>~mi`#l'"
    app.config['JWT_EXPIRES'] = datetime.timedelta(days=7)
    app.config['MONGOALCHEMY_DATABASE'] = 'database'
    app.config['UPLOAD_FOLDER'] = 'static/imgs/'

    jwt = JWTManager(app)

    return app

app = create_app()
socketio = SocketIO(app)

from qloop.views.myqloop import *
from qloop.views.account import *
from qloop.views.booths import *
from qloop.views.queue import *



if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
