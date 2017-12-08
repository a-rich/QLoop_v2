import json
from qloop import app, socketio
from flask_socketio import SocketIO, send, emit, join_room, leave_room
from flask import request, render_template
from qloop.models import User, Song, booth_registry
from flask_jwt_simple import jwt_required, get_jwt_identity
from qloop.utils import download

@socketio.on('join')
def join(json):
    """
        This socket event is triggered only when a user joins a booth or when
        a user creates a booth (creating implies joining).
    """

    booth_id = json['booth_id']
    join_room(booth_id)


@socketio.on('disconnect')
def disconnet():
    user = User.objects.get(username=get_jwt_token())
    user.creator_status=None

@app.route('/')
def index():
    return render_template('socket_client_code.html')

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
    song = download(url, str(booth_id))

    if type(song) is str:
        return json.dumps({'errors': song})

    Song(song['title'], song['url'], song['song_path']).save()
    ret = booth.enqueue_song(get_jwt_identity(), song)

    return json.dumps(ret)


@app.route('/api/booth/favorite/', methods=['POST'])
@jwt_required
def favorite_song():
    """
    """
    # TODO: test favorite_song endpoint

    req = request.get_json()
    song = req['song']
    user = User.objects.get(username=get_jwt_identity())
    user.modify(push__favorite_songs_list=json.dumps(song))
    return json.dumps({'errors': {}}) # dont need to return favorite songs list because this endpoint is only hit from inside a booth


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
