#!/bin/bash

echo "God is good, all the time!"

# Install linux utilities
apt-get update -y
apt-get install -y make

# Install Node.js &
curl -sL https://deb.nodesource.com/setup_12.x | bash -
apt-get install -y nodejs

# Install Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt-get update && apt-get install -y yarn

cd /root/hackdawg.com || exit

# Reset everything
git fetch --all && git checkout master && git reset --hard && git pull
rm -rf .env sh deploy/decrypt_secret.sh

# Copy bash aliases
rm -f /root/.bash_aliases
cp ./deploy/.bash_aliases /root
source /root/.bash_aliases

# Stop running containers, remove local images
docker-compose -f ./deploy/docker-compose.yml down --rmi=local --remove-orphans
docker image prune -f

# Build frontend
yarn && yarn prod

# Here we go...
make copy-hosts@production
make deploy@production
