resource "aws_cloudwatch_log_group" "loggroup-repository_organizer-client" {
  name = "${var.app_name}-client-logs"

  tags = {
    Application = var.app_name
  }
}

resource "aws_cloudwatch_log_group" "loggroup-repository_organizer-server" {
  name = "${var.app_name}-server-logs"

  tags = {
    Application = var.app_name
  }
}
