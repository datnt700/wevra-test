output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "alb_dns_name" {
  description = "Application Load Balancer DNS name"
  value       = aws_lb.main.dns_name
}

output "alb_zone_id" {
  description = "Application Load Balancer zone ID"
  value       = aws_lb.main.zone_id
}

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = aws_db_instance.postgres.endpoint
}

output "rds_database_name" {
  description = "RDS database name"
  value       = aws_db_instance.postgres.db_name
}

output "ecr_backoffice_repository_url" {
  description = "ECR repository URL for backoffice"
  value       = aws_ecr_repository.backoffice.repository_url
}

output "ecr_frontoffice_repository_url" {
  description = "ECR repository URL for frontoffice"
  value       = aws_ecr_repository.frontoffice.repository_url
}

output "ecs_cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "backoffice_url" {
  description = "Backoffice URL"
  value       = "https://${var.backoffice_subdomain}.${var.domain_name}"
}

output "frontoffice_url" {
  description = "Frontoffice URL"
  value       = "https://${var.frontoffice_subdomain}.${var.domain_name}"
}

output "cloudwatch_log_group_backoffice" {
  description = "CloudWatch log group for backoffice"
  value       = aws_cloudwatch_log_group.backoffice.name
}

output "cloudwatch_log_group_frontoffice" {
  description = "CloudWatch log group for frontoffice"
  value       = aws_cloudwatch_log_group.frontoffice.name
}
