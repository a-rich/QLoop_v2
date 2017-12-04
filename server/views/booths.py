import json
from __main__ import app
from flask import request
from models import User, Song, booth_registry
from werkzeug import secure_filename
from flask_jwt_simple import jwt_required, get_jwt_identity


"""
   ***************************************
    Creating, finding, and joining booths
   ***************************************
"""


@app.route('/api/create_booth/', methods=['POST'])
@jwt_required
def create_booth():
    """
        Create a new booth using the request's ACCESS_LEVEL parameter. Returns
        the booth ID of the newly created booth.
    """

    req = request.get_json()
    access_level = req['access_level']
    user = User.objects.get(username=get_jwt_identity())
    bid = booth_registry.add_booth(user.username, access_level)
    user.update(creator_status=bid) # Use BID as req param for JOIN_BOOTH view
    return join_booth(bid)


@app.route('/api/booths/', methods=['GET'])
@jwt_required
def fetch_public_booths():
    """
        Fetch all the public and password protected booths. Returns a list of
        tuples of the form (BOOTH_ID, CREATOR, CURRENT_SONG, ACCESS_LEVEL).
    """

    data = booth_registry.show_booths()
    return json.dumps({'data': data})


@app.route('/api/join_booth/<bid>/', methods=['GET'])
@jwt_required
def join_booth(bid):
    """
        Join a booth. Requires the booth ID. Returns the relevant details
        needed to render the booth view.
    """

    booth_details = booth_registry.join_booth(bid, get_jwt_identity())
    return json.dumps({'data': booth_details})
