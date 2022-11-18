variable "kms_key" {
  type = object({
    arn = string
  })
}

variable "app_name" {
  type = string
}


