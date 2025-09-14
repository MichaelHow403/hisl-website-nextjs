"use client";
import { useState } from "react";
import Link from "next/link";

export default function Knowledge() {
  const [activeCategory, setActiveCategory] = useState("all");

  const knowledgeBase = [
    {
      title: "AI GOVERNANCE PROTOCOLS",
      category: "governance",
      status: "Updated",
      lastModified: "2024-09-14",
      classification: "Level 2",
      description: "Comprehensive framework for ethical AI deployment and oversight",
      tags: ["AI Ethics", "Governance", "Compliance"],
      icon: "📋"
    },
    {
      title: "CONSTRUCTION AUTOMATION STANDARDS",
      category: "construction",
      status: "Active",
      lastModified: "2024-09-12",
      classification: "Level 3",
      description: "Technical specifications for autonomous construction systems",
      tags: ["Construction", "Automation", "Standards"],
      icon: "🏗️"
    },
    {
      title: "RAVEN ORCHESTRATOR MANUAL",
      category: "technical",
      status: "Live",
      lastModified: "2024-09-10",
      classification: "Level 4",
      description: "Complete operational guide for RAVEN AI coordination system",
      tags: ["RAVEN", "AI", "Operations"],
      icon: "🔧"
    },
    {
      title: "DATA SOVEREIGNTY FRAMEWORK",
      category: "security",
      status: "Critical",
      lastModified: "2024-09-14",
      classification: "Level 5",
      description: "Privacy-preserving data management and regulatory compliance",
      tags: ["Privacy", "GDPR", "Data Protection"],
      icon: "🔒"
    },
    {
      title: "THREAT DETECTION ALGORITHMS",
      category: "security",
      status: "Classified",
      lastModified: "2024-09-08",
      classification: "Level 5",
      description: "Advanced pattern recognition for security threat analysis",
      tags: ["Security", "AI", "Threat Detection"],
      icon: "🛡️"
    },
    {
      title: "INTEGAI FLEET COORDINATION",
      category: "technical",
      status: "Active",
      lastModified: "2024-09-11",
      classification: "Level 3",
      description: "Multi-agent system coordination and communication protocols",
      tags: ["IntegAI", "Multi-Agent", "Coordination"],
      icon: "🧠"
    },
    {
      title: "QUANTUM ENCRYPTION RESEARCH",
      category: "research",
      status: "Development",
      lastModified: "2024-09-05",
      classification: "Level 4",
      description: "Next-generation quantum-resistant cryptographic methods",
      tags: ["Quantum", "Encryption", "Research"],
      icon: "⚛️"
    },
    {
      title: "COMPLIANCE AUTOMATION ENGINE",
      category: "governance",
      status: "Live",
      lastModified: "2024-09-13",
      classification: "Level 3",
      description: "Automated regulatory compliance monitoring and reporting",
      tags: ["Compliance", "Automation", "Regulatory"],
      icon: "📊"
    }
  ];

  const categories = [
    { id: "all", label: "ALL SYSTEMS", count: knowledgeBase.length },
    { id: "governance", label: "GOVERNANCE", count: knowledgeBase.filter(item => item.category === "governance").length },
    { id: "technical", label: "TECHNICAL", count: knowledgeBase.filter(item => item.category === "technical").length },
    { id: "security", label: "SECURITY", count: knowledgeBase.filter(item => item.category === "security").length },
    { id: "construction", label: "CONSTRUCTION", count: knowledgeBase.filter(item => item.category === "construction").length },
    { id: "research", label: "RESEARCH", count: knowledgeBase.filter(item => item.category === "research").length }
  ];

  const filteredKnowledge = activeCategory === "all" 
    ? knowledgeBase 
    : knowledgeBase.filter(item => item.category === activeCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live':
      case 'Active':
        return 'text-green-300 bg-green-900/50';
      case 'Updated':
        return 'text-blue-300 bg-blue-900/50';
      case 'Development':
        return 'text-yellow-300 bg-yellow-900/50';
      case 'Critical':
        return 'text-red-300 bg-red-900/50';
      case 'Classified':
        return 'text-purple-300 bg-purple-900/50';
      default:
        return 'text-gray-300 bg-gray-900/50';
    }
  };

  const getClassificationColor = (level: string) => {
    const levelNum = parseInt(level.split(' ')[1]);
    if (levelNum >= 5) return 'text-red-400 border-red-500/30';
    if (levelNum >= 4) return 'text-orange-400 border-orange-500/30';
    if (levelNum >= 3) return 'text-yellow-400 border-yellow-500/30';
    return 'text-green-400 border-green-500/30';
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
                <h1 className="text-xl font-bold text-green-400">KNOWLEDGE BASE</h1>
                <p className="text-xs text-green-300/70">DATA REPOSITORY</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-green-300/70 hover:text-green-300">HOME</Link>
              <Link href="/projects" className="text-green-300/70 hover:text-green-300">PROJECTS</Link>
              <span className="text-green-400 hover:text-green-300">KNOWLEDGE</span>
              <Link href="/strategy-live" className="text-green-300/70 hover:text-green-300">STRATEGY LIVE</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-green-900/20 border border-green-500/30 rounded-lg px-4 py-2 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-lg">KNOWLEDGE ONLINE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-green-400 mb-4 tracking-wider">
              DATA VAULT
            </h1>
            <p className="text-xl text-green-300/80 mb-8">
              Classified Intelligence Repository
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 border rounded-lg font-mono text-sm transition-all ${
                  activeCategory === category.id
                    ? 'bg-green-900/30 border-green-500/50 text-green-300'
                    : 'bg-green-900/10 border-green-500/30 text-green-300/70 hover:bg-green-900/20'
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          {/* Knowledge Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredKnowledge.map((item) => (
              <div key={item.title} className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 hover:scale-105 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold text-green-400 mb-1">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${getStatusColor(item.status)}`}>
                          {item.status.toUpperCase()}
                        </div>
                        <div className={`px-2 py-1 border rounded text-xs font-bold ${getClassificationColor(item.classification)}`}>
                          {item.classification.toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-green-300/70 text-sm mb-4">{item.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-green-900/30 text-green-300/80 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-green-300/60">
                  <span>MODIFIED: {item.lastModified}</span>
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-green-300/30 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Knowledge Stats */}
          <div className="mt-20 grid md:grid-cols-5 gap-6">
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{knowledgeBase.length}</div>
              <div className="text-green-300/70 text-sm">TOTAL DOCUMENTS</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{knowledgeBase.filter(item => item.status === 'Live' || item.status === 'Active').length}</div>
              <div className="text-green-300/70 text-sm">ACTIVE PROTOCOLS</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">{knowledgeBase.filter(item => item.classification === 'Level 5').length}</div>
              <div className="text-green-300/70 text-sm">CLASSIFIED</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-green-300/70 text-sm">ACCESS CONTROL</div>
            </div>
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-green-300/70 text-sm">DATA INTEGRITY</div>
            </div>
          </div>

          {/* Search Interface */}
          <div className="mt-12 bg-green-900/10 border border-green-500/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">KNOWLEDGE QUERY</h2>
            <div className="max-w-2xl mx-auto">
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Enter search parameters..."
                  className="flex-1 p-4 bg-black border border-green-500/30 text-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono placeholder-green-500/50"
                />
                <button className="bg-green-900/30 border border-green-500/30 text-green-400 px-8 py-4 rounded-lg font-bold hover:bg-green-900/50 transition-all">
                  SEARCH
                </button>
              </div>
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
              <span className="text-green-300">KNOWLEDGE BASE SECURED</span>
            </div>
            <p className="text-green-300/60 text-sm font-mono">
              © 2024 HISL - DATA VAULT - CLASSIFICATION LEVEL OMEGA
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
