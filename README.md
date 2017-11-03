QLoop
=========================

Development
-------------------------

### Virtual Environment ###
**Activate:** `source .env/bin/activate`

**Deactivate:** `deactivate`

**Recreate virtual environment:**

* `cd QLoop/server`

* `rm -rf .env`

* `python -m pip install virtualenv`

* `virtualenv .env`

* `source .env/bin/activate`

* `python -m pip install Flask PyMongo Flask-MongoAlchemy itsdangerous`

### Start Server ###
`python app.py`

Visit the web page at `localhost:5000`.

### Admin  ###
The admin is hardcoded into the log in route and bypasses authentication from
the `Users` collection of the database.

Log in as admin using username 'admin' and password 'admin'.

### TODO: ###
1. Make profile
   * upload profile image
   * edit first/last name
   * edit username
   * edit email
   * add/remove friends
2. Swap out Flask's Werkzeug server with nginx

### Setting up React ###
1. Go into the client folder using terminal
2. `yarn install`

### Starting server ###
`yarn start`
