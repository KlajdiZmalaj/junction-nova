# Service on which executes bash shell.
SERVICE_NAME=node


IMAGE_TAG=latest

# Help Message
## ----------------------------------------------------------------------
## Available commands:
## ----------------------------------------------------------------------


upd:     ## Like "up" but in daemon mode.
	 ## ~~~~~
	@docker-compose up -d;


shell:	 ## Bash shell
	 ## ~~~~~
	@docker-compose exec ${SERVICE_NAME} sh;

%:
	@true

