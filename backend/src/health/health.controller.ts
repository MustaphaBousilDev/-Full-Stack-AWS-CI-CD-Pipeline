/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';

@ApiTags('health')
@Controller('api/v1')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('health')
  @ApiOperation({ summary: 'Get application health status' })
  @ApiResponse({ status: 200, description: 'Health status retrieved successfully' })
  getHealth() {
    return this.healthService.getHealthStatus();
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get application statistics' })
  @ApiResponse({ status: 200, description: 'Statistics retrieved successfully' })
  getStats() {
    return this.healthService.getStats();
  }

  @Get('features')
  @ApiOperation({ summary: 'Get application features' })
  @ApiResponse({ status: 200, description: 'Features retrieved successfully' })
  getFeatures() {
    return this.healthService.getFeatures();
  }
}

@Controller()
export class SimpleHealthController {
  @Get('health')
  @ApiOperation({ summary: 'Simple health check for load balancer' })
  simpleHealth() {
    return 'OK';
  }
}