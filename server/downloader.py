import subprocess
import os

def download(url, bid):
    if not os.path.isdir('songs/' + bid):
        os.mkdir('songs/' + bid)

    song_title = subprocess.check_output([
        'youtube-dl', '--get-filename',
        '--output', "%(title)s",
        url]).strip()

    if os.path.exists('songs/' + bid + '/' + song_title):
        return "You've already downloaded this song"

    cmd = ['youtube-dl', '--extract-audio', '--audio-format', 'mp3',
            '--audio-quality', '0',
            '--no-playlist',
            '--output', "songs/{}/%(title)s.%(ext)s".format(bid),
            url]

    err = subprocess.call(cmd)

    if not err:
        repl_str = 'songs/' + bid + '/' + song_title
        os.rename(repl_str + '.mp3', repl_str)

    return {'title': song_title,
            'url': url,
            'song_path': repl_str}
