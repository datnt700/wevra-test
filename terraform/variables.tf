variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "Eventure"
}

variable "domain_name" {
  description = "Root domain name"
  type        = string
  default     = "eventure.so"
}

variable "backoffice_subdomain" {
  description = "Backoffice subdomain"
  type        = string
  default     = "admin"
}

variable "frontoffice_subdomain" {
  description = "Frontoffice subdomain"
  type        = string
  default     = "app"
}

# Database
variable "db_name" {
  description = "Database name"
  type        = string
  default     = "Eventure"
}

variable "db_username" {
  description = "Database username"
  type        = string
  default     = "eventure_admin"
}

variable "db_instance_class" {
  description = "RDS instance class"
  type        = string
  default     = "db.t4g.micro" # Free tier eligible
}

# ECS
variable "backoffice_cpu" {
  description = "CPU units for backoffice"
  type        = number
  default     = 512 # 0.5 vCPU
}

variable "backoffice_memory" {
  description = "Memory for backoffice (MB)"
  type        = number
  default     = 1024 # 1 GB
}

variable "backoffice_desired_count" {
  description = "Desired number of backoffice tasks"
  type        = number
  default     = 2
}

variable "frontoffice_cpu" {
  description = "CPU units for frontoffice"
  type        = number
  default     = 512
}

variable "frontoffice_memory" {
  description = "Memory for frontoffice (MB)"
  type        = number
  default     = 1024
}

variable "frontoffice_desired_count" {
  description = "Desired number of frontoffice tasks"
  type        = number
  default     = 2
}

# Auto-scaling
variable "min_capacity" {
  description = "Minimum number of tasks"
  type        = number
  default     = 2
}

variable "max_capacity" {
  description = "Maximum number of tasks"
  type        = number
  default     = 10
}

variable "target_cpu_utilization" {
  description = "Target CPU utilization for auto-scaling"
  type        = number
  default     = 70
}

variable "target_memory_utilization" {
  description = "Target memory utilization for auto-scaling"
  type        = number
  default     = 80
}

# Secrets (set via terraform.tfvars or environment variables)
variable "db_password" {
  description = "Database password"
  type        = string
  sensitive   = true
}

variable "nextauth_secret" {
  description = "NextAuth secret"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret"
  type        = string
  sensitive   = true
}

variable "webhook_secret" {
  description = "Webhook secret"
  type        = string
  sensitive   = true
}

variable "stripe_secret_key" {
  description = "Stripe secret key"
  type        = string
  sensitive   = true
  default     = ""
}

variable "stripe_webhook_secret" {
  description = "Stripe webhook secret"
  type        = string
  sensitive   = true
  default     = ""
}
