variable "app_name" {
  type = string
}

variable "vpc_repository_organizer" {
  type = object({
    arn = string
  })
}

variable "security_group_repository_organizer_client_public" {
  type = object({
    id = string
  })
}

#variable "security_group_repository_organizer_server_private" {
#  type = object({
#    id = string
#  })
#}

variable "taskdef_repository_organizer_client" {
  type = object({
    arn = string
  })
}

#variable "taskdef_repository_organizer_server" {
#  type = object({
#    arn = string
#  })
#}

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



