resource "aws_vpc" "repository-organizer" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  tags                 = {
    Name = var.app_name
  }
}

# ------------------------------ INTERNET-GATEWAY ------------------------------ #

resource "aws_internet_gateway" "repository-organizer" {
  vpc_id = aws_vpc.repository-organizer.id
  tags   = {
    Name = var.app_name
  }
}

# ------------------------------ NAT-GATEWAY ------------------------------ #

#data "aws_eip" "nat_gateway" {
#  public_ip = "13.41.210.230"
#}

#resource "aws_eip" "nat_gateway" {
#  vpc = true
#}

#resource "aws_nat_gateway" "repository-organizer-server" {
#  allocation_id = data.aws_eip.nat_gateway.id
#  subnet_id     = aws_subnet.repository-organizer-client-public.id
#  tags          = {
#    Name = "${var.app_name}-server-private"
#  }
#}

# ------------------------------ SUBNETS ------------------------------ #

resource "aws_subnet" "repository-organizer-client-public" {
  vpc_id                  = aws_vpc.repository-organizer.id
  availability_zone       = var.avail_zone_a
  map_public_ip_on_launch = true
  cidr_block              = "10.0.2.0/24"
  tags                    = {
    Name = "${var.app_name}-client-public"
  }
}

#resource "aws_subnet" "repository-organizer-server-private" {
#  vpc_id            = aws_vpc.repository-organizer.id
#  availability_zone = var.avail_zone_a
#  cidr_block        = "10.0.1.0/24"
#  tags              = {
#    Name = "${var.app_name}-server-private"
#  }
#}

# ------------------------------ NACL ------------------------------ #

resource "aws_network_acl" "repository-organizer-public" {
  vpc_id = aws_vpc.repository-organizer.id
  egress = [
    {
      protocol        = "-1"
      rule_no         = 200
      action          = "allow"
      cidr_block      = "0.0.0.0/0"
      from_port       = 0
      to_port         = 0
      icmp_type       = 0
      icmp_code       = 0
      ipv6_cidr_block = null
    }
  ]
  ingress = [
    {
      protocol        = "-1"
      rule_no         = 100
      action          = "allow"
      cidr_block      = "0.0.0.0/0"
      from_port       = 0
      to_port         = 0
      icmp_type       = 0
      icmp_code       = 0
      ipv6_cidr_block = null
    }
  ]
  tags = {
    Name = "${var.app_name}-public"
  }
}

#resource "aws_network_acl" "repository-organizer-private" {
#  vpc_id = aws_vpc.repository-organizer.id
#  egress = [
#    {
#      protocol        = "-1",
#      rule_no         = 200,
#      action          = "allow",
#      cidr_block      = "0.0.0.0/0",
#      from_port       = 0,
#      to_port         = 0,
#      icmp_type       = 0,
#      icmp_code       = 0,
#      ipv6_cidr_block = null
#    }
#  ]
#  ingress = [
#    {
#      protocol        = "all"
#      rule_no         = 100
#      action          = "allow"
#      cidr_block      = "0.0.0.0/0"
#      from_port       = 0
#      to_port         = 0
#      icmp_type       = 0
#      icmp_code       = 0
#      ipv6_cidr_block = null
#    }
#  ]
#  tags    = {
#    Name = "${var.app_name}-private"
#  }
#}

#resource "aws_network_acl_association" "repository-organizer-private" {
#  network_acl_id = aws_network_acl.repository-organizer-private.id
#  subnet_id      = aws_subnet.repository-organizer-server-private.id
#}

resource "aws_network_acl_association"  "repository-organizer-public" {
  network_acl_id = aws_network_acl.repository-organizer-public.id
  subnet_id      = aws_subnet.repository-organizer-client-public.id
}

# ------------------------------ ROUTE-TABLE ------------------------------ #

resource "aws_route_table" "repository-organizer-client-public" {
  vpc_id = aws_vpc.repository-organizer.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.repository-organizer.id
  }
  tags = {
    Name = "${var.app_name}-client-public"
  }
}

#resource "aws_route_table" "repository-organizer-server-private" {
#  vpc_id = aws_vpc.repository-organizer.id
#  route {
#    cidr_block = "0.0.0.0/0"
#    nat_gateway_id = aws_nat_gateway.repository-organizer-server.id
#  }
#  tags = {
#    "Name" : "${var.app_name}-server-private"
#  }
#}

#resource "aws_main_route_table_association" "repository-organizer" {
#  route_table_id = aws_route_table.repository-organizer-client-public.id
#  vpc_id         = aws_vpc.repository-organizer.id
#}

resource  "aws_route_table_association" "repository-organizer-client" {
  subnet_id      = aws_subnet.repository-organizer-client-public.id
  route_table_id = aws_route_table.repository-organizer-client-public.id
}

#resource  "aws_route_table_association"  "repository-organizer-server" {
#  subnet_id      = aws_subnet.repository-organizer-server-private.id
#  route_table_id = aws_route_table.repository-organizer-server-private.id
#}

# ------------------------------ SECURITY-GROUP ------------------------------ #

resource "aws_security_group" "repository-organizer-client-public" {
  name   = "${var.app_name}-client-public"
  vpc_id = aws_vpc.repository-organizer.id

  ingress = [
    {
      from_port        = 80
      to_port          = 80
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
      description      = "HTTP"
    },
    {
      from_port        = 22
      to_port          = 22
      protocol         = "tcp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
      description      = "SSH"
    },
    {
      from_port        = -1
      to_port          = -1
      protocol         = "icmp"
      cidr_blocks      = ["0.0.0.0/0"]
      ipv6_cidr_blocks = []
      prefix_list_ids  = []
      security_groups  = []
      self             = false
      description      = "ICMP"
    }
  ]

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "client public"
  }
  tags = {
    Name = "${var.app_name}-client-public"
  }
}

#resource "aws_security_group"  "repository-organizer-server-private" {
#  name   = "${var.app_name}-server-private"
#  vpc_id = aws_vpc.repository-organizer.id
#
#  ingress = [
#    {
#      from_port        = 22
#      to_port          = 22
#      protocol         = "tcp"
#      cidr_blocks      = ["0.0.0.0/0"]
#      ipv6_cidr_blocks = []
#      prefix_list_ids  = []
#      security_groups  = []
#      self             = false
#      description      = "SSH"
#    },
#    {
#      from_port        = 80
#      to_port          = 80
#      protocol         = "tcp"
#      cidr_blocks      = ["0.0.0.0/0"]
#      ipv6_cidr_blocks = []
#      prefix_list_ids  = []
#      security_groups  = []
#      self             = false
#      description      = "HTTP"
#    },
#    {
#      from_port        = -1
#      to_port          = -1
#      protocol         = "icmp"
#      cidr_blocks      = ["0.0.0.0/0"]
#      ipv6_cidr_blocks = []
#      prefix_list_ids  = []
#      security_groups  = []
#      self             = false
#      description      = "ICMP"
#    }
#  ]
#  egress {
#    from_port   = 0
#    to_port     = 0
#    protocol    = "-1"
#    cidr_blocks = ["0.0.0.0/0"]
#    description = "server private"
#  }
#  tags = {
#    Name = "${var.app_name}-server-private"
#  }
#}



