resource aws_ecr_repository "repository-organizer-client" {
  name = "${var.app_name}-client"
  image_tag_mutability = "MUTABLE"
  force_delete = false
  image_scanning_configuration {
    scan_on_push = true
  }
  encryption_configuration {
    encryption_type = "KMS"
    kms_key = var.kms_key.arn
  }
}

resource aws_ecr_repository "repository-organizer-server" {
  name = "${var.app_name}-server"
  image_tag_mutability = "MUTABLE"
  force_delete = false
  image_scanning_configuration {
    scan_on_push = true
  }
  encryption_configuration {
    encryption_type = "KMS"
    kms_key = var.kms_key.arn
  }
}
