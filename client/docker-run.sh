# build image
docker build . -t ubuntu:repository-organizer-client

# build container
docker container run -d -it \
        -p 80:80 \
        --name repository-organizer-client ubuntu:repository-organizer-client
#        --mount type=bind,source="$(pwd)",target=/usr/project/client,readonly \
#        --name repository-organizer-client ubuntu:repository-organizer-client
