variable "app_name" {
  type = string
}

variable "codebuild_iam_role" {
  type = object({
    arn = string
  })
}
