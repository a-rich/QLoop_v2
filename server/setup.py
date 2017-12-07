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
