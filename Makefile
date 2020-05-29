.PHONY: build

include .env

chore:
	@docker container exec -e APP_ENV=${APP_ENV} web hackdawg-chore

test:
	@docker container exec web composer test

ping-db:
	deploy/wait-until.sh "docker exec -t -e MYSQL_PWD=${DB_PASSWORD} db mysql -D ${DB_DATABASE} -e 'select 1'"

copy-hosts:
	sudo chmod +x ./deploy/copy_hosts.sh && sudo ./deploy/copy_hosts.sh

illuminate:
	APP_ENV=${APP_ENV} deploy/illuminate.sh
