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

  const solutions = [
    {
      name: "Construction Safety",
      description: "Reduce incidents across dynamic sites",
      details: "Real-time hazard detection, PPE compliance monitoring, and automated safety alerts for construction environments.",
      icon: "🏗️",
      metrics: "78% reduction in safety incidents"
    },
    {
      name: "Energy Reliability", 
      description: "Predict failures and balance loads",
      details: "Predictive maintenance, load optimization, and grid stability for energy infrastructure and industrial facilities.",
      icon: "⚡",
      metrics: "45% fewer unplanned outages"
    },
    {
      name: "Manufacturing Insight",
      description: "Machine health and line optimization",
      details: "Equipment monitoring, quality control, and production efficiency optimization for manufacturing operations.",
      icon: "🏭",
      metrics: "32% improvement in OEE"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-amber-50 font-sans relative overflow-hidden">
      {/* Skip Navigation for Screen Readers */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-black px-4 py-2 rounded-md z-50 focus:z-50"
      >
        Skip to main content
      </a>
      {/* Cosmic Starfield Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
        {/* Industrial starfield with eco-nodes */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, #F2D08A, transparent),
                           radial-gradient(2px 2px at 40px 70px, rgba(242, 208, 138, 0.4), transparent),
                           radial-gradient(1px 1px at 90px 40px, #D9A441, transparent),
                           radial-gradient(1px 1px at 130px 80px, #4FEA77, transparent),
                           radial-gradient(2px 2px at 160px 30px, rgba(217, 164, 65, 0.3), transparent)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px'
        }}></div>
        
        {/* Industrial texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(30deg, #F2D08A 0%, #D9A441 100%)`,
          mixBlendMode: 'overlay'
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
                  HISL
                </h1>
                <p className="text-xs text-amber-300/70 font-medium tracking-wide">INDUSTRIAL INTELLIGENCE</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
              <span className="text-amber-400 hover:text-amber-300 font-semibold transition-colors cursor-pointer" role="button" tabIndex={0} aria-label="Current page: Globe view">
                GLOBE
              </span>
              <Link href="/projects" className="text-slate-300 hover:text-amber-300 font-medium transition-colors" aria-label="Navigate to Projects page">
                PROJECTS
              </Link>
              <Link href="/knowledge" className="text-slate-300 hover:text-amber-300 font-medium transition-colors" aria-label="Navigate to Knowledge page">
                KNOWLEDGE
              </Link>
              <Link href="/strategy-live" className="text-slate-300 hover:text-amber-300 font-medium transition-colors" aria-label="Navigate to Strategy Live page">
                STRATEGY LIVE
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <main id="main-content">
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" aria-label="Hero section with company introduction">        
          <div className="relative max-w-7xl mx-auto">
          {/* System Status */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-xl px-6 py-3 mb-8 shadow-lg shadow-amber-900/20">
              <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse shadow-sm shadow-teal-400/50"></div>
              <span className="text-amber-300 font-semibold text-lg tracking-wide">SYSTEM ONLINE</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent mb-6 tracking-wider leading-tight drop-shadow-2xl">
              Industrial intelligence that keeps people safe — and operations sustainable.
            </h1>
            <p className="text-xl text-amber-100 mb-8 font-light leading-relaxed max-w-4xl mx-auto">
              HISL combines on-site sensing with AI you control to prevent incidents, boost throughput, and cut emissions — even when the network doesn&apos;t cooperate.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-black px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:shadow-amber-500/20">
                Book a demo
              </button>
              <button className="border-2 border-amber-400/30 text-amber-300 hover:bg-amber-400/10 px-8 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm">
                Download the brief
              </button>
            </div>
          </div>

          {/* Problem → Outcome Section */}
          <div className="mb-24">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-slate-900/40 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8 text-center">
                <div className="text-red-400 text-4xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-amber-300 mb-3">Blind spots create risks.</h3>
                <div className="text-amber-400 text-2xl mb-3">→</div>
                <h4 className="text-lg font-semibold text-emerald-300 mb-2">Identify hazards before they escalate.</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Real-time monitoring prevents incidents through early detection and automated alerts.</p>
              </div>
              
              <div className="bg-slate-900/40 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8 text-center">
                <div className="text-yellow-400 text-4xl mb-4">📉</div>
                <h3 className="text-xl font-bold text-amber-300 mb-3">Operational drift costs money.</h3>
                <div className="text-amber-400 text-2xl mb-3">→</div>
                <h4 className="text-lg font-semibold text-emerald-300 mb-2">Tune processes with real-time insight.</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Continuous optimization maintains peak performance and reduces unplanned downtime.</p>
              </div>
              
              <div className="bg-slate-900/40 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8 text-center">
                <div className="text-green-400 text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold text-amber-300 mb-3">Sustainability is fragmented.</h3>
                <div className="text-amber-400 text-2xl mb-3">→</div>
                <h4 className="text-lg font-semibold text-emerald-300 mb-2">Measure and improve what matters.</h4>
                <p className="text-slate-400 text-sm leading-relaxed">Unified tracking delivers actionable environmental and efficiency improvements.</p>
              </div>
            </div>
          </div>

          {/* Platform Highlight Section */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-emerald-300/20 rounded-2xl p-12 mb-16 shadow-2xl shadow-emerald-900/10">
            <div className="text-center mb-8">
              <div className="inline-flex items-center space-x-2 bg-emerald-600/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span>OFFLINE-FIRST, SOVEREIGN BY DESIGN</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Industrial Intelligence Platform
              </h2>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-emerald-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌐</span>
                </div>
                <h3 className="text-lg font-semibold text-emerald-300 mb-2">Edge-to-Cloud</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Smart routing, compression, secure sync. Works in low/no-connectivity environments.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-emerald-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="text-lg font-semibold text-emerald-300 mb-2">Safety Layer</h3>
                <p className="text-slate-400 text-sm leading-relaxed">PPE compliance, zone breaches, anomaly detection. Comprehensive protection protocols.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-emerald-600/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <h3 className="text-lg font-semibold text-emerald-300 mb-2">Data Sovereign</h3>
                <p className="text-slate-400 text-sm leading-relaxed">Your data, your control. Privacy-preserving intelligence that never leaves your infrastructure.</p>
              </div>
            </div>
          </div>

          {/* Results Metrics Section */}
          <div className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-4">
                Proven Results
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Industrial operators using HISL see measurable improvements across safety, efficiency, and sustainability metrics.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center bg-slate-900/40 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">72%</div>
                <div className="text-amber-300 font-semibold mb-2">faster incident triage</div>
                <div className="text-slate-400 text-sm">Rapid identification and response to safety events</div>
              </div>
              
              <div className="text-center bg-slate-900/40 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-2">23%</div>
                <div className="text-amber-300 font-semibold mb-2">fewer unplanned stops</div>
                <div className="text-slate-400 text-sm">Predictive maintenance reduces downtime</div>
              </div>
              
              <div className="text-center bg-slate-900/40 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">15%</div>
                <div className="text-emerald-300 font-semibold mb-2">energy reduction</div>
                <div className="text-slate-400 text-sm">Optimized operations cut emissions and costs</div>
              </div>
            </div>
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
                      src="/imagery/processed/earth/earth_daymap-1200w.webp"
                      alt="HISL Global Network"
                      width={384}
                      height={384}
                      className="w-full h-full object-cover rounded-full opacity-90"
                      style={{ 
                        animation: 'rotateGlobe 60s linear infinite',
                        transformStyle: 'preserve-3d'
                      }}
                      placeholder="blur"
                      blurDataURL="/imagery/processed/earth/earth_daymap-lqip.webp"
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
                            src="/imagery/processed/ravens/raven_huginn-1200w.webp"
                            alt="Huginn"
                            width={40}
                            height={40}
                            className="relative opacity-90 drop-shadow-lg"
                            placeholder="blur"
                            blurDataURL="/imagery/processed/ravens/raven_huginn-lqip.webp"
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
                            src="/imagery/processed/ravens/raven_muninn-1200w.webp"
                            alt="Muninn"
                            width={35}
                            height={35}
                            className="relative opacity-90 drop-shadow-lg"
                            placeholder="blur"
                            blurDataURL="/imagery/processed/ravens/raven_muninn-lqip.webp"
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
      </main>

      {/* Industrial Solutions Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900/50 to-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent mb-6">
              Industrial Solutions
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed max-w-3xl mx-auto">
              HISL delivers targeted intelligence for critical industrial operations. 
              Our platform adapts to your environment while maintaining complete data sovereignty.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div 
                key={solution.name} 
                className="group bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-400/40 relative overflow-hidden"
              >
                {/* Add cinematic background for Construction Safety */}
                {solution.name === "Construction Safety" && (
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                    <Image
                      src="/imagery/processed/general/ai_construction_bridge-2400w.webp"
                      alt="Industrial Construction Background"
                      fill
                      className="object-cover rounded-2xl"
                      placeholder="blur"
                      blurDataURL="/imagery/processed/general/ai_construction_bridge-lqip.webp"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"></div>
                  </div>
                )}
                <div className="text-center mb-6">
                  <div className="text-6xl mb-4 filter drop-shadow-lg">{solution.icon}</div>
                  <h3 className="text-2xl font-bold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors">
                    {solution.name}
                  </h3>
                  <p className="text-amber-100 font-medium mb-4">
                    {solution.description}
                  </p>
                </div>
                
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                  {solution.details}
                </p>
                
                {/* Eco-green metrics highlight */}
                <div className="bg-emerald-600/10 border border-emerald-400/20 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-300 text-sm font-semibold">PROVEN IMPACT</span>
                  </div>
                  <div className="text-emerald-200 font-bold">
                    {solution.metrics}
                  </div>
                </div>
                
                {/* CTA Button */}
                <button 
                  onClick={() => alert(`${solution.name} - Contact us to discuss your specific requirements.`)}
                  className="w-full bg-gradient-to-r from-amber-600/20 to-yellow-600/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/30 text-amber-300 text-sm py-3 px-4 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/20"
                >
                  Learn More
                </button>
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
                <p className="text-amber-300/70 mb-4">MCIOB, Chartered Construction Manager</p>
                <p className="text-amber-100/60 text-sm leading-relaxed mb-4">
                  Director at Howard Integritas Solutions Ltd (HISL), a consultancy focused on construction management, 
                  QA/compliance oversight, and AI-supported documentation workflows in pharmaceutical and life sciences capital projects. 
                  Expert in integrating traditional construction management with modern AI technologies for enhanced safety and efficiency.
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
                <p className="text-amber-300/70 mb-4">Sovereign, offline-first orchestration for industrial AI</p>
                <p className="text-amber-100/60 text-sm leading-relaxed mb-4">
                  HISL&apos;s orchestration platform that lets industry run AI-powered safety, reliability, and sustainability workflows on-site, on their terms — even without cloud connectivity.
                </p>
                <div className="bg-emerald-600/10 border border-emerald-400/20 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-emerald-300 text-xs font-semibold">EDGE-FIRST ARCHITECTURE</span>
                  </div>
                  <div className="text-emerald-200 text-xs leading-relaxed">
                    Offline-capable orchestration • Safety-first defaults • Audit-ready observability • Sub-second latency
                  </div>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  <strong className="text-amber-300">Mission:</strong> Make AI trustworthy and operable in the most demanding environments. 
                  Unlike &ldquo;cloud-first&rdquo; systems, IntegAI is designed for compliance-heavy and high-risk industrial sectors.
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
                Industrial Intelligence for Safety, Sustainability, and Sovereignty
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
