/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      message: 'AWS CI/CD Pipeline API',
      version: '1.0.0',
      framework: 'NestJS',
      endpoints: [
        'GET /api/v1 - API information',
        'GET /api/v1/health - Health check',
        'GET /api/v1/stats - API statistics',
        'GET /api/v1/features - Application features',
        'GET /health - Simple health check'
      ],
      documentation: '/api/docs'
    };
  }
}