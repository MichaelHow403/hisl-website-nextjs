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
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-amber-50 font-sans relative overflow-hidden">
      {/* Cosmic Starfield Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
        {/* Starfield effect */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, #d4af37, transparent),
                           radial-gradient(2px 2px at 40px 70px, rgba(212, 175, 55, 0.4), transparent),
                           radial-gradient(1px 1px at 90px 40px, #d4af37, transparent),
                           radial-gradient(1px 1px at 130px 80px, rgba(57, 215, 201, 0.6), transparent),
                           radial-gradient(2px 2px at 160px 30px, rgba(212, 175, 55, 0.3), transparent)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px'
        }}></div>
      </div>
      {/* Header */}
      <header className="relative border-b border-amber-400/20 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-sm shadow-amber-400/50"></div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  HISL CONTROL
                </h1>
                <p className="text-xs text-amber-300/70 font-medium tracking-wide">SYSTEM ONLINE</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <span className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer">
                GLOBE
              </span>
              <Link href="/projects" className="text-slate-300 hover:text-amber-300 font-medium transition-colors">
                PROJECTS
              </Link>
              <Link href="/knowledge" className="text-slate-300 hover:text-amber-300 font-medium transition-colors">
                KNOWLEDGE
              </Link>
              <Link href="/strategy-live" className="text-slate-300 hover:text-amber-300 font-medium transition-colors">
                STRATEGY LIVE
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">        
        <div className="relative max-w-7xl mx-auto">
          {/* System Status */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-xl px-6 py-3 mb-8 shadow-lg shadow-amber-900/20">
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse shadow-sm shadow-teal-400/50"></div>
              <span className="text-amber-300 font-semibold text-lg tracking-wide">SYSTEM ONLINE</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent mb-6 tracking-wider leading-tight drop-shadow-2xl">
              HISL CONTROL
            </h1>
            <p className="text-2xl text-amber-100 mb-4 font-light leading-relaxed">
              Sovereign AI Infrastructure for Construction
            </p>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Advanced artificial intelligence orchestration for the construction industry, 
              delivering privacy-preserving, enterprise-grade AI solutions with complete data sovereignty.
            </p>
          </div>

          {/* WHERE YOUR PROMPTS GO Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-12 mb-16 shadow-2xl shadow-amber-900/10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-8 text-center">
              WHERE YOUR PROMPTS GO
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Enhanced 3D Globe with Ravens */}
              <div className="flex justify-center">
                <div className="relative w-96 h-96">
                  {/* Glowing backdrop */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-teal-400/10 blur-xl"></div>
                  
                  {/* Main Globe */}
                  <div className="relative rounded-full overflow-hidden border-2 border-amber-400/30 shadow-2xl shadow-amber-500/20">
                    <Image
                      src={getImageSrc('earth', 'earth_daymap', 1200) || '/images/earth_daymap.jpg'}
                      alt="HISL Global Network"
                      width={384}
                      height={384}
                      className="w-full h-full object-cover rounded-full animate-spin opacity-90"
                      style={{ animationDuration: '60s' }}
                      placeholder="blur"
                      blurDataURL={getLQIP('earth', 'earth_daymap') || ''}
                    />
                  </div>
                  
                  {/* Enhanced Orbital Ravens */}
                  <div className="absolute inset-0">
                    {/* Huginn with glow */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-sm w-8 h-8"></div>
                          <Image
                            src={getImageSrc('ravens', 'raven_huginn', 1200) || '/images/raven_huginn.png'}
                            alt="Huginn"
                            width={40}
                            height={40}
                            className="relative opacity-90 drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Muninn with glow */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-sm w-7 h-7"></div>
                          <Image
                            src={getImageSrc('ravens', 'raven_muninn', 1200) || '/images/raven_muninn.png'}
                            alt="Muninn"
                            width={35}
                            height={35}
                            className="relative opacity-90 drop-shadow-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Grid overlay */}
                  <div className="absolute inset-0 rounded-full border-2 border-emerald-400/20" 
                       style={{ background: 'conic-gradient(from 0deg, transparent 85%, rgba(16, 185, 129, 0.15) 90%, transparent 95%)' }}>
                  </div>
                </div>
              </div>

              {/* Enhanced Prompt Input */}
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-amber-300 mb-2">AI Command Interface</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Enter construction analysis commands to interact with our sovereign AI infrastructure.
                    Your data remains private and never leaves your control.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-semibold text-amber-300 mb-3 tracking-wide">
                      → COMMAND INPUT
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Initialize construction analysis protocol..."
                      className="w-full p-4 bg-slate-950/80 border border-amber-400/30 text-amber-50 rounded-xl resize-none h-36 focus:ring-2 focus:ring-amber-500 focus:border-amber-400 font-mono placeholder-slate-500 shadow-inner transition-all"
                      disabled={loading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black p-4 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-3">PROCESSING</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </span>
                    ) : (
                      "EXECUTE COMMAND"
                    )}
                  </button>
                </form>

                {response && (
                  <div className="bg-slate-950/90 border border-amber-400/30 rounded-xl p-6 shadow-lg">
                    <div className="text-amber-50 text-sm whitespace-pre-wrap leading-relaxed font-mono">
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
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-6">
              INTEGAI AGENT FLEET
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
              Advanced autonomous AI systems working in harmony to deliver comprehensive 
              construction intelligence and risk management.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agentFleet.map((agent) => (
              <div 
                key={agent.name} 
                className="group bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/40"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl filter drop-shadow-lg">{agent.icon}</div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                    agent.status === 'Active' ? 'bg-teal-600/20 text-teal-300 border border-teal-500/30' : 
                    agent.status === 'Standby' ? 'bg-amber-600/20 text-amber-300 border border-amber-500/30' :
                    'bg-red-600/20 text-red-300 border border-red-500/30'
                  }`}>
                    {agent.status.toUpperCase()}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-amber-300 mb-3 group-hover:text-amber-200 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {agent.description}
                </p>
                
                {/* Enhanced Deploy Button */}
                <button 
                  onClick={() => alert(`${agent.name} - Coming Soon! Contact us for early access demo.`)}
                  className="w-full bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/30 text-amber-300 text-sm py-3 px-4 rounded-xl font-semibold transition-all mb-6 hover:shadow-lg hover:shadow-amber-500/20"
                >
                  Deploy → Coming Soon
                </button>
                
                {/* Enhanced Status indicators */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <div className={`w-3 h-3 rounded-full ${
                      agent.status === 'Active' ? 'bg-teal-400 animate-pulse shadow-sm shadow-teal-400/50' : 
                      agent.status === 'Standby' ? 'bg-amber-400 shadow-sm shadow-amber-400/50' :
                      'bg-red-400 shadow-sm shadow-red-400/50'
                    }`}></div>
                    <div className="w-3 h-3 bg-slate-500/40 rounded-full"></div>
                    <div className="w-3 h-3 bg-slate-500/40 rounded-full"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    {agent.status === 'Active' ? 'OPERATIONAL' : 
                     agent.status === 'Standby' ? 'STANDBY' : 'SECURED'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BIOS Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-4">BIOS</h2>
            <p className="text-amber-300/70">System Architects</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Michael Howard */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-2 border-amber-400/30 mb-6 overflow-hidden bg-slate-900/40">
                  {getLQIP('general', 'michael_howard') ? (
                    <Image
                      src={getLQIP('general', 'michael_howard') || '/images/michael_howard.png'}
                      alt="Michael Howard"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-amber-400">👤</div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">MICHAEL HOWARD</h3>
                <p className="text-amber-300/70 mb-4">Founder & Chief Architect</p>
                <p className="text-amber-100/60 text-sm leading-relaxed mb-4">
                  Sovereign AI systems architect focused on human-centered artificial intelligence. 
                  Leading development of privacy-preserving AI infrastructure for enterprise deployment.
                </p>
                
                {/* Professional Links */}
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://www.linkedin.com/in/michaelhowardconstruction" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-amber-900/20 hover:bg-amber-900/40 border border-amber-500/30 text-amber-400 text-xs py-2 px-4 rounded transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                  <a 
                    href="https://substack.com/@michaelhowardmciob" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-amber-900/20 hover:bg-amber-900/40 border border-amber-500/30 text-amber-400 text-xs py-2 px-4 rounded transition-colors"
                  >
                    Substack Articles
                  </a>
                </div>
              </div>
            </div>

            {/* IntegAI */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-lg p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full border-2 border-amber-400/30 mb-6 overflow-hidden bg-slate-900/40 flex items-center justify-center">
                  {getLQIP('logos', 'ingegai_logo') ? (
                    <Image
                      src={getLQIP('logos', 'ingegai_logo') || '/images/IngegAI Logo.png'}
                      alt="IntegAI Logo"
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  ) : (
                    <div className="text-4xl text-amber-400">🤖</div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-amber-400 mb-2">INTEGAI</h3>
                <p className="text-amber-300/70 mb-4">Master AI Orchestrator</p>
                <p className="text-amber-100/60 text-sm leading-relaxed">
                  Advanced AI coordination system managing autonomous agent fleets. 
                  Ensuring ethical compliance and sovereign operation across all AI subsystems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-amber-400/20 bg-slate-950/90 backdrop-blur-xl py-12 shadow-2xl shadow-amber-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-sm shadow-amber-400/50"></div>
                <div>
                  <h3 className="text-lg font-semibold text-amber-400">HISL</h3>
                  <p className="text-sm text-amber-300/70">CONTROL SYSTEM</p>
                </div>
              </div>
              <p className="text-amber-100/60 text-sm mb-4">
                Sovereign AI Infrastructure for Construction Industry
              </p>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-sm shadow-teal-400/50"></div>
                <span className="text-amber-300">STATUS: OPERATIONAL</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-amber-400 font-semibold mb-4">MODULES</h4>
              <ul className="space-y-2 text-sm text-amber-300/70">
                <li><a href="/projects" className="hover:text-amber-300 transition-colors">→ PROJECTS</a></li>
                <li><a href="/knowledge" className="hover:text-amber-300 transition-colors">→ KNOWLEDGE</a></li>
                <li><a href="/strategy-live" className="hover:text-amber-300 transition-colors">→ STRATEGY LIVE</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">→ API ACCESS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-amber-400 font-semibold mb-4">CONNECT</h4>
              <ul className="space-y-2 text-sm text-amber-300/70">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/michaelhowardconstruction" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    → LINKEDIN
                  </a>
                </li>
                <li>
                  <a 
                    href="https://substack.com/@michaelhowardmciob" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors"
                  >
                    → SUBSTACK
                  </a>
                </li>
                <li><a href="/consent" className="hover:text-amber-300 transition-colors">→ CONSENT MGMT</a></li>
                <li><a href="#" className="hover:text-amber-300 transition-colors">→ DATA SOVEREIGN</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-amber-400/20 mt-8 pt-8 text-center">
            <p className="text-amber-100/60 text-sm font-mono">
              © 2024 HISL - HUMAN INTELLIGENCE SYSTEMS LABORATORY - ALL SYSTEMS OPERATIONAL
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
