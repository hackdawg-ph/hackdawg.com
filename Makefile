.PHONY: build

copy_hosts: 
	@sudo chmod +x ./deploy/copy_hosts.sh
	@sudo ./deploy/copy_hosts.sh

init:
	@docker container exec -it web hackdawg-init

deploy-local:
	@make copy_hosts
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.local.yml \
		up --build --force-recreate

deploy-production:
	@make copy_hosts
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.production.yml \
		up -d --build --force-recreate
