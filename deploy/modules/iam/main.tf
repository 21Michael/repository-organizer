resource aws_iam_instance_profile "ecs_agent" {
  name = "ecs-agent"
  role = aws_iam_role.ecs.name
}

resource "aws_iam_role" "ecs" {
  assume_role_policy  = data.aws_iam_policy_document.ecs.json
  managed_policy_arns = [
    data.aws_iam_policy.ec2.arn,
    data.aws_iam_policy.ecs.arn,
    data.aws_iam_policy.ecs_task_def.arn,
    data.aws_iam_policy.eni.arn
  ]
  name = "ecsInstanceRole"
}

resource  aws_iam_role_policy_attachment "ecs" {
  role       = aws_iam_role.ecs.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

data "aws_iam_policy_document" "ecs" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["ec2.amazonaws.com", "ecs-tasks.amazonaws.com"]
      type        = "Service"
    }
  }
}

data "aws_iam_policy" "ec2" {
  arn = "arn:aws:iam::aws:policy/AmazonEC2FullAccess"
}

data "aws_iam_policy" "ecs" {
  arn = "arn:aws:iam::aws:policy/AmazonECS_FullAccess"
}

data "aws_iam_policy" "ecs_task_def" {
  arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

data "aws_iam_policy" "eni" {
  arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaENIManagementAccess"
}

resource "aws_ecr_repository_policy" "repository-organizer-policy" {
  for_each = var.repository_organizer_repositories
  repository = each.value.name
  policy     = <<EOF
  {
    "Version": "2008-10-17",
    "Statement": [
      {
        "Sid": "adds full ecr access to the demo repository",
        "Effect": "Allow",
        "Principal": "*",
        "Action": [
          "ecr:BatchCheckLayerAvailability",
          "ecr:BatchGetImage",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:GetLifecyclePolicy",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart"
        ]
      }
    ]
  }
  EOF
}

