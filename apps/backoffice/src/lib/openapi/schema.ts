/**
 * OpenAPI 3.0 Schema for Eventure Backoffice API
 * Serves both Swagger UI and Redoc
 */
export const openApiSchema = {
  openapi: '3.0.0',
  info: {
    title: 'Eventure Backoffice API',
    version: '1.0.0',
    description: `
## Eventure API Documentation

This API provides endpoints for:
- **Mobile Authentication** - Register, login, verify users
- **User Profile Management** - View and update attendee profiles
- **Analytics** - Track events and retrieve analytics data
- **Webhooks** - Receive external event notifications
- **Health Checks** - Monitor API status

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

### Base URL
- **Production**: \`https://admin.eventure.so/api\`
- **Development**: \`http://localhost:3000/api\`
    `,
    contact: {
      name: 'Eventure Support',
      email: 'support@eventure.so',
      url: 'https://eventure.so',
    },
    license: {
      name: 'Proprietary',
    },
  },
  servers: [
    {
      url: 'https://admin.eventure.so/api',
      description: 'Production server',
    },
    {
      url: 'http://localhost:3000/api',
      description: 'Development server',
    },
  ],
  tags: [
    {
      name: 'Authentication',
      description: 'Mobile user authentication endpoints',
    },
    {
      name: 'Profile',
      description: 'User profile management',
    },
    {
      name: 'Analytics',
      description: 'Event tracking and analytics',
    },
    {
      name: 'Webhooks',
      description: 'External webhook integrations',
    },
    {
      name: 'Health',
      description: 'API health and status',
    },
  ],
  paths: {
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Health check',
        description: 'Check if API is running and database is connected',
        operationId: 'getHealth',
        responses: {
          200: {
            description: 'API is healthy',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        status: { type: 'string', example: 'ok' },
                        timestamp: { type: 'string', example: '2025-11-24T12:00:00Z' },
                        database: { type: 'string', example: 'connected' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/mobile/register': {
      post: {
        tags: ['Authentication'],
        summary: 'Register new attendee',
        description: 'Create a new attendee account for mobile app',
        operationId: 'registerUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', minLength: 8, example: 'SecurePass123!' },
                  name: { type: 'string', example: 'John Doe' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          409: {
            $ref: '#/components/responses/Conflict',
          },
          500: {
            $ref: '#/components/responses/InternalError',
          },
        },
      },
    },
    '/mobile/login': {
      post: {
        tags: ['Authentication'],
        summary: 'Login attendee',
        description: 'Authenticate attendee and return JWT token',
        operationId: 'loginUser',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', format: 'email', example: 'user@example.com' },
                  password: { type: 'string', example: 'SecurePass123!' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/AuthResponse',
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
          500: {
            $ref: '#/components/responses/InternalError',
          },
        },
      },
    },
    '/mobile/verify': {
      post: {
        tags: ['Authentication'],
        summary: 'Verify JWT token',
        description: 'Validate JWT token and return user information',
        operationId: 'verifyToken',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Token is valid',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        valid: { type: 'boolean', example: true },
                        user: { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
        },
      },
      get: {
        tags: ['Authentication'],
        summary: 'Get current user',
        description: 'Get authenticated user information',
        operationId: 'getCurrentUser',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'User information retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/User' },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
        },
      },
    },
    '/mobile/profile': {
      get: {
        tags: ['Profile'],
        summary: 'Get user profile',
        description: 'Retrieve authenticated attendee profile',
        operationId: 'getProfile',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Profile retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/UserProfile' },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
        },
      },
      put: {
        tags: ['Profile'],
        summary: 'Update user profile',
        description: 'Update authenticated attendee profile information',
        operationId: 'updateProfile',
        security: [{ BearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'John Doe' },
                  email: { type: 'string', format: 'email', example: 'john@example.com' },
                  bio: { type: 'string', example: 'Passionate about community events' },
                  avatar: {
                    type: 'string',
                    format: 'uri',
                    example: 'https://example.com/avatar.jpg',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Profile updated successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: { $ref: '#/components/schemas/UserProfile' },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
        },
      },
    },
    '/analytics': {
      post: {
        tags: ['Analytics'],
        summary: 'Track event',
        description: 'Track a custom analytics event',
        operationId: 'trackEvent',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['event', 'properties'],
                properties: {
                  event: { type: 'string', example: 'page_view' },
                  properties: {
                    type: 'object',
                    additionalProperties: true,
                    example: { page: '/events', duration: 5000 },
                  },
                  userId: { type: 'string', example: 'user123' },
                  timestamp: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Event tracked successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        tracked: { type: 'boolean', example: true },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
        },
      },
      get: {
        tags: ['Analytics'],
        summary: 'Get analytics summary',
        description: 'Retrieve analytics data summary',
        operationId: 'getAnalytics',
        security: [{ BearerAuth: [] }],
        responses: {
          200: {
            description: 'Analytics retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        totalEvents: { type: 'number', example: 1523 },
                        activeUsers: { type: 'number', example: 342 },
                        pageViews: { type: 'number', example: 8456 },
                      },
                    },
                  },
                },
              },
            },
          },
          401: {
            $ref: '#/components/responses/Unauthorized',
          },
        },
      },
    },
    '/webhooks': {
      post: {
        tags: ['Webhooks'],
        summary: 'Receive webhook',
        description: 'Endpoint for external services to send webhook events',
        operationId: 'receiveWebhook',
        parameters: [
          {
            name: 'X-Webhook-Signature',
            in: 'header',
            description: 'HMAC SHA256 signature of request body',
            required: true,
            schema: { type: 'string' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['event', 'data'],
                properties: {
                  event: {
                    type: 'string',
                    enum: ['user.created', 'user.updated', 'payment.success', 'payment.failed'],
                    example: 'user.created',
                  },
                  data: {
                    type: 'object',
                    additionalProperties: true,
                    example: { userId: '123', email: 'user@example.com' },
                  },
                  timestamp: { type: 'string', format: 'date-time' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Webhook processed successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        received: { type: 'boolean', example: true },
                        event: { type: 'string', example: 'user.created' },
                      },
                    },
                  },
                },
              },
            },
          },
          400: {
            $ref: '#/components/responses/BadRequest',
          },
          401: {
            description: 'Invalid webhook signature',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Webhooks'],
        summary: 'Webhook endpoint info',
        description: 'Get webhook endpoint configuration and supported events',
        operationId: 'getWebhookInfo',
        responses: {
          200: {
            description: 'Webhook info retrieved',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        endpoint: { type: 'string', example: '/api/webhooks' },
                        supportedEvents: {
                          type: 'array',
                          items: { type: 'string' },
                          example: [
                            'user.created',
                            'user.updated',
                            'payment.success',
                            'payment.failed',
                          ],
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'JWT token obtained from /mobile/login or /mobile/register',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'cm3u4v5w6x7y8z9a0b1c2' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          name: { type: 'string', example: 'John Doe' },
          role: {
            type: 'string',
            enum: ['ADMIN', 'ORGANIZER', 'MODERATOR', 'ATTENDEE'],
            example: 'ATTENDEE',
          },
          createdAt: { type: 'string', format: 'date-time', example: '2025-11-24T12:00:00Z' },
        },
      },
      UserProfile: {
        type: 'object',
        properties: {
          id: { type: 'string', example: 'cm3u4v5w6x7y8z9a0b1c2' },
          email: { type: 'string', format: 'email', example: 'user@example.com' },
          name: { type: 'string', example: 'John Doe' },
          bio: { type: 'string', example: 'Passionate about community events', nullable: true },
          avatar: {
            type: 'string',
            format: 'uri',
            example: 'https://example.com/avatar.jpg',
            nullable: true,
          },
          role: { type: 'string', example: 'ATTENDEE' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: true },
          data: {
            type: 'object',
            properties: {
              token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
              user: { $ref: '#/components/schemas/User' },
            },
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          success: { type: 'boolean', example: false },
          error: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Error message' },
              code: { type: 'string', example: 'ERROR_CODE' },
              details: { type: 'object', additionalProperties: true },
            },
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Invalid request data',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              error: {
                message: 'Validation error',
                code: 'BAD_REQUEST',
                details: { field: 'email', message: 'Invalid email format' },
              },
            },
          },
        },
      },
      Unauthorized: {
        description: 'Authentication required or invalid credentials',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              error: {
                message: 'Invalid credentials',
                code: 'UNAUTHORIZED',
              },
            },
          },
        },
      },
      Forbidden: {
        description: 'Insufficient permissions',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              error: {
                message: 'Access denied',
                code: 'FORBIDDEN',
              },
            },
          },
        },
      },
      NotFound: {
        description: 'Resource not found',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              error: {
                message: 'Resource not found',
                code: 'NOT_FOUND',
              },
            },
          },
        },
      },
      Conflict: {
        description: 'Resource already exists',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              error: {
                message: 'Email already exists',
                code: 'CONFLICT',
              },
            },
          },
        },
      },
      InternalError: {
        description: 'Internal server error',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: {
              success: false,
              error: {
                message: 'Internal server error',
                code: 'INTERNAL_ERROR',
              },
            },
          },
        },
      },
    },
  },
} as const;
