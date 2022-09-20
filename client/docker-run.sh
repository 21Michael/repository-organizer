# build image
docker build . -t ubuntu:repository-organizer-client

# build container
docker container run -d -it \
        -p 3001:3000 \
        --mount type=bind,source="$(pwd)",target=/usr/project/client,readonly \
        --name repository-organizer-client ubuntu:repository-organizer-client
