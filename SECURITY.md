# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Currently supported versions:

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please
follow these steps:

### 🔒 Please DO NOT

- **Do not** open a public GitHub issue
- **Do not** discuss the vulnerability publicly
- **Do not** exploit the vulnerability

### ✅ Please DO

1. **Email us privately** at: security@tavia.io
2. **Include the following information**:
   - Type of vulnerability
   - Full paths of affected source files
   - Location of the affected source code (tag/branch/commit or direct URL)
   - Step-by-step instructions to reproduce the issue
   - Proof-of-concept or exploit code (if possible)
   - Impact of the vulnerability
   - Suggested fix (if any)

### What to Expect

1. **Acknowledgment**: We will acknowledge receipt within 48 hours
2. **Assessment**: We will assess the vulnerability within 5 business days
3. **Updates**: We will keep you informed of our progress
4. **Resolution**: We will work on a fix and release it as soon as possible
5. **Credit**: We will credit you in the security advisory (if you wish)

## Security Best Practices

### For Contributors

- Never commit sensitive data (API keys, passwords, tokens)
- Use environment variables for all secrets
- Review code for security issues before committing
- Keep dependencies up to date
- Follow OWASP security guidelines

### For Deployments

- Always use HTTPS in production
- Rotate secrets regularly
- Use strong authentication mechanisms
- Implement rate limiting on API endpoints
- Enable CSRF protection
- Sanitize all user inputs
- Use parameterized queries (Prisma handles this)

## Common Vulnerabilities

### Authentication & Authorization

- ✅ Role-based access control (CLIENT/OWNER)
- ✅ JWT tokens with expiration
- ✅ Secure session management via NextAuth
- ✅ Password hashing (if using credentials)

### Database Security

- ✅ Use Prisma ORM (prevents SQL injection)
- ✅ Validate all inputs with Zod
- ✅ Use transactions for atomic operations
- ✅ Implement row-level security

### API Security

- ✅ Rate limiting (via Vercel)
- ✅ CORS configuration
- ✅ Input validation
- ✅ Output sanitization

### Environment Variables

Never commit these to version control:

```env
DATABASE_URL
NEXTAUTH_SECRET
GOOGLE_CLIENT_SECRET
STRIPE_SECRET_KEY
RESEND_API_KEY
SUPABASE_ANON_KEY
```

## Dependency Security

We use:

- **Dependabot** for automated dependency updates
- **pnpm audit** for vulnerability scanning
- **GitHub Security Advisories** for notifications

Run security checks:

```bash
# Check for vulnerabilities
pnpm audit

# Update vulnerable dependencies
pnpm update
```

## GDPR Compliance

For EU users, we implement:

- Data export functionality
- Right to deletion
- Consent management
- Data encryption at rest and in transit

## Disclosure Policy

- We will coordinate disclosure timeline with the reporter
- We will credit the reporter in our security advisory (if desired)
- We will publish a security advisory after the fix is deployed

## Contact

For security concerns, contact: **security@tavia.io**

For general questions, use
[GitHub Discussions](https://github.com/tavia-io/tavia/discussions).

---

**Thank you for helping keep Tavia secure! 🔒**
