resource aws_kms_key "ecr" {
  key_usage = "ENCRYPT_DECRYPT"
  is_enabled = true
  enable_key_rotation = false
}

resource aws_kms_key "codepipeline" {
  key_usage = "ENCRYPT_DECRYPT"
  is_enabled = true
  enable_key_rotation = false
}

resource aws_kms_alias "ecr" {
  name = "alias/ecr-kms2"
  target_key_id = aws_kms_key.ecr.key_id
}

resource "aws_kms_alias" "codepipeline" {
  name = "alias/s3-codepipeline-key"
  target_key_id = aws_kms_key.codepipeline.key_id
}

