resource "aws_ecs_task_definition" "repository-organizer-client" {
  family = "${var.app_name}-client"
#  network_mode = "awsvpc"
  requires_compatibilities = [
    "EC2"
  ]
  memory = "963"
  cpu = "1024"
  execution_role_arn = var.ecs_iam_role.arn
  container_definitions = jsonencode([
    {
      name : "${var.app_name}-client",
      image : var.repository_repository_organizer_client.repository_url,
      memory : 256,
      cpu : 256,
      pseudoTerminal: true,
#      environment: [
#        {"name": "REACT_APP_SERVER_URL", "value": "${var.eip_repository_organizer_server_private.private_ip}"}
#      ],
      portMappings : [
        {
          "containerPort": 80,
          "hostPort": 80
        }
      ],
      logConfiguration : {
        logDriver : "awslogs",
        options : {
          awslogs-group : "${var.loggroup_repository_organizer_client.name}",
          awslogs-region : "${var.AWS_DEFAULT_REGION}",
          awslogs-stream-prefix : "ecs"
        }
      }
    },
    {
      name : "${var.app_name}-server",
      image : var.repository_repository_organizer_server.repository_url,
      memory : 512,
      cpu : 512,
      portMappings : [
        {
          "containerPort": 4000,
          "hostPort": 4000
        }
      ],
      logConfiguration : {
        logDriver : "awslogs",
        options : {
          awslogs-group : "${var.loggroup_repository_organizer_server.name}",
          awslogs-region : "${var.AWS_DEFAULT_REGION}",
          awslogs-stream-prefix : "ecs"
        }
      }
    }
  ])
  placement_constraints {
    type       = "memberOf"
    expression = "attribute:ecs.subnet-id == ${var.subnet_repository_organizer_client_public.id}"
  }
}
#
#resource "aws_ecs_task_definition" "repository-organizer-server" {
#  family = "${var.app_name}-server"
##  network_mode = "awsvpc"
#  requires_compatibilities = [
#    "EC2"
#  ]
#  memory = "512"
#  cpu = "512"
#  execution_role_arn = var.ecs_iam_role.arn
#  container_definitions = jsonencode([
#    {
#      name : "${var.app_name}-server",
#      image : var.repository_repository_organizer_server.repository_url,
#      memory : 512,
#      cpu : 512,
#      portMappings : [
#        {
#          "containerPort": 80,
#          "hostPort": 80
#        }
#      ],
#      logConfiguration : {
#        logDriver : "awslogs",
#        options : {
#          awslogs-group : "${var.loggroup_repository_organizer_server.name}",
#          awslogs-region : "${var.AWS_DEFAULT_REGION}",
#          awslogs-stream-prefix : "ecs"
#        }
#      }
#    }
#  ])
#  placement_constraints {
#    type       = "memberOf"
#    expression = "attribute:ecs.subnet-id == ${var.subnet_repository_organizer_server_private.id}"
#  }
#}
