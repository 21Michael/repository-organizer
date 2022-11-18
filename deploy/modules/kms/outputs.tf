output key_ecr {
  value = aws_kms_key.ecr
}

output key_codepipeline {
  value = aws_kms_key.codepipeline
}

