QLoop
=========================

Installation
-------------------------

## Clone repository ##
`git clone https://github.com/Aweeeezy/QLoop_v2.git`
`cd QLoop_v2`

## Build back end ##

### Create Python virtual environment ###
`python3 -m venv .env`
`source .env/bin/activate`

### Install Python dependencies and set environment variables ###
`cd QLoop_v2/server`
`pip3 install -e .`

### Run Flask server ###
`flask run`

## Build front end ##

### Setting up React ###
`cd QLoop_v2/client`
`yarn install`

### Run React server ###
`yarn start`
