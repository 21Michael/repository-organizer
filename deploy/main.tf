terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region     = var.AWS_DEFAULT_REGION
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

module "iam" {
  source = "./modules/iam"
  repositories = {
    "client": module.ecr.repository_repository_organizer_client
    "server": module.ecr.repository_repository_organizer_server
  }
  s3_bucket = module.s3.codepipeline_bucket
  kms_key   = module.kms.key_codepipeline
  codepipeline = module.codepipeline.aws_codepipeline
}

module "kms" {
  source   = "./modules/kms"
  app_name = var.app_name
}

module "s3" {
  source   = "./modules/s3"
}

module "ec2" {
  source                                             = "./modules/ec2"
  app_name                                           = var.app_name
  ecs_instance_profile                               = module.iam.ecs_instance_profile
  avail_zone_a                                       = var.avail_zone_a
  avail_zone_b                                       = var.avail_zone_b
  public_key_ec2_path                                = var.public_key_ec2_path
  security_group_repository_organizer_client_public  = module.network.security_group_repository_organizer_client_public
#  security_group_repository_organizer_server_private = module.network.security_group_repository_organizer_server_private
#  subnet_repository_organizer_server_private         = module.network.subnet_repository_organizer_server_private
  subnet_repository_organizer_client_public          = module.network.subnet_repository_organizer_client_public
}

module "logs" {
  source       = "./modules/logs"
  app_name     = var.app_name
}

module "network" {
  source       = "./modules/network"
  app_name     = var.app_name
  my_ip        = var.my_ip
  avail_zone_a = var.avail_zone_a
  avail_zone_b = var.avail_zone_b
}

module "task_def" {
  source                                     = "./modules/tasksDefinition"
  app_name                                   = var.app_name
  AWS_DEFAULT_REGION                         = var.AWS_DEFAULT_REGION
  ecs_iam_role                               = module.iam.ecs_iam_role
  loggroup_repository_organizer_client       = module.logs.loggroup_repository_organizer-client
  loggroup_repository_organizer_server       = module.logs.loggroup_repository_organizer-server
  repository_repository_organizer_client     = module.ecr.repository_repository_organizer_client
  repository_repository_organizer_server     = module.ecr.repository_repository_organizer_server
  subnet_repository_organizer_client_public  = module.network.subnet_repository_organizer_client_public
#  subnet_repository_organizer_server_private = module.network.subnet_repository_organizer_server_private
#  eip_repository_organizer_server_private    = module.network.eip_repository_organizer_server_private
}

module "ecs" {
  source                                             = "./modules/ecs"
  app_name                                           = var.app_name
  taskdef_repository_organizer_client                = module.task_def.taskdef_repository_organizer_client
#  taskdef_repository_organizer_server                = module.task_def.taskdef_repository_organizer_server
  vpc_repository_organizer                           = module.network.vpc_repository_organizer
  security_group_repository_organizer_client_public  = module.network.security_group_repository_organizer_client_public
#  security_group_repository_organizer_server_private = module.network.security_group_repository_organizer_server_private
  subnet_repository_organizer_client_public          = module.network.subnet_repository_organizer_client_public
#  subnet_repository_organizer_server_private         = module.network.subnet_repository_organizer_server_private
}

module "ecr" {
  source   = "./modules/ecr"
  kms_key  = module.kms.key_ecr
  app_name = var.app_name
}

module "cloudwatch" {
  source   = "./modules/cloudwatch"
  app_name = var.app_name
  ecr_repository = module.ecr.repository_repository_organizer_client
  codepipeline = module.codepipeline.aws_codepipeline
  iam_role = module.iam.cloudwatchevent_iam_role
}

module "codebuild" {
  source             = "./modules/codebuild"
  app_name           = var.app_name
  codebuild_iam_role = module.iam.codebuild_iam_role
}

module "codepipeline" {
  app_name               = var.app_name
  source                 = "./modules/codepipeline"
  codepipeline_iam_role  = module.iam.codepipeline_iam_role
  codepipeline_s3_bucket = module.s3.codepipeline_bucket
  kms_key                = module.kms.key_codepipeline
  ecr_repository         = module.ecr.repository_repository_organizer_client
  aws_codebuild_project  = module.codebuild.aws_codebuild_project
  aws_ecs_cluster        = module.ecs.aws_ecs_cluster
  aws_ecs_service        = module.ecs.aws_ecs_service_client
}

