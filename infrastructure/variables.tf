variable "vpc_id" {
  description = "VPC ID for the stack to be provisioned in"
  type        = string
  default     = ""
}

variable "cluster_name" {
  description = "ECS Cluster name for the services to be deployed in"
  type        = string
  default     = ""
}

variable "server_image" {
  description = "Docker image URI for Knvl Server"
  type        = string
}

variable "web_image" {
  description = "Docker image URI for Knvl Web App"
  type        = string
}

# variable "private_subnet_ids" {
#   description = "Subnet Ids to deploy ECS services in"
#   type        = list(string)
# }

variable "db_secret_arn" {
  description = "Secret Manager Secret ARN for DB Password"
  type        = string
}

variable "public_subnet_ids" {
  description = "Public Subnet Ids of the VPC used"
  type        = list(string)
}

variable "rds_db_id" {
  description = "RDS DB Identifier"
  type        = string
}
