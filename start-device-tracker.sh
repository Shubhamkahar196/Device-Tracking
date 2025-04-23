#!/bin/bash

exec > /tmp/device-tracker.log 2>&1

export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm use 20

cd "$HOME/Projects/Device-Tracking"
DEVICE_NAME="$(whoami)"
export DEVICE_NAME

node app.js
