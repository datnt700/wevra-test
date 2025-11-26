# RDS Subnet Group
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

# RDS Parameter Group
resource "aws_db_parameter_group" "postgres" {
  name   = "${var.project_name}-postgres-params"
  family = "postgres16"

  parameter {
    name  = "log_connections"
    value = "1"
  }

  parameter {
    name  = "log_disconnections"
    value = "1"
  }

  tags = {
    Name = "${var.project_name}-postgres-params"
  }
}

# RDS Instance (Shared by backoffice and frontoffice)
resource "aws_db_instance" "postgres" {
  identifier     = "${var.project_name}-postgres"
  engine         = "postgres"
  engine_version = "16.1"

  instance_class    = var.db_instance_class
  allocated_storage = 20
  storage_type      = "gp3"
  storage_encrypted = true

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  parameter_group_name   = aws_db_parameter_group.postgres.name

  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "mon:04:00-mon:05:00"

  skip_final_snapshot       = false
  final_snapshot_identifier = "${var.project_name}-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"

  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]

  # Multi-AZ for production
  multi_az = var.environment == "production" ? true : false

  # Performance Insights
  performance_insights_enabled    = true
  performance_insights_retention_period = 7

  # Auto minor version upgrade
  auto_minor_version_upgrade = true

  tags = {
    Name = "${var.project_name}-postgres"
  }
}

# Secrets Manager for DB password
resource "aws_secretsmanager_secret" "db_password" {
  name        = "${var.project_name}/${var.environment}/database/password"
  description = "RDS PostgreSQL password"

  tags = {
    Name = "${var.project_name}-db-password"
  }
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = var.db_password
}
