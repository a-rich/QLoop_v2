from flask import Flask
from flask_cors import CORS
from flask_jwt_simple import JWTManager

UPLOAD_FOLDER = 'static/imgs/'

app = Flask(__name__)
CORS(app, resources=r"/api/*")
app.config['SECRET_KEY'] = ":iw=PO5}H],oEtSa"
app.config['JWT_SECRET_KEY'] = "fzgk0+\!>~mi`#l'"
app.config['MONGOALCHEMY_DATABASE'] = 'database'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

from views.myqloop import *
from views.account import *
from views.booths import *
from views.queue import *

jwt = JWTManager(app)

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
