.PHONY: build

include .env

# Utils

run-tests:
	@docker container exec web composer test

test-db-connection:
	@deploy/wait-until.sh "docker exec -t -e MYSQL_PWD=${DB_PASSWORD} db mysql -D ${DB_DATABASE} -e 'select 1'"

# Local

copy-hosts@local:
	@sudo chmod +x ./deploy/copy_hosts.local.sh
	@sudo ./deploy/copy_hosts.local.sh

deploy@local:
	@docker-compose \
		-f ./deploy/docker-compose.yml \
		-f ./deploy/docker-compose.local.yml \
		up --build --force-recreate

chore@local:
	@docker container exec -it -e APP_ENV=local web hackdawg-chore

# Testing

deploy@testing:
	@docker-compose \
    	-f ./deploy/docker-compose.yml \
    	-f ./deploy/docker-compose.testing.yml \
    	up -d --build --force-recreate

chore@testing:
	@docker container exec -e APP_ENV=testing web hackdawg-chore

# Production

copy-hosts@production:
	@sudo chmod +x ./deploy/copy_hosts.production.sh
	@sudo ./deploy/copy_hosts.production.sh

deploy@production:
	@docker-compose \
		-f ./deploy/docker-compose.yml \
		-f ./deploy/docker-compose.production.yml \
		up -d --build --force-recreate

chore@production:
	@docker container exec -e APP_ENV=production web hackdawg-chore
