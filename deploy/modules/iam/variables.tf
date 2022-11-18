variable "repositories" {
  type = map(object({
    name = string
  }))
}

variable "s3_bucket" {
  type = object({
    arn = string
  })
}

variable "kms_key" {
  type = object({
    arn = string
  })
}

variable "codepipeline" {
  type = object({
    arn = string
  })
}
