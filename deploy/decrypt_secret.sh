#!/bin/bash

# --batch to prevent interactive command --yes to assume "yes" for questions.
gpg --quiet --batch --yes --decrypt --passphrase="$SECRET_PASSPHRASE" --output .env deploy/secrets/.env.production.gpg