"use client";
import Image from "next/image";
import Link from "next/link";
import { getImageSrc } from "@/lib/imagery";

export default function Projects() {
  const projects = [
    {
      name: "RAVEN ORCHESTRATOR",
      status: "Active",
      progress: 85,
      description: "Master AI coordination system managing autonomous agent fleets",
      image: "raven_huginn",
      category: "ravens",
      type: "Core Infrastructure"
    },
    {
      name: "BUILDTRACE ANALYTICS",
      status: "Development",
      progress: 67,
      description: "Real-time construction monitoring and predictive analysis",
      image: "ai_construction_bridge",
      category: "general",
      type: "Analytics Platform"
    },
    {
      name: "COMPLIANCE CORE",
      status: "Active",
      progress: 92,
      description: "Automated regulatory compliance and reporting system",
      image: "feather",
      category: "general",
      type: "Compliance Engine"
    },
    {
      name: "DATA SOVEREIGN",
      status: "Testing",
      progress: 78,
      description: "Privacy-preserving data management and encryption",
      image: "ai_dna",
      category: "general",
      type: "Security Framework"
    },
    {
      name: "MUNINN INTELLIGENCE",
      status: "Beta",
      progress: 54,
      description: "Advanced pattern recognition and threat detection",
      image: "raven_muninn",
      category: "ravens",
      type: "Intelligence System"
    },
    {
      name: "GLOBAL MESH NETWORK",
      status: "Planning",
      progress: 23,
      description: "Distributed AI processing across sovereign nodes",
      image: "earth_daymap",
      category: "earth",
      type: "Network Infrastructure"
    },
    {
      name: "QUANTUM DEFENSE GRID",
      status: "Research",
      progress: 15,
      description: "Next-generation quantum-resistant security protocols",
      image: "reach_for_the_stars",
      category: "general",
      type: "Quantum Security"
    },
    {
      name: "BIOMETRIC AUTHENTICATION",
      status: "Active",
      progress: 96,
      description: "Multi-factor biometric identity verification system",
      image: "ai_dna2",
      category: "general",
      type: "Authentication"
    },
    {
      name: "INTEGAI PRIME",
      status: "Live",
      progress: 100,
      description: "Primary AI orchestration and decision-making engine",
      image: "michael_howard",
      category: "general",
      type: "AI Engine"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Live':
        return 'text-green-300 bg-green-900/50';
      case 'Development':
      case 'Beta':
        return 'text-blue-300 bg-blue-900/50';
      case 'Testing':
        return 'text-yellow-300 bg-yellow-900/50';
      case 'Planning':
        return 'text-orange-300 bg-orange-900/50';
      case 'Research':
        return 'text-purple-300 bg-purple-900/50';
      default:
        return 'text-gray-300 bg-gray-900/50';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
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
                <h1 className="text-xl font-bold text-green-400">PROJECTS HUB</h1>
                <p className="text-xs text-green-300/70">MISSION CONTROL</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-green-300/70 hover:text-green-300">HOME</Link>
              <span className="text-green-400 hover:text-green-300">PROJECTS</span>
              <Link href="/knowledge" className="text-green-300/70 hover:text-green-300">KNOWLEDGE</Link>
              <Link href="/strategy-live" className="text-green-300/70 hover:text-green-300">STRATEGY LIVE</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-900/20 border border-green-500/30 rounded-lg px-4 py-2 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-lg">PROJECTS ONLINE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4 tracking-wider">
              PROJECT MATRIX
            </h1>
            <p className="text-xl text-green-300/80 mb-8">
              Active Development & Deployment Status
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project.name} className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:scale-105 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-green-500/30 overflow-hidden bg-green-900/20 flex items-center justify-center">
                    {getImageSrc(project.category as 'ravens' | 'earth' | 'general', project.image, 1200) ? (
                      <Image
                        src={getImageSrc(project.category as 'ravens' | 'earth' | 'general', project.image, 1200) || ''}
                        alt={project.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-2xl text-green-400">⚙️</div>
                    )}
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-green-400 mb-2">{project.name}</h3>
                <p className="text-green-300/70 text-sm mb-3">{project.description}</p>
                
                <div className="text-xs text-green-300/60 mb-3">{project.type}</div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-green-300/70 mb-1">
                    <span>PROGRESS</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-green-900/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(project.progress)}`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status indicators */}
                <div className="flex space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    project.status === 'Active' || project.status === 'Live' ? 'bg-green-400 animate-pulse' : 
                    project.status === 'Development' || project.status === 'Beta' || project.status === 'Testing' ? 'bg-blue-400' :
                    'bg-orange-400'
                  }`}></div>
                  <div className="w-2 h-2 bg-green-300/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-300/30 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Stats */}
          <div className="mt-20 grid md:grid-cols-4 gap-6">
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">9</div>
              <div className="text-green-300/70 text-sm">ACTIVE PROJECTS</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">67%</div>
              <div className="text-green-300/70 text-sm">AVERAGE PROGRESS</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">4</div>
              <div className="text-green-300/70 text-sm">LIVE SYSTEMS</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-green-300/70 text-sm">UPTIME</div>
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
              <span className="text-green-300">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <p className="text-green-300/60 text-sm font-mono">
              © 2024 HISL - PROJECT MATRIX - MISSION CONTROL ACTIVE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
