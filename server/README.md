QLoop
=========================

Development
-------------------------

### Virtual Environment ###
**Activate:** `source .env/bin/activate`

**Deactivate:** `deactivate`

### Start Server ###
`python2.7 app.py`

Visit the web page at `localhost:5000`.

### Admin  ###
The admin is hardcoded into the log in route and bypasses authentication from
the `users` collection of the database.

Log in as admin using username 'admin' and password 'admin'.

### TODO: ###
1. Implement account recovery
   * use `send_mail()` function of `utils.py`
   * look at `signup` and `confirm_email` routes for guidance
2. Restructure application
   * move views out of `app.py` and into `views.py`
   * make `models.py` and create `User` class and PyMongo functions
