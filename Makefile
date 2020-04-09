.PHONY: build

chore:
	@docker container exec -it web hackdawg-chore

deploy-local:
	@sudo chmod +x ./deploy/copy_hosts.local.sh
	@sudo ./deploy/copy_hosts.local.sh
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.local.yml \
		up --build --force-recreate

deploy-production:
	@sudo chmod +x ./deploy/copy_hosts.production.sh
	@sudo ./deploy/copy_hosts.production.sh
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.production.yml \
		up -d --build --force-recreate
