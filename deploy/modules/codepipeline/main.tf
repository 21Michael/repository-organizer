resource "aws_codepipeline" "repository-organizer-pipeline" {
  name     = "repository-organizer-pipeline"
  role_arn = var.codepipeline_iam_role.arn

  artifact_store {
    location = var.codepipeline_s3_bucket.bucket
    type     = "S3"

    encryption_key {
      id   = var.kms_key.id
      type = "KMS"
    }
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "AWS"
      provider         = "ECR"
      version          = "1"
      output_artifacts = ["SourceArtifact"]

      configuration = {
        RepositoryName = "${var.ecr_repository.name}"
        ImageTag       = "latest"
      }
    }
  }

  stage {
    name = "Build"

    action {
      name             = "Build"
      category         = "Build"
      owner            = "AWS"
      provider         = "CodeBuild"
      version          = "1"
      input_artifacts  = ["SourceArtifact"]
      output_artifacts = ["BuildArtifact"]

      configuration = {
        ProjectName = "${var.aws_codebuild_project.name}"
      }
    }
  }

  stage {
    name = "Deploy"

    action {
      name            = "Deploy"
      category        = "Deploy"
      owner           = "AWS"
      provider        = "ECS"
      input_artifacts = ["BuildArtifact"]
      version         = "1"

      configuration = {
        ClusterName = var.aws_ecs_cluster.name
        ServiceName = var.aws_ecs_service.name
      }
    }
  }
}


