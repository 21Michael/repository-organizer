resource aws_kms_key "repository-organizer-key-ecr" {
  key_usage = "ENCRYPT_DECRYPT"
  is_enabled = true
  enable_key_rotation = false
}

resource aws_kms_alias "repository-organizer-key-ecr" {
  name = "alias/ecr-kms"
  target_key_id = aws_kms_key.repository-organizer-key-ecr.key_id
}



