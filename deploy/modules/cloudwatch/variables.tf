variable "app_name" {
  type = string
}

variable "ecr_repository" {
  type = object({
    name = string
  })
}

variable "codepipeline" {
  type = object({
    arn = string
  })
}

variable "iam_role" {
  type = object({
    arn = string
  })
}
