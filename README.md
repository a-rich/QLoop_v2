QLoop
=========================

Installation
-------------------------

### Clone repository ###
`git clone https://github.com/Aweeeezy/QLoop_v2.git`

### Build back end ###

#### Create Python virtual environment ####
`cd QLoop_v2/server`

`python3 -m venv .env`

`source .env/bin/activate`

#### Install Python dependencies and set environment variables ####
`pip3 install -e .`

`export FLASK_APP=qloop`

`export FLASK_DEBUG=true`

#### Run Flask server ####
`flask run`

### Build front end ###

#### Setting up React ####
`cd QLoop_v2/client`

`yarn install`

#### Run React server ####
`yarn start`
