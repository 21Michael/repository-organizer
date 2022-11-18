resource aws_iam_instance_profile "ecs_agent" {
  name = "ecs-agent"
  role = aws_iam_role.ecs.name
}

# ======================================= ROLE ======================================= #
# ------------------------------ iam_role ------------------------------ #

resource "aws_iam_role" "cloudwatchevent" {
  name               = "cloudWatchEventRole"
  assume_role_policy = data.aws_iam_policy_document.cloudwatchevent-assume-role-policy.json
  managed_policy_arns = [
    aws_iam_policy.cloudwatchevent.arn
  ]
}

resource "aws_iam_role" "codedeploy" {
  name = "codedeployRole"
  assume_role_policy = data.aws_iam_policy_document.codedeploy-assume-role-policy.json
  managed_policy_arns = [
    aws_iam_policy.codedeploy.arn
  ]
}

resource "aws_iam_role" "ecs" {
  name = "ecsInstanceRole"
  assume_role_policy  = data.aws_iam_policy_document.ecs-assume-role-policy.json
  managed_policy_arns = [
    "arn:aws:iam::aws:policy/AmazonEC2FullAccess",
    "arn:aws:iam::aws:policy/AmazonECS_FullAccess",
    "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy",
    "arn:aws:iam::aws:policy/service-role/AWSLambdaENIManagementAccess"
  ]
}

resource "aws_iam_role" "codepipeline" {
  name               = "codepipelineRole"
  assume_role_policy = data.aws_iam_policy_document.codepipeline-assume-role-policy.json
  managed_policy_arns = [
    aws_iam_policy.codepipeline.arn,
    aws_iam_policy.codebuild.arn,
    aws_iam_policy.codedeploy.arn
  ]
}

resource "aws_iam_role" "codebuild" {
  name               = "codebuildRole"
  assume_role_policy = data.aws_iam_policy_document.codebuild-assume-role-policy.json
  managed_policy_arns = [
    aws_iam_policy.codebuild.arn
  ]
}

# ------------------------------ iam_policy_document assume_role ------------------------------ #

data "aws_iam_policy_document" "cloudwatchevent-assume-role-policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["events.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "codedeploy-assume-role-policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codedeploy.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "codebuild-assume-role-policy" {
  statement {
    sid     = "AllowAssumeByCodebuild"
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codebuild.amazonaws.com"]
    }
  }
}

data "aws_iam_policy_document" "codepipeline-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["codepipeline.amazonaws.com"]
      type        = "Service"
    }
  }
}

data "aws_iam_policy_document" "ecs-assume-role-policy" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      identifiers = ["ec2.amazonaws.com", "ecs-tasks.amazonaws.com"]
      type        = "Service"
    }
  }
}

# ======================================= POLICY ======================================= #
# ------------------------------ iam_policy ------------------------------ #

resource "aws_iam_policy" "cloudwatchevent" {
  name = "cloudwatchevent"
  policy = data.aws_iam_policy_document.cloudwatchevent-policy.json
}

resource "aws_iam_policy" "codedeploy" {
  name   = "codedeploy"
  policy = data.aws_iam_policy_document.codedeploy-policy.json
}

resource "aws_iam_policy" "codepipeline" {
  name   = "codepipeline"
  policy = data.aws_iam_policy_document.codepipeline-policy.json
}

resource "aws_iam_policy" "codebuild" {
  name   = "codebuild"
  policy = data.aws_iam_policy_document.codebuild-policy.json
}

resource "aws_ecr_repository_policy" "repository-organizer-policy" {
  for_each = var.repositories
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

# ------------------------------ iam_role_policy ------------------------------ #

data "aws_iam_policy_document" "cloudwatchevent-policy" {
  statement {
    effect = "Allow"
    actions = [
      "codepipeline:StartPipelineExecution"
    ]
    resources = [
      var.codepipeline.arn
    ]
  }
}

data "aws_iam_policy_document" "codepipeline-policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketVersioning",
      "s3:PutObjectAcl",
      "s3:PutObject"
    ]
    resources = [
      "${var.s3_bucket.arn}",
      "${var.s3_bucket.arn}/*"
    ]
  }
  statement {
    effect = "Allow"
    actions = [
      "ecs:CreateTaskSet",
      "ecs:DeleteTaskSet",
      "ecs:DescribeServices",
      "ecs:UpdateServicePrimaryTaskSet",
      "ecs:RegisterTaskDefinition",
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
      "ecr:DescribeImages",
      "codedeploy:CreateDeployment",
      "codedeploy:GetApplication",
      "codedeploy:GetApplicationRevision",
      "codedeploy:GetDeployment",
      "codedeploy:GetDeploymentConfig",
      "codedeploy:RegisterApplicationRevision"
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "kms:Encrypt",
      "kms:Decrypt",
      "kms:ReEncrypt*",
      "kms:GenerateDataKey*",
      "kms:DescribeKey"
    ]
    resources = ["${var.kms_key.arn}"]
  }
  statement {
    actions = [
      "iam:PassRole"
    ]
    effect = "Allow"
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "iam:PassRole"
    ]
    resources = ["*"]
    condition {
      test = "StringLike"
      variable = "ecs-tasks.amazonaws.com"
      values   = ["PassedToService"]
    }
  }
}

resource "aws_ecr_repository_policy" "ecr-policy" {
  for_each = var.repositories
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

data "aws_iam_policy_document"  "codebuild-policy" {
  statement {
    effect = "Allow"
    actions = [
      "s3:GetObject",
      "s3:GetObjectVersion",
      "s3:GetBucketVersioning",
      "s3:PutObjectAcl",
      "s3:PutObject"
    ]
    resources = [
      "${var.s3_bucket.arn}",
      "${var.s3_bucket.arn}/*"
    ]
  }
  statement {
    effect = "Allow"
    actions = [
      "codebuild:BatchGetBuilds",
      "codebuild:StartBuild",
      "ecr:DescribeImages",
      "codedeploy:CreateDeployment",
      "codedeploy:GetApplication",
      "codedeploy:GetApplicationRevision",
      "codedeploy:GetDeployment",
      "codedeploy:GetDeploymentConfig",
      "codedeploy:RegisterApplicationRevision",
      "ecs:DescribeTaskDefinition"
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "kms:Encrypt",
      "kms:Decrypt",
      "kms:ReEncrypt*",
      "kms:GenerateDataKey*",
      "kms:DescribeKey"
    ]
    resources = ["${var.kms_key.arn}"]
  }
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogGroup",
      "logs:CreateLogStream"
    ]
    resources = ["*"]
  }
}

data "aws_iam_policy_document" "codedeploy-policy" {
  statement {
    effect = "Allow"
    actions = [
      "ec2:*",
      "elasticloadbalancing:*",
      "autoscaling:*",
      "cloudwatch:*",
      "s3:*",
      "sns:*",
      "cloudformation:*",
      "rds:*",
      "sqs:*",
      "ecs:*",
      "iam:PassRole"
    ]
    resources = ["*"]
  }
  statement {
    effect = "Allow"
    actions = [
      "iam:PassRole"
    ]
    resources = ["*"]
    condition {
      test = "StringLike"
      variable = "ecs-tasks.amazonaws.com"
      values   = ["PassedToService"]
    }
  }
}
