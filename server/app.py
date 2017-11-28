from flask import Flask
from flask_cors import CORS

UPLOAD_FOLDER = 'thumbs/'

app = Flask(__name__)                                  # Actual Flask app.
CORS(app)                                              # Cross origin requests
app.config['SECRET_KEY'] = ':iw=PO5}H],oEtSa'          # Used for creating session.
app.config['MONGOALCHEMY_DATABASE'] = 'database'       # Configure database name.
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

from views import *

try:
    db.init_app(app)                                       # Initialize MongoAlchemy.
except:
    pass

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
