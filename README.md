## 🚀 Local Setup

```bash
# First, install project dependencies:
composer install
yarn install

# Then, build the front-end assets:
yarn watch

# Copy environment file:
cp .env.example .env

# Boot the docker containers:
make deploy-local

# Initialize application:
make init
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
