data "aws_vpc" "main" {
  id = var.vpc_id
}

resource "random_id" "knvl_server_sg" {
  byte_length = 8
}

resource "random_id" "knvl_web_sg" {
  byte_length = 8
}

resource "aws_security_group" "knvl_server_sg" {
  name        = "knvl-server-sg-${random_id.knvl_server_sg.id}"
  description = "Knvl Server Security Group"
  vpc_id      = data.aws_vpc.main.id
}

resource "aws_security_group" "knvl_web_sg" {
  name        = "knvl-web-sg-${random_id.knvl_web_sg.id}"
  description = "Knvl Web Security Group"
  vpc_id      = data.aws_vpc.main.id
}

resource "aws_vpc_security_group_ingress_rule" "allow_ipv4" {
  security_group_id = aws_security_group.knvl_server_sg.id
  cidr_ipv4         = data.aws_vpc.main.cidr_block
  from_port         = 8080
  ip_protocol       = "tcp"
  to_port           = 8080
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4" {
  security_group_id = aws_security_group.knvl_server_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}

resource "aws_vpc_security_group_ingress_rule" "allow_ipv4_web" {
  security_group_id = aws_security_group.knvl_web_sg.id
  cidr_ipv4         = data.aws_vpc.main.cidr_block
  from_port         = 8080
  ip_protocol       = "tcp"
  to_port           = 8080
}

resource "aws_vpc_security_group_egress_rule" "allow_all_traffic_ipv4_web" {
  security_group_id = aws_security_group.knvl_web_sg.id
  cidr_ipv4         = "0.0.0.0/0"
  ip_protocol       = "-1"
}
