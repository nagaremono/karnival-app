resource "random_id" "knvl_server_tg" {
  byte_length = 4
}

resource "random_id" "knvl_web_tg" {
  byte_length = 4
}

resource "random_id" "knvl_lb_sg" {
  byte_length = 4
}

data "aws_acm_certificate" "knvl" {
  domain = "karnival.gredip.com"
}

module "alb" {
  source  = "terraform-aws-modules/alb/aws"
  version = "9.16.0"

  name               = "knvl-alb"
  load_balancer_type = "application"

  create = true

  vpc_id          = var.vpc_id
  subnets         = var.public_subnet_ids
  ip_address_type = "ipv4"

  enable_deletion_protection = false

  security_group_name = "knvl-lb-sg-${random_id.knvl_lb_sg.hex}"
  security_group_ingress_rules = {
    all_http = {
      from_port   = 80
      to_port     = 80
      ip_protocol = "tcp"
      description = "HTTP web traffic"
      cidr_ipv4   = "0.0.0.0/0"
    }
    all_https = {
      from_port   = 443
      to_port     = 443
      ip_protocol = "tcp"
      description = "HTTPS web traffic"
      cidr_ipv4   = "0.0.0.0/0"
    }
  }
  security_group_egress_rules = {
    all = {
      ip_protocol = "-1"
      cidr_ipv4   = "10.0.0.0/16"
    }
  }

  listeners = {
    ex-http-https-redirect = {
      port     = 80
      protocol = "HTTP"
      redirect = {
        port        = "443"
        protocol    = "HTTPS"
        status_code = "HTTP_301"
      }
    }
    ex-https = {
      port            = 443
      protocol        = "HTTPS"
      certificate_arn = data.aws_acm_certificate.knvl.arn

      forward = {
        target_group_key = "ecs_knvl_web"
      }

      rules = {
        route_to_server = {
          actions = [
            {
              type             = "forward"
              target_group_key = "ecs_knvl_server"
            }
          ]

          conditions = [{
            path_pattern = {
              values = ["/api/*", "/graphql"]
            }
          }]
        }
      }
    }
  }

  target_groups = {
    ecs_knvl_server = {
      name                              = "knvl-server-tg-${random_id.knvl_server_tg.hex}"
      vpc_id                            = var.vpc_id
      protocol                          = "HTTP"
      port                              = 8080
      target_type                       = "ip"
      deregistration_delay              = 30
      load_balancing_cross_zone_enabled = true

      health_check = {
        enabled             = true
        healthy_threshold   = 3
        interval            = 60
        matcher             = "200"
        path                = "/health"
        protocol            = "HTTP"
        timeout             = 5
        unhealthy_threshold = 3
      }

      create_attachment = false
    }

    ecs_knvl_web = {
      name                              = "knvl-web-tg-${random_id.knvl_web_tg.hex}"
      vpc_id                            = var.vpc_id
      protocol                          = "HTTP"
      port                              = 8080
      target_type                       = "ip"
      deregistration_delay              = 30
      load_balancing_cross_zone_enabled = true

      health_check = {
        enabled             = true
        healthy_threshold   = 3
        interval            = 60
        matcher             = "200"
        path                = "/health"
        protocol            = "HTTP"
        timeout             = 5
        unhealthy_threshold = 3
      }

      create_attachment = false
    }
  }
}
