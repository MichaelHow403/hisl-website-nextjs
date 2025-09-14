"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImageSrc, getLQIP } from "@/lib/imagery";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/deepseek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      setResponse(data.response || "Error: " + data.error);
    } catch {
      setResponse("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const agentFleet = [
    {
      name: "RAMS-GUARD",
      status: "Active",
      description: "Risk Assessment & Mitigation System",
      icon: "🛡️",
      color: "bg-green-900/20 border-green-500/30"
    },
    {
      name: "TTOP Synth",
      status: "Active", 
      description: "Threat Detection & Analysis",
      icon: "🔍",
      color: "bg-green-900/20 border-green-500/30"
    },
    {
      name: "BuildTrace AI",
      status: "Standby",
      description: "Construction Analytics",
      icon: "🏗️",
      color: "bg-yellow-900/20 border-yellow-500/30"
    },
    {
      name: "Compliance Core",
      status: "Active",
      description: "Regulatory Oversight",
      icon: "📋",
      color: "bg-green-900/20 border-green-500/30"
    },
    {
      name: "IntegAI Prime",
      status: "Active",
      description: "Master Orchestrator",
      icon: "🧠",
      color: "bg-green-900/20 border-green-500/30"
    },
    {
      name: "Data Sovereign",
      status: "Locked",
      description: "Privacy Protection",
      icon: "🔒",
      color: "bg-red-900/20 border-red-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-green-500/30 bg-black/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div>
                <h1 className="text-xl font-bold text-green-400">HISL CONTROL</h1>
                <p className="text-xs text-green-300/70">SYSTEM ONLINE</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <span className="text-green-400 hover:text-green-300">GLOBE</span>
              <Link href="/projects" className="text-green-300/70 hover:text-green-300">PROJECTS</Link>
              <Link href="/knowledge" className="text-green-300/70 hover:text-green-300">KNOWLEDGE</Link>
              <Link href="/strategy-live" className="text-green-300/70 hover:text-green-300">STRATEGY LIVE</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* System Status */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-green-900/20 border border-green-500/30 rounded-lg px-4 py-2 mb-6">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 font-bold text-lg">SYSTEM ONLINE</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-bold text-green-400 mb-4 tracking-wider">
              HISL CONTROL
            </h1>
            <p className="text-xl text-green-300/80 mb-8">
              Sovereign AI Infrastructure for Construction
            </p>
          </div>

          {/* WHERE YOUR PROMPTS GO Section */}
          <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-green-400 mb-6 text-center">WHERE YOUR PROMPTS GO</h2>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* 3D Globe with Ravens */}
              <div className="flex justify-center">
                <div className="relative w-80 h-80">
                  {/* Main Globe */}
                  <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-green-500/30">
                    <Image
                      src={getImageSrc('earth', 'earth_daymap', 1200) || '/images/earth_daymap.jpg'}
                      alt="HISL Global Network"
                      width={320}
                      height={320}
                      className="w-full h-full object-cover rounded-full animate-spin opacity-80"
                      style={{ animationDuration: '60s' }}
                      placeholder="blur"
                      blurDataURL={getLQIP('earth', 'earth_daymap') || ''}
                    />
                  </div>
                  
                  {/* Orbital Ravens */}
                  <div className="absolute inset-0">
                    {/* Huginn */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <Image
                          src={getImageSrc('ravens', 'raven_huginn', 1200) || '/images/raven_huginn.png'}
                          alt="Huginn"
                          width={32}
                          height={32}
                          className="opacity-80"
                        />
                      </div>
                    </div>
                    
                    {/* Muninn */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <Image
                          src={getImageSrc('ravens', 'raven_muninn', 1200) || '/images/raven_muninn.png'}
                          alt="Muninn"
                          width={28}
                          height={28}
                          className="opacity-70"
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Grid overlay */}
                  <div className="absolute inset-0 rounded-full border-2 border-green-500/20" 
                       style={{ background: 'conic-gradient(from 0deg, transparent 85%, rgba(34, 197, 94, 0.1) 90%, transparent 95%)' }}>
                  </div>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium text-green-300 mb-2">
                      &gt; ENTER COMMAND:
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Initialize construction analysis protocol..."
                      className="w-full p-4 bg-black border border-green-500/30 text-green-300 rounded-lg resize-none h-32 focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono placeholder-green-500/50"
                      disabled={loading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-green-900/30 border border-green-500/30 text-green-400 p-4 rounded-lg font-bold hover:bg-green-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">PROCESSING</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </span>
                    ) : (
                      "EXECUTE COMMAND"
                    )}
                  </button>
                </form>

                {response && (
                  <div className="bg-black border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                      {response}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTEGAI AGENT FLEET Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-green-950/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-400 mb-4">INTEGAI AGENT FLEET</h2>
            <p className="text-green-300/70">Autonomous AI Systems Status</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentFleet.map((agent) => (
              <div key={agent.name} className={`${agent.color} border rounded-lg p-6 transition-all hover:scale-105`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-2xl">{agent.icon}</div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    agent.status === 'Active' ? 'bg-green-900/50 text-green-300' : 
                    agent.status === 'Standby' ? 'bg-yellow-900/50 text-yellow-300' :
                    'bg-red-900/50 text-red-300'
                  }`}>
                    {agent.status.toUpperCase()}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-green-400 mb-2">{agent.name}</h3>
                <p className="text-green-300/70 text-sm mb-4">{agent.description}</p>
                
                {/* Deploy Button */}
                <button 
                  onClick={() => alert(`${agent.name} - Coming Soon! Contact us for early access demo.`)}
                  className="w-full bg-green-900/20 hover:bg-green-900/40 border border-green-500/30 text-green-400 text-sm py-2 px-3 rounded transition-colors mb-4"
                >
                  Deploy → Coming Soon
                </button>
                
                {/* Status indicators */}
                <div className="flex space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    agent.status === 'Active' ? 'bg-green-400 animate-pulse' : 
                    agent.status === 'Standby' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                  <div className="w-2 h-2 bg-green-300/30 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-300/30 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIOS Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-400 mb-4">BIOS</h2>
            <p className="text-green-300/70">System Architects</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Michael Howard */}
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-2 border-green-500/30 mb-6 overflow-hidden bg-green-900/20">
                  {getLQIP('general', 'michael_howard') ? (
                    <Image
                      src={getLQIP('general', 'michael_howard') || '/images/michael_howard.png'}
                      alt="Michael Howard"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-green-400">👤</div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">MICHAEL HOWARD</h3>
                <p className="text-green-300/70 mb-4">Founder & Chief Architect</p>
                <p className="text-green-300/60 text-sm leading-relaxed mb-4">
                  Sovereign AI systems architect focused on human-centered artificial intelligence. 
                  Leading development of privacy-preserving AI infrastructure for enterprise deployment.
                </p>
                
                {/* Professional Links */}
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/michaelhowardconstruction" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-900/20 hover:bg-green-900/40 border border-green-500/30 text-green-400 text-xs py-2 px-4 rounded transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                  <a 
                    href="https://substack.com/@michaelhowardmciob" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-green-900/20 hover:bg-green-900/40 border border-green-500/30 text-green-400 text-xs py-2 px-4 rounded transition-colors"
                  >
                    Substack Articles
                  </a>
                </div>
              </div>
            </div>

            {/* IntegAI */}
            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-2 border-green-500/30 mb-6 overflow-hidden bg-green-900/20 flex items-center justify-center">
                  {getLQIP('logos', 'ingegai_logo') ? (
                    <Image
                      src={getLQIP('logos', 'ingegai_logo') || '/images/IngegAI Logo.png'}
                      alt="IntegAI Logo"
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-4xl text-green-400">🤖</div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">INTEGAI</h3>
                <p className="text-green-300/70 mb-4">Master AI Orchestrator</p>
                <p className="text-green-300/60 text-sm leading-relaxed">
                  Advanced AI coordination system managing autonomous agent fleets. 
                  Ensuring ethical compliance and sovereign operation across all AI subsystems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-green-500/30 bg-black/90 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div>
                  <h3 className="text-lg font-semibold text-green-400">HISL</h3>
                  <p className="text-sm text-green-300/70">CONTROL SYSTEM</p>
                </div>
              </div>
              <p className="text-green-300/60 text-sm mb-4">
                Sovereign AI Infrastructure for Construction Industry
              </p>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300">STATUS: OPERATIONAL</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-green-400 font-semibold mb-4">MODULES</h4>
              <ul className="space-y-2 text-sm text-green-300/70">
                <li><a href="/projects" className="hover:text-green-300 transition-colors">→ PROJECTS</a></li>
                <li><a href="/knowledge" className="hover:text-green-300 transition-colors">→ KNOWLEDGE</a></li>
                <li><a href="/strategy-live" className="hover:text-green-300 transition-colors">→ STRATEGY LIVE</a></li>
                <li><a href="#" className="hover:text-green-300 transition-colors">→ API ACCESS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-green-400 font-semibold mb-4">CONNECT</h4>
              <ul className="space-y-2 text-sm text-green-300/70">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/michaelhowardconstruction" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-300 transition-colors"
                  >
                    → LINKEDIN
                  </a>
                </li>
                <li>
                  <a 
                    href="https://substack.com/@michaelhowardmciob" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-green-300 transition-colors"
                  >
                    → SUBSTACK
                  </a>
                </li>
                <li><a href="/consent" className="hover:text-green-300 transition-colors">→ CONSENT MGMT</a></li>
                <li><a href="#" className="hover:text-green-300 transition-colors">→ DATA SOVEREIGN</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-500/30 mt-8 pt-8 text-center">
            <p className="text-green-300/60 text-sm font-mono">
              © 2024 HISL - HUMAN INTELLIGENCE SYSTEMS LABORATORY - ALL SYSTEMS OPERATIONAL
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
