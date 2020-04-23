## 🚀 Local Setup

### Quick start

> **Requires [Docker 18+](https://docs.docker.com/release-notes/)**

```bash
# First, copy the environment file:
cp .env.example .env

# Install dependencies:
composer install
yarn install

# Copy hosts to /etc/hosts
make copy-hosts@local

# Boot the docker containers:
make deploy@local
make chore

# Build frontend:
yarn watch

# Finally you can visit: http://www.hackdawg.test
```

### Connecting to the database from the host machine

Since the database is in a docker container, connecting to it from the
host machine is as simple as:

```bash
mysql --protocol=tcp -P33069 -uhackdawg -ppassword
```

### Connecting to the database using a GUI

Most database GUIs out there supports importing a database from a url:

```bash
mysql://hackdawg:password@127.0.0.1:33069/hackdawg
```
