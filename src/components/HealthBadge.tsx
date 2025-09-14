'use client';

import { useState, useEffect } from 'react';

interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  responseTime?: number;
  commit?: string;
  lastChecked?: string;
}

export default function HealthBadge() {
  const [health, setHealth] = useState<HealthStatus>({ status: 'ok' });
  const [isLoading, setIsLoading] = useState(true);

  const checkHealth = async () => {
    try {
      const startTime = Date.now();
      const response = await fetch('/api/health', {
        method: 'GET',
        cache: 'no-cache'
      });
      
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        const data = await response.json();
        setHealth({
          status: data.status === 'ok' ? 'ok' : 'degraded',
          responseTime,
          commit: data.commit,
          lastChecked: new Date().toLocaleTimeString()
        });
      } else {
        setHealth({
          status: 'degraded',
          responseTime,
          lastChecked: new Date().toLocaleTimeString()
        });
      }
    } catch (error) {
      setHealth({
        status: 'error',
        lastChecked: new Date().toLocaleTimeString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial check
    checkHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (health.status) {
      case 'ok': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = () => {
    if (isLoading) return '⏳';
    switch (health.status) {
      case 'ok': return '✅';
      case 'degraded': return '⚠️';
      case 'error': return '❌';
      default: return '❓';
    }
  };

  const getStatusText = () => {
    if (isLoading) return 'Checking...';
    switch (health.status) {
      case 'ok': return 'All Systems Operational';
      case 'degraded': return 'Some Issues Detected';
      case 'error': return 'Service Unavailable';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="group relative">
      <button
        onClick={checkHealth}
        className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all hover:bg-white/10 ${getStatusColor()}`}
        title="Click to refresh status"
      >
        <span className="animate-pulse-slow">{getStatusIcon()}</span>
        <span className="hidden sm:inline">{getStatusText()}</span>
        <span className="sm:hidden">Status</span>
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        <div className="space-y-1">
          <div>Status: {health.status}</div>
          {health.responseTime && (
            <div>Response: {health.responseTime}ms</div>
          )}
          {health.commit && (
            <div>Build: {health.commit}</div>
          )}
          {health.lastChecked && (
            <div>Last checked: {health.lastChecked}</div>
          )}
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black/90"></div>
      </div>
    </div>
  );
}
