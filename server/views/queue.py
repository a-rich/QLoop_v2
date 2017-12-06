import json
from __main__ import app
from flask import request, session, redirect, url_for, render_template, flash, send_from_directory
from models import User, Song
from queue_manager import Booth, BoothRegistry

booth_registry = BoothRegistry()


"""
   *****************************************
    Queuing, favoriting, and skipping songs
   *****************************************
"""


@app.route('/api/booth/enqueue/', methods=['POST'])
def enqueue_song():
    """
    """
    # TODO: test this endpoint

    pass


@app.route('/api/booth/favorite/', methods=['POST'])
def favorite_song():
    """
    """
    # TODO: test this endpoint

    pass


@app.route('/api/booth/skip/', methods=['POST'])
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
def toggle_selection():
    """
    """
    # TODO: test this endpoint

    pass


@app.route('/api/booth/toggle_audio/', methods=['POST'])
def toggle_audio():
    """
    """
    # TODO: test this endpoint

    pass
