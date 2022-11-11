variable "app_name" {
  type = string
}

variable "AWS_DEFAULT_REGION" {
  type = string
}

variable "loggroup_repository_organizer_client" {
  type = object({
    name = string
  })
}

variable "loggroup_repository_organizer_server" {
  type = object({
    name = string
  })
}

variable "repository_repository_organizer_client" {
  type = object({
    repository_url = string
  })
}

variable "repository_repository_organizer_server" {
  type = object({
    repository_url = string
  })
}

variable "ecs_iam_role" {
  type = object({
    arn = string
  })
}

variable "subnet_repository_organizer_client_public" {
  type = object({
    id = string
  })
}

#variable "subnet_repository_organizer_server_private" {
#  type = object({
#    id = string
#  })
#}
#
#variable "eip_repository_organizer_server_private" {
#  type = object({
#    private_ip = string
#  })
#}
