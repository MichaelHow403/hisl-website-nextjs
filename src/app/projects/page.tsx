'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getImageSrc } from '@/lib/imagery';

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
        return 'text-green-400 bg-green-900/20 border-green-500/30';
      case 'Development':
      case 'Beta':
        return 'text-blue-400 bg-blue-900/20 border-blue-500/30';
      case 'Testing':
        return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
      case 'Planning':
        return 'text-orange-400 bg-orange-900/20 border-orange-500/30';
      case 'Research':
        return 'text-purple-400 bg-purple-900/20 border-purple-500/30';
      default:
        return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return 'bg-green-500';
    if (progress >= 70) return 'bg-blue-500';
    if (progress >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div>
                <h1 className="text-xl font-bold text-white">PROJECTS PORTFOLIO</h1>
                <p className="text-xs text-gray-400">Strategic Development Initiatives</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">HOME</Link>
              <span className="text-blue-400 font-medium">PROJECTS</span>
              <Link href="/knowledge" className="text-gray-400 hover:text-white transition-colors">KNOWLEDGE</Link>
              <Link href="/strategy-live" className="text-gray-400 hover:text-white transition-colors">STRATEGY</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-900/20 border border-blue-500/30 rounded-lg px-4 py-2 mb-6">
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 font-bold text-lg">ACTIVE PORTFOLIO</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Project Matrix
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Comprehensive overview of HISL&apos;s strategic development initiatives and their current status
            </p>
          </motion.div>

          {/* Project Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.name}
                variants={itemVariants}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:border-blue-500/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-full border-2 border-gray-600/30 overflow-hidden bg-gray-700/20 flex items-center justify-center">
                    {getImageSrc(project.category as 'ravens' | 'earth' | 'general', project.image, 1200) ? (
                      <Image
                        src={getImageSrc(project.category as 'ravens' | 'earth' | 'general', project.image, 1200) || ''}
                        alt={project.name}
                        width={48}
                        height={48}
                        className="object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-2xl text-blue-400">⚙️</div>
                    )}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(project.status)}`}>
                    {project.status.toUpperCase()}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-3">{project.name}</h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{project.description}</p>
                
                <div className="text-xs text-gray-400 mb-4 font-mono">{project.type}</div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>PROGRESS</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700/30 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProgressColor(project.progress)} transition-all duration-500`}
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
                  <div className="w-2 h-2 bg-gray-400/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400/30 rounded-full"></div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 grid md:grid-cols-4 gap-6"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">9</div>
              <div className="text-gray-300 text-sm">ACTIVE PROJECTS</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">67%</div>
              <div className="text-gray-300 text-sm">AVERAGE PROGRESS</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">4</div>
              <div className="text-gray-300 text-sm">LIVE SYSTEMS</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">100%</div>
              <div className="text-gray-300 text-sm">SOVEREIGNTY</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-gray-700/30 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">ALL SYSTEMS OPERATIONAL</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 HISL - PROJECT MATRIX - STRATEGIC DEVELOPMENT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
