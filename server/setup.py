import os
from dotenv import Dotenv
from setuptools import setup

setup(
    name='qloop',
    packages=['qloop'],
    include_package_data=True,
    install_requires=[
        'flask', 'flask-socketio', 'flask-cors', 'flask-jwt-simple',
        'flask-mongoengine', 'pytest-flask', 'eventlet', 'pydub', 'dotenv'
    ],
)

dotenv = Dotenv(os.path.join(os.path.dirname(__file__), ".env"))
os.environ.update(dotenv)
