#!/usr/bin/env bash

HOST="hackdawg.test"

if [[ $APP_ENV == "staging" || $APP_ENV != "production" ]]; then
    HOST="hackdawg.com"
fi

if ! grep -q "127.0.0.1     ${HOST}" /etc/hosts; then
    echo "127.0.0.1     ${HOST}" >> /etc/hosts
fi
