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
```
