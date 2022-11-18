variable "app_name" {
  type = string
}

variable "codedeploy_iam_role" {
  type = object({
    arn = string
  })
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
