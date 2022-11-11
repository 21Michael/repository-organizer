# 1) Login to AWS ECR storage:
aws ecr get-login-password --region eu-west-2 | docker login --username AWS --password-stdin 995353575805.dkr.ecr.eu-west-2.amazonaws.com

# 2) Build docker images:
docker compose build --no-cache

# 3) Push docker images to ECR:
docker compose push


