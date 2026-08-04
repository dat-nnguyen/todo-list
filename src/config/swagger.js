// src/config/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Todo List API',
      version: '1.0.0',
      description: 'RESTful Todo List API built with Node.js, Express, PostgreSQL, and Prisma.',
      contact: {
        name: 'Backend Developer',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token in the format: Bearer <token>',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'f3a2b1c4-8d9e-4a1b-2c3d-4e5f6a7b8c9d' },
            email: { type: 'string', example: 'user@example.com' },
            name: { type: 'string', example: 'Dat Nguyen' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Todo: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'c1b2a3d4-5e6f-7a8b-9c0d-1e2f3a4b5c6d' },
            title: { type: 'string', example: 'Master Backend Architecture' },
            description: { type: 'string', example: 'Build clean REST APIs with Express and Prisma' },
            isCompleted: { type: 'boolean', example: false },
            userId: { type: 'string', example: 'f3a2b1c4-8d9e-4a1b-2c3d-4e5f6a7b8c9d' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Invalid token or missing payload' },
          },
        },
      },
    },
  },
  // Look for annotations in route files
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;