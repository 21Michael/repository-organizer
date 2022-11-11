variable "app_name" {
  type = string
}

variable "avail_zone_a" {
  type = string
}

variable "avail_zone_b" {
  type = string
}

variable "public_key_ec2_path" {
  type = string
}

variable "ecs_instance_profile" {
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


