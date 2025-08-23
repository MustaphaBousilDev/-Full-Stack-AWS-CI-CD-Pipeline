# -Full-Stack-AWS-CI-CD-Pipeline
A production-ready React + Node.js application showcasing enterprise-grade DevOps practices with AWS services, featuring automated CI/CD pipeline, blue-green deployment, and comprehensive monitoring.

🎯 Project Overview
This project demonstrates a complete DevOps implementation using modern AWS services to deploy a full-stack application with industry best practices including:

Automated CI/CD Pipeline with AWS CodePipeline
Blue-Green Deployment strategy
Containerized Architecture using Docker and ECS
Infrastructure as Code with CloudFormation/CDK
Comprehensive Monitoring and logging
Security Best Practices implementation

🏗️ Architecture
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │   Node.js API    │    │   AWS Services  │
│   (Frontend)    │────│   (Backend)      │────│   (Cloud Infra) │
│   Port: 3000    │    │   Port: 8000     │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘

🛠️ Tech Stack
Frontend

React 18+ with TypeScript
Tailwind CSS for styling
Axios for API calls

Backend

Node.js with Express
TypeScript
RESTful API design
Health check endpoints

DevOps & Infrastructure

AWS CodePipeline - CI/CD orchestration
AWS CodeBuild - Build automation
AWS CodeDeploy - Blue-green deployment
Amazon ECR - Container registry
Amazon ECS - Container orchestration
Application Load Balancer - Traffic routing
AWS CloudFormation - Infrastructure as Code
Amazon CloudWatch - Monitoring & logging
AWS IAM - Security & permissions

🚀 Features
Application Features

 Modern React SPA with responsive design
 RESTful Node.js API
 Health check endpoints
 Error handling and logging
 Environment-based configuration

 DevOps Features

 Automated CI/CD pipeline
 Docker containerization
 Blue-green deployment strategy
 Infrastructure as Code
 Automated testing integration
 Security scanning
 Performance monitoring
 Centralized logging
 Auto-scaling capabilities
 SSL/TLS termination

 📁 Project Structure
fullstack-aws-cicd-pipeline/
├── frontend/                 # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend/                  # Node.js API
│   ├── src/
│   ├── package.json
│   └── Dockerfile
├── infrastructure/           # AWS CloudFormation templates
│   ├── vpc.yaml
│   ├── ecs-cluster.yaml
│   ├── pipeline.yaml
│   └── monitoring.yaml
├── scripts/                  # Deployment scripts
│   ├── build.sh
│   └── deploy.sh
├── .github/
│   └── workflows/
│       └── aws-deploy.yml
├── buildspec.yml            # CodeBuild configuration
├── docker-compose.yml       # Local development
└── README.md



🔄 CI/CD Pipeline Flow
mermaidgraph LR
    A[Git Push] --> B[CodePipeline Trigger]
    B --> C[CodeBuild - Test & Build]
    C --> D[ECR - Push Images]
    D --> E[CodeDeploy - Blue-Green]
    E --> F[Health Check]
    F --> G[Traffic Switch]
    G --> H[Monitoring]
Pipeline Stages:

Source - GitHub webhook trigger
Build - CodeBuild runs tests, builds Docker images
Deploy - Blue-green deployment to ECS
Monitor - CloudWatch metrics and alarms

🛡️ Security Implementation

IAM Roles with least privilege principle
Secrets Manager for sensitive data
VPC with private subnets
Security Groups with restricted access
SSL/TLS encryption in transit
Container scanning with ECR
AWS Config for compliance monitoring

📊 Monitoring & Observability

CloudWatch Dashboards for metrics visualization
Application metrics (response time, error rate)
Infrastructure metrics (CPU, memory, network)
Custom alarms for automated alerting
Centralized logging with CloudWatch Logs
Distributed tracing with X-Ray

🚀 Quick Start
Prerequisites

AWS CLI configured
Docker installed
Node.js 18+ and npm
Git

Local Development
bash# Clone the repository
git clone https://github.com/yourusername/fullstack-aws-cicd-pipeline.git
cd fullstack-aws-cicd-pipeline

# Start with Docker Compose
docker-compose up -d

# Or run separately
cd backend && npm install && npm run dev
cd frontend && npm install && npm start
AWS Deployment
bash# Deploy infrastructure
aws cloudformation deploy --template-file infrastructure/main.yaml --stack-name cicd-pipeline

# Setup CodePipeline (one-time)
aws codepipeline create-pipeline --cli-input-json file://infrastructure/pipeline.json
🌐 Live Demo

Frontend: https://your-app.cloudfront.net
API: https://api.your-app.com/health
Monitoring: CloudWatch Dashboard

📈 Performance Metrics

Build Time: ~3-5 minutes
Deployment Time: ~2-3 minutes (blue-green)
Zero Downtime: ✅ Achieved with blue-green strategy
Auto Scaling: Configured for 2-10 tasks
Health Check: 30-second intervals

🔧 Configuration
Environment Variables
bash# Backend
NODE_ENV=production
PORT=8000
API_VERSION=v1

# Frontend
REACT_APP_API_URL=https://api.your-app.com
REACT_APP_ENV=production
AWS Parameters

VPC CIDR: 10.0.0.0/16
ECS Cluster: cicd-pipeline-cluster
Load Balancer: cicd-pipeline-alb

🧪 Testing Strategy

Unit Tests: Jest for both frontend and backend
Integration Tests: API endpoint testing
E2E Tests: Cypress for frontend flows
Security Tests: Container vulnerability scanning
Performance Tests: Load testing with CodeBuild

📚 Learning Resources

AWS DevOps Best Practices
Blue-Green Deployment Guide
ECS Best Practices

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit changes (git commit -m 'Add amazing feature')
Push to branch (git push origin feature/amazing-feature)
Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author
Your Name

LinkedIn: https://www.linkedin.com/in/mustapha-bousil/
Portfolio: https://www.mustaphabousildev.me/
Email: bousilmustapha@gmail.com

⭐ Star this repository if it helped you learn AWS DevOps!
🏷️ Tags
aws devops cicd react nodejs docker ecs codepipeline blue-green-deployment cloudformation terraform monitoring portfolio



### Cloud Formation Command (Delete , Add, Update , Force delete)
🚀 AWS CloudFormation Deploy & Delete Commands

First Time Deployment (Create Stack):
-------------
CMD: aws cloudformation create-stack --stack-name aws-cicd-vpc --template-body file://cloudformation/01-vpc.yaml
-------------
Update Existing Stack:
-------------
aws cloudformation update-stack --stack-name aws-cicd-vpc --template-body file://cloudformation/01-vpc.yaml
-------------
Deploy with Custom Parameters:
-------------
aws cloudformation create-stack --stack-name aws-cicd-vpc --template-body file://cloudformation/01-vpc.yaml --parameters ParameterKey=ProjectName,ParameterValue=my-project ParameterKey=VpcCidr,ParameterValue=172.16.0.0/16
-------------
🗑️ Delete Commands
Delete Stack (Destroys ALL Resources):
-------------
aws cloudformation delete-stack --stack-name aws-cicd-vpc
-------------
Force Delete (If Stack is Stuck):
-------------
aws cloudformation delete-stack --stack-name aws-cicd-vpc --retain-resources
-------------
📊 Monitoring Commands
-------------
---> Check Stack Status:
aws cloudformation describe-stacks --stack-name aws-cicd-vpc
---> Watch Stack Events (Real-time):
aws cloudformation describe-stack-events --stack-name aws-cicd-vpc
---> List All Your Stacks:
aws cloudformation list-stacks
---> Get Stack Outputs:
aws cloudformation describe-stacks --stack-name aws-cicd-vpc --query 'Stacks[0].Outputs'
🔍 Validation Commands
-----------------------
----> Validate Template Before Deploy:
aws cloudformation validate-template --template-body file://cloudformation/01-vpc.yaml
----> Estimate Costs:
aws cloudformation estimate-template-cost --template-body file://cloudformation/01-vpc.yaml


 

