# Tavia Terraform Infrastructure

Production-grade AWS infrastructure for Tavia platform using Terraform.

## 🏗️ Architecture

- **ECS Fargate**: Containerized Next.js apps (backoffice + frontoffice)
- **RDS PostgreSQL 16**: Shared database with Multi-AZ and encryption
- **Application Load Balancer**: HTTPS termination with SSL certificates
- **Route 53**: DNS management with automatic certificate validation
- **ECR**: Private Docker image repositories
- **Secrets Manager**: Secure credential storage
- **CloudWatch**: Logs and monitoring
- **Auto Scaling**: CPU and memory-based scaling (2-10 tasks)
- **VPC**: Private subnets for ECS/RDS, public for ALB

## 📋 Prerequisites

1. **AWS Account** with appropriate permissions
2. **Terraform** v1.0+ installed
3. **AWS CLI** configured with credentials
4. **Domain name** registered and hosted on Route 53
5. **Docker images** built and ready to push to ECR

## 🚀 Quick Start

### 1. Initialize Terraform

```bash
cd terraform

# Copy example variables
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars with your values
# Set secrets via environment variables (see below)

# Initialize Terraform
terraform init
```

### 2. Generate Secrets

```bash
# Generate secure secrets (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run this 4 times to generate:

- `DB_PASSWORD`
- `NEXTAUTH_SECRET`
- `JWT_SECRET`
- `WEBHOOK_SECRET`

### 3. Set Environment Variables

**Windows (PowerShell):**

```powershell
$env:TF_VAR_db_password="your-db-password"
$env:TF_VAR_nextauth_secret="your-nextauth-secret"
$env:TF_VAR_jwt_secret="your-jwt-secret"
$env:TF_VAR_webhook_secret="your-webhook-secret"
$env:TF_VAR_stripe_secret_key="sk_live_..."
$env:TF_VAR_stripe_webhook_secret="whsec_..."
```

**Linux/Mac:**

```bash
export TF_VAR_db_password="your-db-password"
export TF_VAR_nextauth_secret="your-nextauth-secret"
export TF_VAR_jwt_secret="your-jwt-secret"
export TF_VAR_webhook_secret="your-webhook-secret"
export TF_VAR_stripe_secret_key="sk_live_..."
export TF_VAR_stripe_webhook_secret="whsec_..."
```

### 4. Plan and Apply

```bash
# Preview changes
terraform plan

# Apply infrastructure
terraform apply

# Save outputs
terraform output > outputs.txt
```

## 📦 Building and Pushing Docker Images

### 1. Create Dockerfiles

**apps/backoffice/Dockerfile:**

```dockerfile
FROM node:18-alpine AS base
RUN npm install -g pnpm@10.19.0

FROM base AS deps
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/backoffice/package.json ./apps/backoffice/
COPY packages/*/package.json ./packages/*/
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build --filter=backoffice

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/apps/backoffice/public ./apps/backoffice/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/backoffice/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/backoffice/.next/static ./apps/backoffice/.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "apps/backoffice/server.js"]
```

**apps/frontoffice/Dockerfile:** (Similar structure)

### 2. Update next.config.ts

```typescript
const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker
  // ... rest of config
};
```

### 3. Build and Push

```bash
# Get ECR login
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Get repository URLs from Terraform
BACKOFFICE_REPO=$(terraform output -raw ecr_backoffice_repository_url)
FRONTOFFICE_REPO=$(terraform output -raw ecr_frontoffice_repository_url)

# Build from project root
cd ../..

# Backoffice
docker build -t tavia-backoffice -f apps/backoffice/Dockerfile .
docker tag tavia-backoffice:latest $BACKOFFICE_REPO:latest
docker push $BACKOFFICE_REPO:latest

# Frontoffice
docker build -t tavia-frontoffice -f apps/frontoffice/Dockerfile .
docker tag tavia-frontoffice:latest $FRONTOFFICE_REPO:latest
docker push $FRONTOFFICE_REPO:latest
```

### 4. Update ECS Services

```bash
# Force new deployment to pull latest images
aws ecs update-service --cluster tavia-cluster --service tavia-backoffice --force-new-deployment
aws ecs update-service --cluster tavia-cluster --service tavia-frontoffice --force-new-deployment
```

## 🗄️ Database Migration

```bash
# Get RDS endpoint
RDS_ENDPOINT=$(terraform output -raw rds_endpoint)
DB_NAME=$(terraform output -raw rds_database_name)

# Run migrations from local machine (requires network access)
cd ../..
DATABASE_URL="postgresql://tavia_admin:$TF_VAR_db_password@$RDS_ENDPOINT/$DB_NAME" pnpm --filter=backoffice db:migrate:deploy
```

**Or run from ECS task:**

```bash
# Execute migration in running container
aws ecs execute-command \
  --cluster tavia-cluster \
  --task <task-id> \
  --container backoffice \
  --interactive \
  --command "pnpm db:migrate:deploy"
```

## 📊 Monitoring

### CloudWatch Logs

```bash
# View backoffice logs
aws logs tail /ecs/tavia/backoffice --follow

# View frontoffice logs
aws logs tail /ecs/tavia/frontoffice --follow
```

### ECS Service Status

```bash
# Check service status
aws ecs describe-services \
  --cluster tavia-cluster \
  --services tavia-backoffice tavia-frontoffice

# Check task health
aws ecs list-tasks --cluster tavia-cluster --service-name tavia-backoffice
```

### RDS Performance

```bash
# View RDS metrics
aws cloudwatch get-metric-statistics \
  --namespace AWS/RDS \
  --metric-name CPUUtilization \
  --dimensions Name=DBInstanceIdentifier,Value=tavia-postgres \
  --start-time 2025-11-24T00:00:00Z \
  --end-time 2025-11-24T23:59:59Z \
  --period 3600 \
  --statistics Average
```

## 💰 Cost Estimation

**Monthly costs (us-east-1):**

- **ECS Fargate**: ~$60 (4 tasks x 0.5 vCPU x 1GB RAM x 730 hours)
- **RDS db.t4g.micro**: $12.50 (Single-AZ) or $25 (Multi-AZ)
- **Application Load Balancer**: $16.20
- **NAT Gateways**: $64.80 (2 x $32.40)
- **Data Transfer**: ~$10-20
- **ECR Storage**: ~$1
- **Secrets Manager**: $0.80 (4 secrets)
- **CloudWatch Logs**: ~$5

**Total: ~$170-200/month** (Single-AZ) or **~$190-220/month** (Multi-AZ)

**Cost Optimization:**

- Use Single-AZ RDS for dev/staging
- Reduce NAT Gateways to 1 (not recommended for production)
- Use Fargate Spot for non-critical workloads
- Enable CloudWatch Logs retention policies

## 🔒 Security Best Practices

1. **Secrets**: Never commit secrets to Git
2. **IAM**: Use least-privilege IAM roles
3. **VPC**: Keep ECS and RDS in private subnets
4. **SSL**: Use ACM certificates with TLS 1.3
5. **Backups**: RDS automated backups (7 days retention)
6. **Encryption**: Enable encryption at rest for RDS and EBS
7. **Security Groups**: Restrict access to necessary ports only
8. **WAF**: Consider adding AWS WAF for DDoS protection

## 🔄 CI/CD Integration

Use GitHub Actions to automate deployments:

```yaml
# .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Login to ECR
        run:
          aws ecr get-login-password | docker login --username AWS
          --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

      - name: Build and push
        run: |
          docker build -t tavia-backoffice -f apps/backoffice/Dockerfile .
          docker tag tavia-backoffice:latest <ecr-url>:latest
          docker push <ecr-url>:latest

      - name: Deploy to ECS
        run:
          aws ecs update-service --cluster tavia-cluster --service
          tavia-backoffice --force-new-deployment
```

## 🧹 Cleanup

```bash
# Destroy all resources (WARNING: This is irreversible!)
terraform destroy

# Or destroy specific resources
terraform destroy -target=aws_ecs_service.backoffice
```

## 📚 Additional Resources

- [Terraform AWS Provider Docs](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [ECS Best Practices](https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/intro.html)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
