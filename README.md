This project uses docker instad of NVM to manage Node versions.

For development do the following:

- Install `docker`

- Run `make build` to build the Docker image

- Run `make` to access the Docker container (node is available here)

- Run `npm i` (or any node related command)

If you are having issues with file permissions or ownership run `make own` within the Docker container.
