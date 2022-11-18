output "aws_ecs_cluster" {
  value = aws_ecs_cluster.repository-organizer
}

output "aws_ecs_service_client" {
  value = aws_ecs_service.repository-organizer-client
}

#output "aws_ecs_service_server" {
#  value = aws_ecs_service.repository-organizer-server
#}
