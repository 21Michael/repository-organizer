# 1) Login to AWS ECR storage:
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 995353575805.dkr.ecr.us-east-1.amazonaws.com

# 2) Build docker images:
cd ..
docker compose build

# 3) Push docker images to ECR:
docker compose push


