# Webhooks API

Generic webhook endpoint for receiving external events.

## Endpoint

```
POST /api/webhooks
GET /api/webhooks (information)
```

## Authentication

Webhooks use **signature-based authentication** instead of session
authentication:

- **Development**: Signature verification is optional
- **Production**: Requires `X-Webhook-Signature` header with HMAC SHA256
  signature

## Request Format

```json
{
  "event": "event.name",
  "data": {
    "key": "value"
  },
  "timestamp": "2025-11-24T12:00:00Z"
}
```

## Supported Events

- `user.created` - User account created
- `event.published` - Event published
- `group.updated` - Group updated
- `notification.send` - Send notification to user

## Example Usage

### Development (No Signature)

```bash
curl -X POST http://localhost:3000/api/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "event": "user.created",
    "data": {
      "userId": "123",
      "email": "user@example.com"
    }
  }'
```

### Production (With Signature)

```bash
# Generate signature
PAYLOAD='{"event":"user.created","data":{"userId":"123"}}'
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "your-webhook-secret" | sed 's/^.* //')

# Send request
curl -X POST https://your-domain.com/api/webhooks \
  -H "Content-Type: application/json" \
  -H "X-Webhook-Signature: $SIGNATURE" \
  -d "$PAYLOAD"
```

### PowerShell (Windows)

```powershell
$payload = '{"event":"user.created","data":{"userId":"123"}}'
$secret = "your-webhook-secret"
$hmac = New-Object System.Security.Cryptography.HMACSHA256
$hmac.Key = [Text.Encoding]::UTF8.GetBytes($secret)
$hash = $hmac.ComputeHash([Text.Encoding]::UTF8.GetBytes($payload))
$signature = [BitConverter]::ToString($hash) -replace '-','' | ForEach-Object {$_.ToLower()}

Invoke-RestMethod -Uri http://localhost:3000/api/webhooks `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{"X-Webhook-Signature"=$signature} `
  -Body $payload
```

### Node.js/TypeScript

```typescript
import crypto from 'crypto';

async function sendWebhook(event: string, data: Record<string, unknown>) {
  const payload = JSON.stringify({
    event,
    data,
    timestamp: new Date().toISOString(),
  });
  const signature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET!)
    .update(payload)
    .digest('hex');

  const response = await fetch('http://localhost:3000/api/webhooks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Signature': signature,
    },
    body: payload,
  });

  return response.json();
}

// Usage
await sendWebhook('user.created', { userId: '123', email: 'user@example.com' });
```

## Response Format

### Success

```json
{
  "success": true,
  "data": {
    "received": true,
    "event": "user.created",
    "processedAt": "2025-11-24T12:00:00Z"
  }
}
```

### Error

```json
{
  "success": false,
  "error": {
    "message": "Invalid webhook signature",
    "code": "BAD_REQUEST"
  }
}
```

## Environment Variables

Add to `.env`:

```env
# Webhook secret for signature verification (production)
WEBHOOK_SECRET=your-secure-random-secret-here
```

Generate secure secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Adding Custom Event Handlers

Edit `apps/backoffice/src/app/api/webhooks/route.ts`:

```typescript
case 'your.custom.event': {
  const { field1, field2 } = payload.data as { field1?: string; field2?: number };

  if (field1 && field2) {
    // Your custom logic here
    console.log(`Processing: ${field1}, ${field2}`);
  }
  break;
}
```

## Testing

Get webhook info:

```bash
curl http://localhost:3000/api/webhooks
```

Response includes supported events and example payload format.

## Security Best Practices

1. **Always verify signatures in production**
2. **Use HTTPS in production**
3. **Rotate webhook secrets periodically**
4. **Log webhook events for auditing**
5. **Implement rate limiting** (consider using middleware)
6. **Validate payload structure**
7. **Use idempotency keys** for critical operations

## Integration Examples

### GitHub Webhooks

```typescript
case 'github.push': {
  const { repository, commits } = payload.data;
  // Handle GitHub push event
  break;
}
```

### Stripe Webhooks

See `apps/backoffice/src/app/api/billing/webhook/route.ts` for Stripe-specific
implementation.

### Slack Webhooks

```typescript
case 'slack.message': {
  const { channel, text, user } = payload.data;
  // Handle Slack message
  break;
}
```

## Monitoring

Webhook events are logged to console. In production, consider:

- Sending failed webhooks to error tracking (Sentry, etc.)
- Storing webhook history in database
- Setting up alerts for signature failures
- Implementing webhook retry logic
