"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="min-h-screen bg-white text-gray-900 font-['Inter',system-ui,-apple-system,sans-serif] antialiased">
      {/* Skip Navigation for Screen Readers */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-yellow-600 text-black px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="relative bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">HISL</h1>
                <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Industrial Intelligence</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8" aria-label="Main navigation">
              <Link href="/" className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors">
                HOME
              </Link>
              <Link href="/projects" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                PROJECTS
              </Link>
              <Link href="/knowledge" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                KNOWLEDGE
              </Link>
              <Link href="/strategy-live" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
                STRATEGY LIVE
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <main id="main-content">
        <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
          {/* Industrial Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/AI_Construction bridge.png"
              alt="Industrial Construction Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            {/* System Status Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-12">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white/90 font-medium text-sm tracking-wide">SYSTEM ONLINE</span>
            </div>

            {/* Main Headline - 72px */}
            <h1 className="text-7xl font-bold text-white mb-6 tracking-tight leading-tight max-w-5xl mx-auto">
              Industrial intelligence that keeps people{" "}
              <span className="text-yellow-400">safe</span> — and operations{" "}
              <span className="text-green-400">sustainable</span>
            </h1>

            {/* Subheading - 24px, max-width 800px */}
            <p className="text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-light">
              HISL combines on-site sensing with AI you control to prevent incidents, 
              boost throughput, and cut emissions — even when the network doesn&apos;t cooperate.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-xl font-semibold text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105 min-w-48">
                Book a Demo
              </button>
              <button className="border-2 border-white/30 text-white hover:bg-white/10 px-10 py-4 rounded-xl font-semibold text-lg transition-all backdrop-blur-sm min-w-48">
                Download Brief
              </button>
            </div>
          </div>
        </section>

        {/* Problem → Outcome Section */}
        <section className="py-32 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                From Risk to Results
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Transform operational challenges into competitive advantages with intelligent monitoring and control systems
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Blind spots create risks</h3>
                <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center">
                  <div className="text-yellow-500 text-2xl">→</div>
                </div>
                <h4 className="text-lg font-semibold text-green-700 mb-3">Identify hazards before they escalate</h4>
                <p className="text-gray-600 leading-relaxed">
                  Real-time monitoring prevents incidents through early detection and automated alerts
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📉</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Operational drift costs money</h3>
                <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center">
                  <div className="text-yellow-500 text-2xl">→</div>
                </div>
                <h4 className="text-lg font-semibold text-green-700 mb-3">Tune processes with real-time insight</h4>
                <p className="text-gray-600 leading-relaxed">
                  Continuous optimization maintains peak performance and reduces unplanned downtime
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🌱</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Sustainability is fragmented</h3>
                <div className="w-8 h-8 mx-auto mb-4 flex items-center justify-center">
                  <div className="text-yellow-500 text-2xl">→</div>
                </div>
                <h4 className="text-lg font-semibold text-green-700 mb-3">Measure and improve what matters</h4>
                <p className="text-gray-600 leading-relaxed">
                  Unified tracking delivers actionable environmental and efficiency improvements
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>OFFLINE-FIRST, SOVEREIGN BY DESIGN</span>
              </div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Industrial Intelligence Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Built for the harshest environments where connectivity is unreliable and data sovereignty is critical
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🌐</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Edge-to-Cloud</h3>
                <p className="text-gray-600 leading-relaxed">
                  Smart routing, compression, secure sync. Works in low/no-connectivity environments with intelligent data prioritization.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🛡️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Safety Layer</h3>
                <p className="text-gray-600 leading-relaxed">
                  PPE compliance, zone breaches, anomaly detection. Comprehensive protection protocols with instant alerting.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🔒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Data Sovereign</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your data, your control. Privacy-preserving intelligence that never leaves your infrastructure without permission.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Results Metrics Section */}
        <section className="py-32 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Proven Results
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Industrial operators using HISL see measurable improvements across safety, efficiency, and sustainability metrics
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                <div className="text-6xl font-bold text-yellow-600 mb-4 font-['SF_Mono',ui-monospace,monospace]">72%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">faster incident triage</div>
                <div className="text-gray-600">Rapid identification and response to safety events</div>
              </div>
              
              <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                <div className="text-6xl font-bold text-blue-600 mb-4 font-['SF_Mono',ui-monospace,monospace]">23%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">fewer unplanned stops</div>
                <div className="text-gray-600">Predictive maintenance reduces downtime</div>
              </div>
              
              <div className="text-center bg-white rounded-2xl p-12 shadow-lg border border-gray-100">
                <div className="text-6xl font-bold text-green-600 mb-4 font-['SF_Mono',ui-monospace,monospace]">15%</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">energy reduction</div>
                <div className="text-gray-600">Optimized operations cut emissions and costs</div>
              </div>
            </div>
          </div>
        </section>

        {/* WHERE YOUR PROMPTS GO Section - Globe Feature */}
        <section className="py-32 px-6 bg-[#1a1a1a]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6 tracking-tight">
                Where Your Prompts Go
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                See how your AI queries route through sovereign infrastructure. 
                Your data travels intelligently through our global network while maintaining complete privacy and control.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Enhanced 3D Globe with Professional Styling */}
              <div className="flex justify-center">
                <div className="relative w-96 h-96">
                  {/* Glowing backdrop */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-500/20 to-green-500/10 blur-xl"></div>
                  
                  {/* Main Globe */}
                  <div className="relative rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
                    <Image
                      src="/images/earth_daymap.jpg"
                      alt="HISL Global Network"
                      width={384}
                      height={384}
                      className="w-full h-full object-cover rounded-full opacity-90"
                      style={{ 
                        animation: 'rotateGlobe 60s linear infinite',
                        transformStyle: 'preserve-3d'
                      }}
                    />
                  </div>
                  
                  {/* Subtle Orbital Elements */}
                  <div className="absolute inset-0">
                    {/* Data routing visualization */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                      <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Network grid overlay */}
                  <div className="absolute inset-0 rounded-full border-2 border-green-400/20" 
                       style={{ background: 'conic-gradient(from 0deg, transparent 85%, rgba(34, 197, 94, 0.1) 90%, transparent 95%)' }}>
                  </div>
                </div>
              </div>

              {/* Professional Command Interface */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">AI Command Interface</h3>
                  <p className="text-white/70 leading-relaxed">
                    Enter construction analysis commands to interact with our sovereign AI infrastructure.
                    Your data remains private and never leaves your control.
                  </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-semibold text-white/90 mb-3">
                      Command Input
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Analyze construction safety protocols for high-rise project..."
                      className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-xl resize-none h-32 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-400 backdrop-blur-sm placeholder-white/50 transition-all"
                      disabled={loading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-4 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-3">Processing...</span>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </span>
                    ) : (
                      "Execute Command"
                    )}
                  </button>
                </form>

                {response && (
                  <div className="bg-white/10 border border-white/20 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-white text-sm whitespace-pre-wrap leading-relaxed font-['SF_Mono',ui-monospace,monospace]">
                      {response}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Solutions Section */}
        <section className="py-32 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Industrial Solutions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                HISL delivers targeted intelligence for critical industrial operations. 
                Our platform adapts to your environment while maintaining complete data sovereignty.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {solutions.map((solution) => (
                <div 
                  key={solution.name} 
                  className="group bg-white rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 shadow-lg hover:shadow-2xl border border-gray-100 relative overflow-hidden"
                >
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{solution.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-yellow-600 transition-colors">
                      {solution.name}
                    </h3>
                    <p className="text-gray-600 font-medium mb-4">
                      {solution.description}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {solution.details}
                  </p>
                  
                  {/* Metrics highlight */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-800 text-sm font-semibold">PROVEN IMPACT</span>
                    </div>
                    <div className="text-green-700 font-bold">
                      {solution.metrics}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button 
                    onClick={() => alert(`${solution.name} - Contact us to discuss your specific requirements.`)}
                    className="w-full bg-gray-100 hover:bg-yellow-500 hover:text-black text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md"
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <h3 className="text-xl font-semibold">HISL</h3>
                  <p className="text-sm text-white/70">Industrial Intelligence</p>
                </div>
              </div>
              <p className="text-white/70 mb-6 leading-relaxed">
                Industrial Intelligence for Safety, Sustainability, and Sovereignty
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/90">STATUS: OPERATIONAL</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Solutions</h4>
              <ul className="space-y-3 text-white/70">
                <li><Link href="/projects" className="hover:text-white transition-colors">Construction Safety</Link></li>
                <li><Link href="/knowledge" className="hover:text-white transition-colors">Energy Reliability</Link></li>
                <li><Link href="/strategy-live" className="hover:text-white transition-colors">Manufacturing Insight</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">API Access</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6">Connect</h4>
              <ul className="space-y-3 text-white/70">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/michaelhowardconstruction" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="https://substack.com/@michaelhowardmciob" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Substack
                  </a>
                </li>
                <li><Link href="/consent" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 HISL - Howard Integritas Solutions Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS for Globe Animation */}
      <style jsx>{`
        @keyframes rotateGlobe {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
