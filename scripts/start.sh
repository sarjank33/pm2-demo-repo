#!/bin/bash 

cd /home/ubuntu/pm2-demo-repo

pm2 stop all

pm2 delete all

pm2 start app.js

pm2 save
