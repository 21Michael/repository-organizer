resource "aws_codedeploy_app" "repository-organizer" {
  compute_platform = "ECS"
  name             = "${var.app_name}-service-deploy"
}

resource "aws_codedeploy_deployment_group" "repository-organizer" {
  app_name               = aws_codedeploy_app.repository-organizer.name
  deployment_group_name  = "${var.app_name}-service-deploy-group"
  deployment_config_name = "CodeDeployDefault.ECSAllAtOnce"
  service_role_arn       = "${var.codedeploy_iam_role.arn}"

  ecs_service {
    cluster_name = "${var.aws_ecs_cluster.name}"
    service_name = "${var.aws_ecs_service.name}"
  }
}
