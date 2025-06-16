resource "aws_secretsmanager_secret" "better_auth" {
  name = "knvl/betterauth-secret"
}

data "aws_db_instance" "knvl" {
  db_instance_identifier = var.rds_db_id
}
