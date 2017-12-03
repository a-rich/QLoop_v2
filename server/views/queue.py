import json
from __main__ import app
from flask import request, session, redirect, url_for, render_template, flash, send_from_directory
from models import User, Song
from queue_manager import Booth, BoothRegistry
from flask_jwt_simple import jwt_required

booth_registry = BoothRegistry()


"""
   *****************************************
    Queuing, favoriting, and skipping songs
   *****************************************
"""


@app.route('/api/booth/enqueue/', methods=['POST'])
@jwt_required
def enqueue_song():
    """
        Given a YouTube URL, extract the MP3 and insert it into the Song model.
    """
    # TODO: test this endpoint

    req = request.get_json()
    url = req['url']

    pass


@app.route('/api/booth/favorite/', methods=['POST'])
@jwt_required
def favorite_song():
    """
    """
    # TODO: test this endpoint

    pass


@app.route('/api/booth/skip/', methods=['POST'])
@jwt_required
def skip_song():
    """
    """
    # TODO: test this endpoint

    pass



"""
   ****************************************
    Toggle song selection and audio stream
   ****************************************
"""


@app.route('/api/booth/toggle_selection/', methods=['POST'])
@jwt_required
def toggle_selection():
    """
    """
    # TODO: test this endpoint

    pass


@app.route('/api/booth/toggle_audio/', methods=['POST'])
@jwt_required
def toggle_audio():
    """
    """
    # TODO: test this endpoint

    pass
