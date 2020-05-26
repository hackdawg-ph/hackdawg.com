.PHONY: build

test-db-connection:
	./deploy/wait-until.sh \
		"docker-compose -f deploy/docker-compose.yml exec -T -e MYSQL_PWD=password db mysql -D hackdawg -e 'select 1'"

create-test-database:
	@docker container exec db mysql -uroot -ppassword -e 'CREATE DATABASE IF NOT EXISTS hackdawg_testing'

run-init-sql:
	@docker container exec db mysql -uroot -ppassword hackdawg_testing < deploy/db/init.sql

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
	@docker container exec -it -e APP_ENV=production web hackdawg-chore
