#!/usr/bin/env bash

if ! grep -q "206.189.85.59  hackdawg.com" /etc/hosts; then
    echo "206.189.85.59  hackdawg.com" >> /etc/hosts
fi
