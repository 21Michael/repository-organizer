resource "aws_cloudwatch_event_rule" "image_push" {
  name     = "ecr_image_push"
  role_arn = var.iam_role.arn

  event_pattern = <<EOF
{
  "source": [
    "aws.ecr"
  ],
  "detail": {
    "action-type": [
      "PUSH"
    ],
    "image-tag": [
      "latest"
    ],
    "repository-name": [
      "${var.ecr_repository.name}"
    ],
    "result": [
      "SUCCESS"
    ]
  },
  "detail-type": [
    "ECR Image Action"
  ]
}
EOF
}

resource "aws_cloudwatch_event_target" "codepipeline" {
  rule      = aws_cloudwatch_event_rule.image_push.name
  target_id = "${var.ecr_repository.name}-Image-Push-Codepipeline"
  arn       = var.codepipeline.arn
  role_arn  = var.iam_role.arn
}
