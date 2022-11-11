
variable "app_name" {
  type = string
  default = "repository-organizer"
}
variable "public_key_ec2_path" {
  type = string
}
variable "avail_zone_a" {
  type = string
}
variable "avail_zone_b" {
  type = string
}
variable "avail_zone_c" {
  type = string
}
variable "AWS_DEFAULT_REGION" {
  type = string
}
variable "AWS_ACCESS_KEY_ID" {
  type = string
}
variable "AWS_SECRET_ACCESS_KEY" {
  type = string
}
variable "my_ip" {
  type = string
  default = "93.76.231.191"
}

