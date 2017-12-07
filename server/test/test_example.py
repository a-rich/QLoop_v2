import json
from flask import url_for
from qloop.views.booths import create_booth


"""
    Testing VIEWS/BOOTHS
"""


#def test_create_booth(client):
#    assert client.post(url_for('/api/create_booth'),
#            data=json.dumps(dict(access_level='open')),
#            content_type='application/json').status_code == 200
#
#
#def test_fetch_public_booths(client):
#    assert client.get(url_for('fetch_public_booths')).status_code == 200
#
#
#def test_join_booth(client):
#    assert client.get(url_for('join_booth')).status_code == 200
#
#
#
#"""
#    Testing VIEWS/ACCOUNT
#"""
#
#
#def test_create_account(client):
#    assert client.post(url_for('create_account'),
#            data=json.dumps(dict(
#                email='alex.richards006@gmail.com',
#                username='aweeeezy',
#                password='pass')),
#            content_type='application/json').status_code == 200
#
#
#def test_confirm_account_creation(client):
#    assert client.get(url_for('confirm_account_creation')).status_code == 200
#
#
#def test_recover_account(client):
#    assert client.post(url_for('recover_account'),
#            data=json.dumps(dict(email='alex.richards006@gmail.com')),
#            content_type='application/json').status_code == 200
#
#
#def test_confirm_account_recovery(client):
#    assert client.get(url_for('confirm_account_recovery')).status_code == 200
#    assert client.post(url_for('confirm_account_recovery'),
#            data=json.dumps(dict(password='pass')),
#            content_type='application/json').status_code == 200
#
#
#
#"""
#    Testing VIEWS/MYQLOOP
#"""
#
#
#def test_fetch_profile(client):
#    assert client.post(url_for('fetch_profile'),
#            data=json.dumps(dict(
#                email='alex.richards006@gmail.com',
#                password='pass')),
#            content_type='application/json').status_code == 200
#
#def test_edit_profile(client):
#    assert client.post(url_for('edit_profile'),
#            data=json.dumps(dict(img='')),
#            content_type='application/json').status_code == 200
#
#
#def test_get_image(client):
#    assert client.get(url_for('get_image')).status_code == 200
#
#
#def test_find_users(client):
#    assert client.post(url_for('find_users'),
#            data=json.dumps(dict(query='alex')),
#            content_type='application/json').status_code == 200
#
#
#def test_add_friend(client):
#    assert client.post(url_for('add_friend'),
#            data=json.dumps(dict(username='alex')),
#            content_type='application/json').status_code == 200
#
#
#def test_remove_friend(client):
#    assert client.post(url_for('remove_friend'),
#            data=json.dumps(dict(username='alex')),
#            content_type='application/json').status_code == 200
#
#
#def test_remove_song(client):
#    assert client.post(url_for('remove_song'),
#            data=json.dumps(dict(
#                song={'title': 'some_title',
#                      'url': 'some_url'
#                })),
#            content_type='application/json').status_code == 200
