# build image
docker build . -t ubuntu:repository-organizer-server

# build container
docker container run -d -it \
        --mount type=bind,source="$(pwd)",target=/usr/project/server \
        --name repository-organizer-server ubuntu:repository-organizer-server
