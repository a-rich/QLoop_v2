from flask import Flask

app = Flask(__name__)                                  # Actual Flask app.
app.config['SECRET_KEY'] = ':iw=PO5}H],oEtSa'          # Used for creating session.
app.config['MONGOALCHEMY_DATABASE'] = 'database'       # Configure database name.

from views import *

db.init_app(app)                                       # Initialize MongoAlchemy.

if __name__ == '__main__':
    app.run(debug=True)
