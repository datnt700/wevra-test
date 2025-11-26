# Secrets Manager for Application Secrets
resource "aws_secretsmanager_secret" "nextauth_secret" {
  name        = "${var.project_name}/${var.environment}/nextauth/secret"
  description = "NextAuth secret for session encryption"

  tags = {
    Name = "${var.project_name}-nextauth-secret"
  }
}

resource "aws_secretsmanager_secret_version" "nextauth_secret" {
  secret_id     = aws_secretsmanager_secret.nextauth_secret.id
  secret_string = var.nextauth_secret
}

resource "aws_secretsmanager_secret" "jwt_secret" {
  name        = "${var.project_name}/${var.environment}/jwt/secret"
  description = "JWT secret for mobile authentication"

  tags = {
    Name = "${var.project_name}-jwt-secret"
  }
}

resource "aws_secretsmanager_secret_version" "jwt_secret" {
  secret_id     = aws_secretsmanager_secret.jwt_secret.id
  secret_string = var.jwt_secret
}

resource "aws_secretsmanager_secret" "webhook_secret" {
  name        = "${var.project_name}/${var.environment}/webhook/secret"
  description = "Webhook signature verification secret"

  tags = {
    Name = "${var.project_name}-webhook-secret"
  }
}

resource "aws_secretsmanager_secret_version" "webhook_secret" {
  secret_id     = aws_secretsmanager_secret.webhook_secret.id
  secret_string = var.webhook_secret
}

# Stripe secrets (optional)
resource "aws_secretsmanager_secret" "stripe_secret_key" {
  count       = var.stripe_secret_key != "" ? 1 : 0
  name        = "${var.project_name}/${var.environment}/stripe/secret-key"
  description = "Stripe secret key"

  tags = {
    Name = "${var.project_name}-stripe-secret-key"
  }
}

resource "aws_secretsmanager_secret_version" "stripe_secret_key" {
  count         = var.stripe_secret_key != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.stripe_secret_key[0].id
  secret_string = var.stripe_secret_key
}

resource "aws_secretsmanager_secret" "stripe_webhook_secret" {
  count       = var.stripe_webhook_secret != "" ? 1 : 0
  name        = "${var.project_name}/${var.environment}/stripe/webhook-secret"
  description = "Stripe webhook secret"

  tags = {
    Name = "${var.project_name}-stripe-webhook-secret"
  }
}

resource "aws_secretsmanager_secret_version" "stripe_webhook_secret" {
  count         = var.stripe_webhook_secret != "" ? 1 : 0
  secret_id     = aws_secretsmanager_secret.stripe_webhook_secret[0].id
  secret_string = var.stripe_webhook_secret
}
