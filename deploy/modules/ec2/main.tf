data "aws_ami" "latest-amazon-linux-image" {
  most_recent = true
  owners      = [
    "amazon"
  ]
  filter {
    name   = "name"
    values = ["amzn-ami-*-amazon-ecs-optimized"]
  }
}

resource "aws_key_pair" "repository-organizer-key-ec2" {
  key_name   = "${var.app_name}-key-ec2"
  public_key = file(var.public_key_ec2_path)
}

# ------------------------------ Launch-config ------------------------------ #

resource "aws_launch_configuration" "repository-organizer-client" {
  name_prefix                 = "${var.app_name}-client"
  image_id                    = data.aws_ami.latest-amazon-linux-image.id
  iam_instance_profile        = var.ecs_instance_profile.arn
  associate_public_ip_address = true
  security_groups             = [
    var.security_group_repository_organizer_client_public.id
  ]
  user_data     = file("user_data.sh")
  instance_type = "t3a.micro"
  key_name      = aws_key_pair.repository-organizer-key-ec2.key_name
  lifecycle {
    create_before_destroy = true
  }
}

#resource "aws_launch_configuration" "repository-organizer-server" {
#  name_prefix                 = "${var.app_name}-server"
#  image_id                    = data.aws_ami.latest-amazon-linux-image.id
#  iam_instance_profile        = var.ecs_instance_profile.arn
#  associate_public_ip_address = false
#  security_groups             = [
#    var.security_group_repository_organizer_server_private.id
#  ]
#  user_data     = file("user_data.sh")
#  instance_type = "t3a.micro"
#  key_name      = aws_key_pair.repository-organizer-key-ec2.key_name
#  lifecycle {
#    create_before_destroy = true
#  }
#}

# ------------------------------ Auto-scaling group ------------------------------ #

resource "aws_autoscaling_group" "repository-organizer-client" {
  name                = "${var.app_name}-client"
  vpc_zone_identifier = [
    var.subnet_repository_organizer_client_public.id
  ]
  launch_configuration      = aws_launch_configuration.repository-organizer-client.name
  desired_capacity          = 1
  min_size                  = 1
  max_size                  = 1
  health_check_grace_period = 300
  health_check_type         = "EC2"
}

#resource "aws_autoscaling_group" "repository-organizer-server" {
#  name                = "${var.app_name}-server"
#  vpc_zone_identifier = [
#    var.subnet_repository_organizer_server_private.id
#  ]
#  launch_configuration      = aws_launch_configuration.repository-organizer-server.name
#  desired_capacity          = 1
#  min_size                  = 1
#  max_size                  = 1
#  health_check_grace_period = 300
#  health_check_type         = "EC2"
#}

# ------------------------------ EC2-instances ------------------------------ #

#resource "aws_instance" "repository-organizer-client" {
#  iam_instance_profile   = var.ecs_instance_profile.name,
#  ami                    = data.aws_ami.latest-amazon-linux-image.id,
#  instance_type          = "t2.micro",
#  subnet_id              = var.subnet_repository_organizer_client_public.id,
#  vpc_security_group_ids = [
#    var.security_group_repository_organizer_client_public.id
#  ],
#  associate_public_ip_address = true,
#  key_name = aws_key_pair.repository-organizer-key-ec2.key_name,
#  tags = {
#    "Name": "${var.app_name}-client"
#  }
#}
#
#resource "aws_instance" "repository-organizer-server" {
#  iam_instance_profile   = var.ecs_instance_profile.name,
#  ami                    = data.aws_ami.latest-amazon-linux-image.id,
#  instance_type          = "t2.micro",
#  subnet_id              = var.subnet_repository_organizer_server_private.id,
#  vpc_security_group_ids = [
#    var.security_group_repository_organizer_server_private.id
#  ],
#  associate_public_ip_address = false,
#  key_name = aws_key_pair.repository-organizer-key-ec2.key_name,
#  tags = {
#    "Name": "${var.app_name}-server"
#  }
#}



