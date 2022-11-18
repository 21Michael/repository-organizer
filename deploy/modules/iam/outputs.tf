#output "codedeploy_iam_role" {
#  value = aws_iam_role.codedeploy
#}

output "cloudwatchevent_iam_role" {
  value = aws_iam_role.cloudwatchevent
}

output "ecs_iam_role" {
  value = aws_iam_role.ecs
}

output "codepipeline_iam_role" {
  value = aws_iam_role.codepipeline
}

output "codebuild_iam_role" {
  value = aws_iam_role.codebuild
}

output  "ecs_instance_profile" {
  value = aws_iam_instance_profile.ecs_agent
}


