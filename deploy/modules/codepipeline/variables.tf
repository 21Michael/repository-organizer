variable "codepipeline_iam_role" {
  type = object({
    arn = string
  })
}

variable "codepipeline_s3_bucket" {
  type = object({
    bucket = string
  })
}

variable "kms_key" {
  type = object({
    id = string
  })
}

variable "ecr_repository" {
  type = object({
    name = string
  })
}

variable "aws_codebuild_project" {
  type = object({
    name = string
  })
}

#variable "aws_codedeploy_app" {
#  type = object({
#    name = string
#  })
#}
#
#variable "aws_codedeploy_deployment_group" {
#  type = object({
#    app_name = string
#  })
#}

variable "app_name" {
  type = string
}

variable "aws_ecs_cluster" {
  type = object({
    name = string
  })
}

variable "aws_ecs_service" {
  type = object({
    name = string
  })
}
