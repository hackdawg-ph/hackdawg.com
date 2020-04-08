.PHONY: build

init:
	@docker container exec -it web hackdawg-init

deploy-local:
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.local.yml \
		up --build --force-recreate

deploy-production:
	@docker-compose \
		-f docker-compose.yml \
		-f docker-compose.production.yml \
		up -d --build --force-recreate
