# ECS Cluster
resource "aws_ecs_cluster" "main" {
  name = "${var.project_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = {
    Name = "${var.project_name}-cluster"
  }
}

# CloudWatch Log Groups
resource "aws_cloudwatch_log_group" "backoffice" {
  name              = "/ecs/${var.project_name}/backoffice"
  retention_in_days = 7

  tags = {
    Name = "${var.project_name}-backoffice-logs"
  }
}

resource "aws_cloudwatch_log_group" "frontoffice" {
  name              = "/ecs/${var.project_name}/frontoffice"
  retention_in_days = 7

  tags = {
    Name = "${var.project_name}-frontoffice-logs"
  }
}

# IAM Role for ECS Task Execution
resource "aws_iam_role" "ecs_task_execution" {
  name = "${var.project_name}-ecs-task-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-ecs-task-execution-role"
  }
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Allow ECS to read secrets from Secrets Manager
resource "aws_iam_role_policy" "ecs_secrets" {
  name = "${var.project_name}-ecs-secrets-policy"
  role = aws_iam_role.ecs_task_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = [
          aws_secretsmanager_secret.db_password.arn,
          aws_secretsmanager_secret.nextauth_secret.arn,
          aws_secretsmanager_secret.jwt_secret.arn,
          aws_secretsmanager_secret.webhook_secret.arn
        ]
      }
    ]
  })
}

# IAM Role for ECS Tasks
resource "aws_iam_role" "ecs_task" {
  name = "${var.project_name}-ecs-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-ecs-task-role"
  }
}

# Backoffice Task Definition
resource "aws_ecs_task_definition" "backoffice" {
  family                   = "${var.project_name}-backoffice"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.backoffice_cpu
  memory                   = var.backoffice_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name  = "backoffice"
      image = "${aws_ecr_repository.backoffice.repository_url}:latest"

      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "NEXT_PUBLIC_APP_URL"
          value = "https://${var.backoffice_subdomain}.${var.domain_name}"
        },
        {
          name  = "NEXTAUTH_URL"
          value = "https://${var.backoffice_subdomain}.${var.domain_name}"
        }
      ]

      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = "${aws_secretsmanager_secret.db_password.arn}:host::"
        },
        {
          name      = "NEXTAUTH_SECRET"
          valueFrom = aws_secretsmanager_secret.nextauth_secret.arn
        },
        {
          name      = "JWT_SECRET"
          valueFrom = aws_secretsmanager_secret.jwt_secret.arn
        },
        {
          name      = "WEBHOOK_SECRET"
          valueFrom = aws_secretsmanager_secret.webhook_secret.arn
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.backoffice.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = {
    Name = "${var.project_name}-backoffice-task"
  }
}

# Frontoffice Task Definition
resource "aws_ecs_task_definition" "frontoffice" {
  family                   = "${var.project_name}-frontoffice"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.frontoffice_cpu
  memory                   = var.frontoffice_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name  = "frontoffice"
      image = "${aws_ecr_repository.frontoffice.repository_url}:latest"

      portMappings = [
        {
          containerPort = 3000
          protocol      = "tcp"
        }
      ]

      environment = [
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "NEXT_PUBLIC_APP_URL"
          value = "https://${var.frontoffice_subdomain}.${var.domain_name}"
        }
      ]

      secrets = [
        {
          name      = "DATABASE_URL"
          valueFrom = "${aws_secretsmanager_secret.db_password.arn}:host::"
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.frontoffice.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = {
    Name = "${var.project_name}-frontoffice-task"
  }
}

# ECS Services
resource "aws_ecs_service" "backoffice" {
  name            = "${var.project_name}-backoffice"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backoffice.arn
  desired_count   = var.backoffice_desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.backoffice.arn
    container_name   = "backoffice"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.https]

  tags = {
    Name = "${var.project_name}-backoffice-service"
  }
}

resource "aws_ecs_service" "frontoffice" {
  name            = "${var.project_name}-frontoffice"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontoffice.arn
  desired_count   = var.frontoffice_desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.frontoffice.arn
    container_name   = "frontoffice"
    container_port   = 3000
  }

  depends_on = [aws_lb_listener.https]

  tags = {
    Name = "${var.project_name}-frontoffice-service"
  }
}
