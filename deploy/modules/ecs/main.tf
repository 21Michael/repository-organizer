resource "aws_ecs_cluster" "repository-organizer" {
  name = var.app_name
}

resource "aws_ecs_service" "repository-organizer-client" {
  name = "${var.app_name}-client"
  cluster = aws_ecs_cluster.repository-organizer.id
  task_definition = var.taskdef_repository_organizer_client.arn
  launch_type = "EC2"
  desired_count = 1
  force_new_deployment = true
#  network_configuration {
#    subnets = [
#      var.subnet_repository_organizer_client_public.id
#    ]
#    security_groups = [
#      var.security_group_repository_organizer_client_public.id
#    ]
#    assign_public_ip = true
#  }
}

#resource "aws_ecs_service" "repository-organizer-server" {
#  name = "${var.app_name}-server"
#  cluster = aws_ecs_cluster.repository-organizer.id
#  task_definition = var.taskdef_repository_organizer_server.arn
#  launch_type = "EC2"
#  desired_count = 1
#  force_new_deployment = true
#  network_configuration {
#    subnets = [
#      var.subnet_repository_organizer_server_private.id
#    ]
#    security_groups = [
#      var.security_group_repository_organizer_server_private.id
#    ]
#    assign_public_ip = false
#  }
#}

#resource "aws_ecs_task_set" "repository-organizer-client" {
#  service = aws_ecs_service.repository-organizer-client.id
#  cluster = aws_ecs_cluster.repository-organizer.id
#  task_definition = var.taskdef_repository_organizer_client.arn
#  launch_type = "EC2"
#  network_configuration {
#    subnets = [
#      var.subnet_repository_organizer_client_public.id
#    ]
#    security_groups = [
#      var.security_group_repository_organizer_client_public.id
#    ]
#  }
#}

#resource "aws_ecs_task_set" "repository-organizer-server" {
#  service = aws_ecs_service.repository-organizer-server.id
#  cluster = aws_ecs_cluster.repository-organizer.id
#  task_definition = var.taskdef_repository_organizer_server.arn
#}



