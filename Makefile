IMAGE_NAME := $(notdir $(basename $(CURDIR)))

start: clear_env
	@echo "Running docker image...\n"
	docker run -it -p 3000:3000 -p 25565:25565 --name $(IMAGE_NAME) -e DOCKER_ENV=true -v $(CURDIR):/usr/src/app $(IMAGE_NAME):latest bash

build:
	@echo "Building docker image...\n"
	docker build --no-cache -t $(IMAGE_NAME) .

clear_env:
	@echo "Cleaning environment...\n"
	docker rm $(IMAGE_NAME) || true

own:
ifeq ("$(DOCKER_ENV)","true")
	@echo "Changing file ownership..."
	@chown -R node:node .
	@echo "Success!\n"
	@echo "Changing file permissions..."
	@chmod -R u=rwx .
	@echo "Success!\n"
else
	@echo "Error: this command must be ran inside the Docker container"
	@exit 1
endif