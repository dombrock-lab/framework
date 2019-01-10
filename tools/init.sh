#!/bin/bash
mkdir ../../app
mkdir ../../app/config
cp init/example-app.js ../../app/app.js
cp init/example-config.js ../../app/config/config.js
cd ..
npm install
cd ../app
npm init -y