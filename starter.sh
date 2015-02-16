#!/bin/sh

if [ $(ps -e -o uid,cmd | grep $UID | grep node | grep -v grep | wc -l | tr -s "\n") -eq 0 ]
then
        export PATH=/usr/local/bin:$PATH
        forever start --sourceDir /var/www/nodejs/charity-starter app.js --prod >> /var/log/nodejs/sails/charity-starter.txt 2>&1
fi
