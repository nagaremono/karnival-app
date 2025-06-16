data "aws_ecs_cluster" "prk" {
  cluster_name = var.cluster_name
}

locals {
  server_container_name = "knvl-server"
  server_container_port = 8080
  web_container_name    = "knvl-web"
  web_container_port    = 8080
}

resource "aws_iam_role" "service_task_exec_role" {
  name = "KnvlECSTaskExecRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "ecs.amazonaws.com"
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_exec" {
  role       = aws_iam_role.service_task_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy" "allow_create_log_group" {
  name = "AllowCreateTaskLogGroup"
  role = aws_iam_role.service_task_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action : [
          "logs:CreateLogGroup"
        ]
        Effect : "Allow"
        Resource : ["*"]
      }
    ]
  })
}

resource "aws_iam_role_policy" "allow_read_secrets" {
  name = "AllowReadKnvlSecrets"
  role = aws_iam_role.service_task_exec_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action : [
          "secretsmanager:GetResourcePolicy",
          "secretsmanager:GetSecretValue",
          "secretsmanager:DescribeSecret",
          "secretsmanager:ListSecretVersionIds"
        ],
        Effect : "Allow"
        Resource : [
          var.db_secret_arn,
          aws_secretsmanager_secret.better_auth.arn
        ]
      }
    ]
  })

}

module "server_service" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "5.12.1"

  name = "knvl-service"

  launch_type  = "FARGATE"
  network_mode = "awsvpc"

  cpu    = 256
  memory = 2048

  // Switch when ready
  create = true

  assign_public_ip = true

  autoscaling_min_capacity = 1
  autoscaling_max_capacity = 1

  // TODO
  autoscaling_policies = {}

  cluster_arn = data.aws_ecs_cluster.prk.arn

  deployment_circuit_breaker = {
    enable   = true
    rollback = true
  }

  desired_count = 1

  family = "knvl-server"

  force_new_deployment = true

  container_definitions = {
    (local.server_container_name) = {
      name : "knvl-server",
      image : var.server_image,
      cpu    = 256
      memory = 2048
      port_mappings : [
        {
          name : "${local.server_container_name}-${local.server_container_port}-tcp",
          containerPort : local.server_container_port,
          hostPort : local.server_container_port,
          protocol : "tcp",
          appProtocol : "http"
        }
      ],
      essential : true,
      environment : [
        {
          name : "NODE_ENV",
          value : "production"
        },
        {
          name : "DB_NAME",
          value : "karnival"
        },
        {
          name : "DB_USER",
          value : "krn_sv"
        },
        {
          name : "DB_HOST",
          value : data.aws_db_instance.knvl.address,
        },
        {
          name : "PORT",
          value : "8080"
        },
        {
          name : "DB_PORT",
          value : "5432"
        },
        {
          name : "BETTER_AUTH_URL",
          value : "https://karnival.gredip.com"
        },
        {
          name : "ORIGIN",
          value : "https://karnival.gredip.com"
        },
      ],
      secrets : [
        {
          name : "DB_PASSWORD",
          valueFrom : var.db_secret_arn
        },
        {
          name : "BETTER_AUTH_SECRET",
          valueFrom : aws_secretsmanager_secret.better_auth.arn
        }
      ],
      readonly_root_filesystem : true,
      cloudwatch_log_group_retention_in_days = 7
    }

  }

  load_balancer = {
    knvl_server = {
      target_group_arn = module.alb.target_groups["ecs_knvl_server"].arn
      container_name   = local.server_container_name
      container_port   = local.server_container_port
    }
  }

  create_security_group = false
  security_group_ids = [
    aws_security_group.knvl_server_sg.id
  ]

  subnet_ids = var.public_subnet_ids

  task_exec_iam_role_name = "KnvlServerTaskExecRole"
  task_exec_secret_arns = [
    var.db_secret_arn,
    aws_secretsmanager_secret.better_auth.arn
  ]
  task_exec_iam_role_policies = {
    TaskExec = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  }
  task_exec_iam_statements = [
    {
      actions : [
        "logs:CreateLogGroup"
      ]
      resources : ["*"]
    }
  ]

  tasks_iam_role_name        = "KnvlServerTaskRole"
  tasks_iam_role_description = "ECS Task Role for Knvl Server"
  tasks_iam_role_statements = [
    {
      sid : "RDSDataServiceAccess",
      actions : [
        "dbqms:CreateFavoriteQuery",
        "dbqms:DescribeFavoriteQueries",
        "dbqms:UpdateFavoriteQuery",
        "dbqms:DeleteFavoriteQueries",
        "dbqms:GetQueryString",
        "dbqms:CreateQueryHistory",
        "dbqms:DescribeQueryHistory",
        "dbqms:UpdateQueryHistory",
        "dbqms:DeleteQueryHistory",
        "rds-data:ExecuteSql",
        "rds-data:ExecuteStatement",
        "rds-data:BatchExecuteStatement",
        "rds-data:BeginTransaction",
        "rds-data:CommitTransaction",
        "rds-data:RollbackTransaction",
        "secretsmanager:CreateSecret",
        "secretsmanager:ListSecrets",
        "secretsmanager:GetRandomPassword",
        "tag:GetResources"
      ],
      resources : [data.aws_db_instance.knvl.db_instance_arn]
    }
  ]
}

module "web_service" {
  source  = "terraform-aws-modules/ecs/aws//modules/service"
  version = "5.12.1"


  name = "knvl-web"

  launch_type  = "FARGATE"
  network_mode = "awsvpc"

  cpu    = 256
  memory = 2048

  // Switch when ready
  create = true

  assign_public_ip = true

  autoscaling_min_capacity = 1
  autoscaling_max_capacity = 1

  // TODO
  autoscaling_policies = {}

  cluster_arn = data.aws_ecs_cluster.prk.arn

  deployment_circuit_breaker = {
    enable   = true
    rollback = true
  }

  desired_count = 1

  family = "knvl-web"

  force_new_deployment = true

  container_definitions = {
    (local.web_container_name) = {
      name : "knvl-web",
      image : var.web_image,
      cpu    = 256
      memory = 2048
      port_mappings : [
        {
          name : "${local.web_container_name}-${local.web_container_port}-tcp",
          containerPort : local.web_container_port,
          hostPort : local.web_container_port,
          protocol : "tcp",
          appProtocol : "http"
        }
      ],
      essential : true,
      environment : [
        {
          name : "NODE_ENV",
          value : "production"
        },
        {
          name : "PORT",
          value : "8080"
        },
        {
          name : "NEXT_PUBLIC_GRAPHQL_API",
          value : "https://karnival.gredip.com/graphql"
        },
        {
          name : "NEXT_PUBLIC_BASE_API",
          value : "https://karnival.gredip.com"
        },
      ],
      readonly_root_filesystem : true,
      cloudwatch_log_group_retention_in_days = 7
    }
  }

  load_balancer = {
    knvl_web = {
      target_group_arn = module.alb.target_groups["ecs_knvl_web"].arn
      container_name   = local.web_container_name
      container_port   = local.web_container_port
    }
  }

  create_security_group = false
  security_group_ids = [
    aws_security_group.knvl_web_sg.id
  ]

  subnet_ids = var.public_subnet_ids

  task_exec_iam_role_name = "KnvlWebTaskExecRole"
  task_exec_iam_role_policies = {
    TaskExec = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
  }
  task_exec_iam_statements = [
    {
      actions : [
        "logs:CreateLogGroup"
      ]
      resources : ["*"]
    }
  ]

  tasks_iam_role_name        = "KnvlWebTaskRole"
  tasks_iam_role_description = "ECS Task Role for Knvl Web"
}
