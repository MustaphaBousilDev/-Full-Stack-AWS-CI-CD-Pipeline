/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  private totalRequests = 0;
  private readonly startTime = Date.now();

  constructor(private configService: ConfigService) {}

  incrementRequestCount() {
    this.totalRequests++;
  }

  getHealthStatus() {
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: this.configService.get('npm_package_version', '1.0.0'),
      environment: this.configService.get('NODE_ENV', 'development'),
      uptime: Math.floor((Date.now() - this.startTime) / 1000),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100,
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100
      },
      cpu: process.cpuUsage()
    };

    return healthStatus;
  }

  getStats() {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;
    
    const memoryUsage = process.memoryUsage();
    const memoryUsedMB = Math.round(memoryUsage.heapUsed / 1024 / 1024 * 100) / 100;

    const stats = {
      totalRequests: this.totalRequests,
      uptime: `${hours}h ${minutes}m ${seconds}s`,
      memoryUsage: `${memoryUsedMB} MB`,
      environment: this.configService.get('NODE_ENV', 'development'),
      nodeVersion: process.version,
      platform: process.platform,
      pid: process.pid
    };

    return stats;
  }

  getFeatures() {
    const features = [
      {
        name: 'CI/CD Pipeline',
        description: 'Automated build, test, and deployment pipeline using AWS CodePipeline',
        status: 'active',
        lastUpdated: new Date().toISOString()
      },
      {
        name: 'Blue-Green Deployment',
        description: 'Zero-downtime deployment strategy with AWS CodeDeploy',
        status: 'active',
        lastUpdated: new Date().toISOString()
      },
      {
        name: 'Container Orchestration',
        description: 'Docker containers managed by Amazon ECS',
        status: 'active',
        lastUpdated: new Date().toISOString()
      },
      {
        name: 'Load Balancing',
        description: 'Application Load Balancer for traffic distribution',
        status: 'active',
        lastUpdated: new Date().toISOString()
      },
      {
        name: 'Auto Scaling',
        description: 'Automatic scaling based on CPU and memory metrics',
        status: 'active',
        lastUpdated: new Date().toISOString()
      },
      {
        name: 'Monitoring',
        description: 'CloudWatch metrics, logs, and alarms',
        status: 'active',
        lastUpdated: new Date().toISOString()
      }
    ];

    return features;
  }
}