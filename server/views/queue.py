import json
import os
from bson import Binary
from __main__ import app
from flask import request, session, redirect, url_for, render_template, flash, send_from_directory
from models import db, User, Song
from util import send_email, allowed_file
from itsdangerous import URLSafeTimedSerializer
from werkzeug import secure_filename
from queue_manager import Booth, BoothRegistry

ts = URLSafeTimedSerializer(app.config['SECRET_KEY'])  # Tokenize acct. mgmt. emails
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

    pass


@app.route('/api/booth/favorite/', methods=['POST'])
def favorite_song():
    """
    """

    pass


@app.route('/api/booth/skip/', methods=['POST'])
def skip_song():
    """
    """

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

    pass


@app.route('/api/booth/toggle_audio/', methods=['POST'])
def toggle_audio():
    """
    """

    pass
