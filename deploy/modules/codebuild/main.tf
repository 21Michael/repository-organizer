resource "aws_codebuild_project" "repository-organizer" {
  name         = "${var.app_name}-codebuild"
  description  = "Codebuild for the ECS ${var.app_name} app"
  service_role = "${var.codebuild_iam_role.arn}"

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type    = "BUILD_GENERAL1_SMALL"
    image           = "aws/codebuild/docker:18.09.0"
    type            = "LINUX_CONTAINER"
    privileged_mode = true
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = file("/home/user/Desktop/github/repository-organizer/client/buildspec.yml")
  }
}
