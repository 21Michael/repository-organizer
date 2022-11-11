# 1) Login to AWS ECR storage:
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 995353575805.dkr.ecr.eu-west-2.amazonaws.com

# 2) Build:
docker build . -t ubuntu:repository-organizer-server

# 3) Push docker images to ECR:
docker tag ubuntu:repository-organizer-server 995353575805.dkr.ecr.eu-west-2.amazonaws.com/repository-organizer-server
docker push 995353575805.dkr.ecr.eu-west-2.amazonaws.com/repository-organizer-server


