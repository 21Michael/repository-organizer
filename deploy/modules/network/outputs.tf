output "vpc_repository_organizer" {
  value = aws_vpc.repository-organizer
}
output "subnet_repository_organizer_client_public" {
  value = aws_subnet.repository-organizer-client-public
}
#output "subnet_repository_organizer_server_private" {
#  value = aws_subnet.repository-organizer-server-private
#}
output "security_group_repository_organizer_client_public" {
  value = aws_security_group.repository-organizer-client-public
}
#output "security_group_repository_organizer_server_private" {
#  value = aws_security_group.repository-organizer-server-private
#}
#output "eip_repository_organizer_server_private" {
#  value = data.aws_eip.nat_gateway
#}



