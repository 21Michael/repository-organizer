output "aws_codedeploy_app" {
  value = aws_codedeploy_app.repository-organizer
}

output "aws_codedeploy_deployment_group" {
  value = aws_codedeploy_deployment_group.repository-organizer
}
