"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageSrc } from "@/lib/imagery";

export default function StrategyLive() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const liveFeeds = [
    {
      title: "GLOBAL THREAT ASSESSMENT",
      status: "Active",
      priority: "High",
      lastUpdate: "12 seconds ago",
      data: "Monitoring 47 global construction projects for anomalies",
      trend: "up",
      value: "94.7%",
      icon: "🛡️"
    },
    {
      title: "AI AGENT COORDINATION",
      status: "Optimal",
      priority: "Normal",
      lastUpdate: "3 seconds ago",
      data: "6 agents operational, 2 on standby, 1 in maintenance",
      trend: "stable",
      value: "100%",
      icon: "🧠"
    },
    {
      title: "CONSTRUCTION ANALYTICS",
      status: "Processing",
      priority: "Medium",
      lastUpdate: "8 seconds ago",
      data: "Real-time analysis of 23 active construction sites",
      trend: "up",
      value: "87.2%",
      icon: "🏗️"
    },
    {
      title: "COMPLIANCE MONITORING",
      status: "Green",
      priority: "Normal",
      lastUpdate: "1 minute ago",
      data: "All systems compliant with EU AI Act and GDPR",
      trend: "stable",
      value: "100%",
      icon: "📋"
    },
    {
      title: "DATA SOVEREIGNTY",
      status: "Secured",
      priority: "Critical",
      lastUpdate: "5 seconds ago",
      data: "Zero third-party data access, full encryption active",
      trend: "stable",
      value: "100%",
      icon: "🔒"
    },
    {
      title: "QUANTUM DEFENSE GRID",
      status: "Research",
      priority: "Low",
      lastUpdate: "2 minutes ago",
      data: "Quantum-resistant protocols development at 15%",
      trend: "up",
      value: "15.3%",
      icon: "⚛️"
    }
  ];

  const strategicAlerts = [
    {
      time: "14:38:22",
      type: "INFO",
      message: "RAVEN Orchestrator completed routine diagnostics - All systems nominal",
      priority: "low"
    },
    {
      time: "14:37:45",
      type: "ALERT",
      message: "New construction project detected in Northern Ireland - Initiating monitoring protocol",
      priority: "medium"
    },
    {
      time: "14:36:12",
      type: "SECURITY",
      message: "Encryption key rotation completed successfully - Data sovereignty maintained",
      priority: "high"
    },
    {
      time: "14:35:33",
      type: "UPDATE",
      message: "IntegAI Prime processed 1,247 construction compliance checks",
      priority: "low"
    },
    {
      time: "14:34:56",
      type: "CRITICAL",
      message: "Data Sovereign lockdown protocol activated - Unauthorized access attempt blocked",
      priority: "critical"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical':
      case 'critical':
        return 'text-red-300 bg-red-900/50';
      case 'High':
      case 'high':
        return 'text-orange-300 bg-orange-900/50';
      case 'Medium':
      case 'medium':
        return 'text-yellow-300 bg-yellow-900/50';
      default:
        return 'text-green-300 bg-green-900/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Optimal':
      case 'Green':
      case 'Secured':
        return 'text-green-300';
      case 'Processing':
        return 'text-blue-300';
      case 'Research':
        return 'text-purple-300';
      default:
        return 'text-gray-300';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '→';
    }
  };

  const getAlertTypeColor = (type: string) => {
    switch (type) {
      case 'CRITICAL':
        return 'text-red-400 bg-red-900/30';
      case 'SECURITY':
        return 'text-orange-400 bg-orange-900/30';
      case 'ALERT':
        return 'text-yellow-400 bg-yellow-900/30';
      case 'UPDATE':
        return 'text-blue-400 bg-blue-900/30';
      default:
        return 'text-green-400 bg-green-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-green-500/30 bg-black/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h1 className="text-xl font-bold text-green-400">STRATEGY LIVE</h1>
                <p className="text-xs text-green-300/70">REAL-TIME OPERATIONS</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-green-300/70 hover:text-green-300">HOME</Link>
              <Link href="/projects" className="text-green-300/70 hover:text-green-300">PROJECTS</Link>
              <Link href="/knowledge" className="text-green-300/70 hover:text-green-300">KNOWLEDGE</Link>
              <span className="text-green-400 hover:text-green-300">STRATEGY LIVE</span>
            </nav>
          </div>
        </div>
      </header>

      {/* Live Status Board */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-green-900/20 border border-green-500/30 rounded-lg px-4 py-2 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-lg">LIVE FEED ACTIVE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4 tracking-wider">
              COMMAND CENTER
            </h1>
            <p className="text-xl text-green-300/80 mb-4">
              Real-Time Strategic Operations Monitor
            </p>
            <p className="text-sm text-green-300/60 font-mono">
              CURRENT TIME: {currentTime.toISOString().replace('T', ' ').substring(0, 19)} UTC
            </p>
          </div>

          {/* Live Feed Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {liveFeeds.map((feed) => (
              <div key={feed.title} className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl">{feed.icon}</div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(feed.priority)}`}>
                    {feed.priority.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-green-400 mb-2">{feed.title}</h3>
                <div className={`text-sm font-bold mb-2 ${getStatusColor(feed.status)}`}>
                  STATUS: {feed.status.toUpperCase()}
                </div>
                
                <p className="text-green-300/70 text-sm mb-3">{feed.data}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-400">{feed.value}</span>
                    <span className="text-lg">{getTrendIcon(feed.trend)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-green-300/60">
                  <span>UPDATED: {feed.lastUpdate}</span>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-300/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Intelligence Feed */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Alert Feed */}
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-6">STRATEGIC ALERTS</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {strategicAlerts.map((alert, index) => (
                  <div key={index} className="bg-black/50 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`px-2 py-1 rounded text-xs font-bold ${getAlertTypeColor(alert.type)}`}>
                        {alert.type}
                      </div>
                      <span className="text-xs text-green-300/60">{alert.time}</span>
                    </div>
                    <p className="text-green-300/80 text-sm">{alert.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Operations Map */}
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-green-400 mb-6">GLOBAL OPERATIONS</h2>
              <div className="relative h-80 bg-black/50 rounded-lg border border-green-500/20 flex items-center justify-center">
                <div className="absolute inset-4 rounded-full border-2 border-green-500/30 overflow-hidden">
                  <Image
                    src={getImageSrc('earth', 'earth_daymap', 1200) || '/images/earth_daymap.jpg'}
                    alt="Global Operations"
                    width={300}
                    height={300}
                    className="w-full h-full object-cover opacity-60 animate-spin"
                    style={{ animationDuration: '60s' }}
                  />
                </div>
                
                {/* Operation Indicators */}
                <div className="absolute top-8 left-8 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute top-12 right-12 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-16 left-16 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">47</div>
                    <div className="text-xs text-green-300/70">ACTIVE SITES</div>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-green-300/70">Active Operations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-green-300/70">Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-green-300/70">Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-green-300/70">Alerts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Critical Stats */}
          <div className="mt-12 grid md:grid-cols-4 gap-6">
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-green-300/70 text-sm">SYSTEM UPTIME</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">6/6</div>
              <div className="text-green-300/70 text-sm">AGENTS ONLINE</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">0</div>
              <div className="text-green-300/70 text-sm">CRITICAL THREATS</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">47</div>
              <div className="text-green-300/70 text-sm">MONITORED SITES</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/30 bg-black/90 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300">LIVE FEED OPERATIONAL</span>
            </div>
            <p className="text-green-300/60 text-sm font-mono">
              © 2024 HISL - STRATEGY LIVE - COMMAND CENTER ALPHA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
