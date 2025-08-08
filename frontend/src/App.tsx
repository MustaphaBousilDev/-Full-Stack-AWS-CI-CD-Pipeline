import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

interface HealthStatus {
  status: string;
  timestamp: string;
  version: string;
  environment: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
  };
}

interface ApiStats {
  totalRequests: number;
  uptime: string;
  memoryUsage: string;
  environment: string;
  nodeVersion: string;
  platform: string;
}

function App() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [apiStats, setApiStats] = useState<ApiStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchHealthStatus();
    fetchApiStats();
    
    // Set up polling every 30 seconds
    const interval = setInterval(() => {
      fetchHealthStatus();
      fetchApiStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchHealthStatus = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/health`);
      setHealthStatus(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch health status - API may be down');
      console.error('Health check failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchApiStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/stats`);
      setApiStats(response.data);
    } catch (err) {
      console.error('Stats fetch failed:', err);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'healthy':
        return 'healthy';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      default:
        return 'healthy';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading application...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="header-title">
              <span className="emoji">🚀</span>
              <div>
                <h1>AWS CI/CD Pipeline Demo</h1>
                <p className="header-subtitle">
                  Full-Stack Application with Enterprise DevOps Practices
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main">
        <div className="container">
          
          {/* Error Banner */}
          {error && (
            <div className="error-banner">
              <div className="error-content">
                <span className="error-icon">⚠️</span>
                <div className="error-text">
                  <h3>Connection Error</h3>
                  <p>{error}</p>
                  <p>Make sure the backend server is running on port 8000</p>
                </div>
              </div>
            </div>
          )}

          {/* Status Cards */}
          <div className="grid grid-2">
            
            {/* Health Status Card */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon blue">
                  💗
                </div>
                <div className="card-title">
                  <h3>System Health</h3>
                  <p className="card-subtitle">Real-time health monitoring</p>
                </div>
              </div>
              
              {healthStatus ? (
                <div>
                  <div className="stat-row">
                    <span className="stat-label">Status:</span>
                    <span className={`status-badge ${getStatusColor(healthStatus.status)}`}>
                      {healthStatus.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Version:</span>
                    <span className="stat-value">{healthStatus.version}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Environment:</span>
                    <span className="stat-value" style={{textTransform: 'capitalize'}}>
                      {healthStatus.environment}
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Memory Used:</span>
                    <span className="stat-value">{healthStatus.memory.used} MB</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Last Check:</span>
                    <span className="stat-value">
                      {new Date(healthStatus.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <div style={{fontSize: '2rem', color: '#a0aec0', marginBottom: '8px'}}>📊</div>
                  <p style={{fontSize: '0.875rem', color: '#718096'}}>Health data unavailable</p>
                </div>
              )}
            </div>

            {/* API Statistics Card */}
            <div className="card">
              <div className="card-header">
                <div className="card-icon green">
                  📈
                </div>
                <div className="card-title">
                  <h3>API Statistics</h3>
                  <p className="card-subtitle">Performance metrics</p>
                </div>
              </div>
              
              {apiStats ? (
                <div>
                  <div className="stat-row">
                    <span className="stat-label">Total Requests:</span>
                    <span className="stat-value" style={{fontWeight: '600'}}>
                      {apiStats.totalRequests.toLocaleString()}
                    </span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Uptime:</span>
                    <span className="stat-value">{apiStats.uptime}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Memory Usage:</span>
                    <span className="stat-value">{apiStats.memoryUsage}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Node.js Version:</span>
                    <span className="stat-value">{apiStats.nodeVersion}</span>
                  </div>
                  <div className="stat-row">
                    <span className="stat-label">Platform:</span>
                    <span className="stat-value" style={{textTransform: 'capitalize'}}>
                      {apiStats.platform}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{textAlign: 'center', padding: '20px'}}>
                  <div style={{fontSize: '2rem', color: '#a0aec0', marginBottom: '8px'}}>📊</div>
                  <p style={{fontSize: '0.875rem', color: '#718096'}}>Statistics unavailable</p>
                </div>
              )}
            </div>
          </div>

          {/* DevOps Features Section */}
          <div className="features-section">
            <div className="card">
              <div className="features-header">
                <span style={{fontSize: '1.5rem'}}>🛠️</span>
                <div className="features-title">
                  <h3>DevOps Features Implemented</h3>
                  <p className="card-subtitle">Enterprise-grade deployment pipeline</p>
                </div>
              </div>
              
              <div className="grid grid-3">
                {[
                  { 
                    name: 'CI/CD Pipeline', 
                    description: 'AWS CodePipeline', 
                    status: 'Active', 
                    icon: '🔄' 
                  },
                  { 
                    name: 'Blue-Green Deployment', 
                    description: 'Zero downtime', 
                    status: 'Active', 
                    icon: '🔵' 
                  },
                  { 
                    name: 'Container Orchestration', 
                    description: 'Amazon ECS', 
                    status: 'Active', 
                    icon: '🐳' 
                  },
                  { 
                    name: 'Load Balancing', 
                    description: 'Application Load Balancer', 
                    status: 'Active', 
                    icon: '⚖️' 
                  },
                  { 
                    name: 'Auto Scaling', 
                    description: 'Dynamic scaling', 
                    status: 'Active', 
                    icon: '📈' 
                  },
                  { 
                    name: 'Monitoring & Logging', 
                    description: 'CloudWatch', 
                    status: 'Active', 
                    icon: '📊' 
                  },
                ].map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <div className="feature-name">{feature.name}</div>
                      <div className="feature-description">{feature.description}</div>
                      <div className="feature-status">{feature.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p className="footer-text">
              Built with React + Vite, Node.js, TypeScript, and AWS Services
            </p>
            <a 
              href="https://github.com/yourusername/fullstack-aws-cicd-pipeline" 
              className="footer-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>🔗</span>
              View on GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App