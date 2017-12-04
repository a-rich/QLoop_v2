import json
from __main__ import app
from flask import request, redirect, url_for, render_template, flash, send_from_directory
from models import User, Song, booth_registry
from flask_jwt_simple import jwt_required, get_jwt_identity
from util import download


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
    # TODO: test enqueue_song endpoint

    req = request.get_json()
    url = req['url']
    booth_id = req['booth_id']
    booth = booth_registry.get_booth(booth_id)
    song = download(url, booth_id)

    if type(song) is str:
        return json.dumps({'errors': song})

    Song(song['title'], song['url'], song['song_path']).save()
    booth.enqueue_song(get_jwt_identity(), song)

    return json.dumps({'song': song})

@app.route('/api/booth/favorite/', methods=['POST'])
@jwt_required
def favorite_song():
    """
    """
    # TODO: test favorite_song endpoint

    req = request.get_json()
    song = req['song']
    user = User.objects.get(username=get_jwt_identity())
    user.update(push__favorite_songs_list=song)
    return json.dumps({})


@app.route('/api/booth/skip/', methods=['POST'])
@jwt_required
def skip_song():
    """
    """
    # TODO: test skip_song endpoint

    req = request.get_json()
    bid = req['bid']
    url = req['url']
    booth = booth_registry.get_booth(bid)
    count = booth.log_skip_vote(url)
    return json.dumps({'skip_count': count})



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
    # TODO: test toggle_selection endpoint

    pass


@app.route('/api/booth/toggle_audio/', methods=['POST'])
@jwt_required
def toggle_audio():
    """
    """
    # TODO: test toggle_audio endpoint

    pass
