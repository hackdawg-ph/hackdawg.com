#!/usr/bin/env bash

if ! grep -q "127.0.0.1  hackdawg.test" /etc/hosts; then
    echo "127.0.0.1  hackdawg.test" >> /etc/hosts
fi

if ! grep -q "127.0.0.1  hackdawg.com" /etc/hosts; then
    echo "127.0.0.1  hackdawg.com" >> /etc/hosts
fi
