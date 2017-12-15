QLoop
=========================

Installation
-------------------------

### Setting up MongoDB ###
Follow these installation instructions for [Mac](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/), [Windows](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/), and [Linux](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/) to setup `mongo` as a daemon on your machine.

### Clone repository ###
`git clone https://github.com/Aweeeezy/QLoop_v2.git`

### Build back end ###

#### Create Python virtual environment ####

If you haven't already, install [Python 3](https://www.python.org/downloads/).

`cd QLoop_v2/server`

`python3 -m venv .env`

`source .env/bin/activate`

#### Install Python dependencies and set environment variables ####
`pip3 install -e .`

`export FLASK_APP=qloop`

#### Run Flask server ####
`flask run`

### Build front end ###

#### Setting up React ####

If you haven't already, install [Yarn](https://yarnpkg.com/lang/en/docs/install/).

`cd QLoop_v2/client`

`yarn install`

#### Run React server ####
`yarn start`
