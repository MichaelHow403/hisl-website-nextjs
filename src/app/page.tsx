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

  return (
    <div className="min-h-screen bg-white text-gray-900 font-['SF_Pro_Display',-apple-system,system-ui,'Inter',sans-serif] antialiased">
      {/* Skip Navigation for Screen Readers */}
      <a 
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-amber-600 text-white px-6 py-3 rounded-xl z-50 font-semibold"
      >
        Skip to main content
      </a>

      {/* Premium Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-24">
            {/* HISL Logo with Hard Hat */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">🏗️</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-amber-600 to-gray-900 bg-clip-text text-transparent">
                  HISL
                </h1>
                <p className="text-xs text-gray-500 font-medium tracking-wider uppercase">Industrial Intelligence</p>
              </div>
            </div>
            
            {/* Premium Navigation */}
            <nav className="hidden md:flex space-x-12" aria-label="Main navigation">
              <Link href="/" className="text-amber-600 hover:text-amber-700 font-semibold transition-all duration-300 relative">
                Home
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-600 rounded-full"></div>
              </Link>
              <Link href="/projects" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">
                Solutions
              </Link>
              <Link href="/knowledge" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">
                Insights
              </Link>
              <Link href="/strategy-live" className="text-gray-600 hover:text-gray-900 font-medium transition-all duration-300 hover:scale-105">
                Strategy
              </Link>
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
                Book Demo
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Premium Industrial */}
      <main id="main-content" className="pt-24">
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Industrial Background with Parallax */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/AI_Construction bridge.png"
              alt="Industrial Construction Site"
              fill
              className="object-cover scale-110 transform transition-transform duration-[20s] ease-out"
              priority
            />
            {/* Elegant Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-gray-900/40"></div>
            {/* Gaussian Blur Effect */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-8 py-32">
            <div className="max-w-5xl">
              {/* Premium Status Indicator */}
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-8 py-4 mb-16 shadow-2xl">
                <div className="relative w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50">
                  <div className="absolute w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                </div>
                <span className="text-white font-medium text-lg tracking-wide">Operational Excellence</span>
              </div>

              {/* Hero Headline - 84px */}
              <h1 className="text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9] max-w-4xl">
                Industrial intelligence that keeps people{" "}
                <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  safe
                </span>{" "}
                and operations{" "}
                <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                  sustainable
                </span>
              </h1>

              {/* Premium Subheading */}
              <p className="text-3xl text-white/90 mb-16 leading-relaxed max-w-4xl font-light">
                HISL combines on-site sensing with AI you control to prevent incidents, 
                boost throughput, and cut emissions — even when connectivity fails.
              </p>
              
              {/* Premium CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-8">
                <button className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 hover:scale-105 min-w-64">
                  <span className="flex items-center justify-center">
                    Book a Demo
                    <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
                <button className="border-2 border-white/40 text-white hover:bg-white/10 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-300 backdrop-blur-xl hover:scale-105 min-w-64">
                  Download Brief
                </button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute right-16 top-1/2 transform -translate-y-1/2 hidden xl:block">
            <div className="w-4 h-4 bg-amber-400 rounded-full shadow-lg shadow-amber-400/50 animate-pulse"></div>
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 mt-8 ml-8 animate-pulse delay-1000"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50 mt-12 ml-4 animate-pulse delay-2000"></div>
          </div>
        </section>

        {/* Problem → Solution Section */}
        <section className="py-32 px-8 bg-gradient-to-br from-gray-50 via-white to-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-7xl font-black text-gray-900 mb-8 tracking-tight">
                From Chaos to Control
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                Transform operational uncertainty into competitive advantage with intelligent monitoring and autonomous control systems
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Risk Card */}
              <div className="group bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden hover:-translate-y-4">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent opacity-50"></div>
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-5xl">⚠️</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Blind spots create risks</h3>
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-semibold text-emerald-700 mb-4">Identify hazards before they escalate</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Real-time monitoring prevents incidents through early detection, predictive analysis, and automated safety alerts across all operational zones.
                  </p>
                </div>
              </div>
              
              {/* Efficiency Card */}
              <div className="group bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden hover:-translate-y-4">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-50"></div>
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-5xl">⚡</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Inefficiency drains resources</h3>
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-semibold text-emerald-700 mb-4">Optimize performance in real-time</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Continuous optimization maintains peak performance, reduces unplanned downtime, and maximizes operational throughput.
                  </p>
                </div>
              </div>
              
              {/* Sustainability Card */}
              <div className="group bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden hover:-translate-y-4">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-transparent opacity-50"></div>
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-5xl">🌱</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Sustainability fragmentation</h3>
                  <div className="flex justify-center mb-8">
                    <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></div>
                  </div>
                  <h4 className="text-xl font-semibold text-emerald-700 mb-4">Measure and improve impact</h4>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Unified tracking delivers actionable environmental improvements, carbon reduction, and operational sustainability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Proven Results Section */}
        <section className="py-32 px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #F59E0B 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, #10B981 0%, transparent 50%)`,
            }}></div>
          </div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center mb-24">
              <h2 className="text-7xl font-black text-white mb-8 tracking-tight">
                Proven Results
              </h2>
              <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light">
                Industrial operators using HISL see measurable improvements across safety, efficiency, and sustainability metrics within 90 days
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-8xl font-black bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-6 font-mono">72%</div>
                <div className="text-2xl font-bold text-white mb-4">faster incident triage</div>
                <div className="text-white/70 text-lg">Rapid identification and response to safety events across all operational zones</div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-8xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-6 font-mono">23%</div>
                <div className="text-2xl font-bold text-white mb-4">fewer unplanned stops</div>
                <div className="text-white/70 text-lg">Predictive maintenance reduces downtime and maximizes operational efficiency</div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-16 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="text-8xl font-black bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-6 font-mono">15%</div>
                <div className="text-2xl font-bold text-white mb-4">energy reduction</div>
                <div className="text-white/70 text-lg">Optimized operations cut emissions, reduce costs, and improve sustainability</div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Intelligence Platform Section */}
        <section className="py-32 px-8 bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Enhanced Globe Visualization */}
              <div className="flex justify-center">
                <div className="relative w-[500px] h-[500px]">
                  {/* Glowing Backdrop */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 via-emerald-400/10 to-blue-400/20 blur-3xl"></div>
                  
                  {/* Main Globe Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                    <Image
                      src="/images/earth_daymap.jpg"
                      alt="HISL Global Intelligence Network"
                      width={500}
                      height={500}
                      className="w-full h-full object-cover opacity-90"
                      style={{ 
                        animation: 'rotateGlobe 120s linear infinite',
                        transformStyle: 'preserve-3d'
                      }}
                    />
                    
                    {/* Network Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-500/10 to-emerald-500/10 rounded-full"></div>
                  </div>
                  
                  {/* Orbital Intelligence Nodes */}
                  <div className="absolute inset-0">
                    {/* Primary Node */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s' }}>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full shadow-2xl shadow-amber-400/50 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Secondary Node */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '45s', animationDirection: 'reverse' }}>
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full shadow-2xl shadow-emerald-400/50"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Intelligence Grid */}
                  <div className="absolute inset-0 rounded-full" 
                       style={{ 
                         background: 'conic-gradient(from 0deg, transparent 80%, rgba(245, 158, 11, 0.1) 85%, transparent 90%)',
                         animation: 'rotate 60s linear infinite'
                       }}>
                  </div>
                </div>
              </div>

              {/* Platform Description */}
              <div className="space-y-12">
                <div>
                  <div className="inline-flex items-center space-x-3 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full font-semibold mb-8">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span>Sovereign by Design</span>
                  </div>
                  <h2 className="text-6xl font-black text-gray-900 mb-8 tracking-tight">
                    Where Your Intelligence Lives
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed font-light">
                    See how your AI queries route through sovereign infrastructure. Your data travels intelligently 
                    through our global network while maintaining complete privacy, security, and operational control.
                  </p>
                </div>
                
                {/* AI Command Interface */}
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label htmlFor="prompt" className="block text-lg font-semibold text-gray-900 mb-4">
                      AI Command Interface
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Analyze construction safety protocols for high-rise project..."
                      className="w-full p-6 bg-white border-2 border-gray-200 text-gray-900 rounded-2xl resize-none h-32 focus:ring-4 focus:ring-amber-500/20 focus:border-amber-400 transition-all duration-300 text-lg"
                      disabled={loading}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-6 px-8 rounded-2xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-[1.02]"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <span className="mr-4">Processing Intelligence...</span>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
                          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </span>
                    ) : (
                      "Execute Intelligence Query"
                    )}
                  </button>
                </form>

                {response && (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-8">
                    <div className="text-gray-900 text-lg whitespace-pre-wrap leading-relaxed">
                      {response}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Industrial Solutions */}
        <section className="py-32 px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-7xl font-black text-gray-900 mb-8 tracking-tight">
                Industrial Solutions
              </h2>
              <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                HISL delivers targeted intelligence for mission-critical industrial operations. 
                Our platform adapts to your environment while maintaining complete data sovereignty.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-12">
              {[
                {
                  name: "Construction Safety",
                  description: "Reduce incidents across dynamic sites",
                  details: "Real-time hazard detection, PPE compliance monitoring, and automated safety alerts for construction environments.",
                  icon: "🏗️",
                  metrics: "78% reduction in safety incidents",
                  gradient: "from-amber-500 to-orange-500"
                },
                {
                  name: "Energy Reliability", 
                  description: "Predict failures and balance loads",
                  details: "Predictive maintenance, load optimization, and grid stability for energy infrastructure and industrial facilities.",
                  icon: "⚡",
                  metrics: "45% fewer unplanned outages",
                  gradient: "from-blue-500 to-cyan-500"
                },
                {
                  name: "Manufacturing Insight",
                  description: "Machine health and line optimization",
                  details: "Equipment monitoring, quality control, and production efficiency optimization for manufacturing operations.",
                  icon: "🏭",
                  metrics: "32% improvement in OEE",
                  gradient: "from-emerald-500 to-green-500"
                }
              ].map((solution) => (
                <div 
                  key={solution.name} 
                  className="group bg-white rounded-3xl p-12 transition-all duration-500 hover:-translate-y-6 shadow-xl hover:shadow-2xl border border-gray-100 relative overflow-hidden"
                >
                  <div className="text-center mb-8">
                    <div className="text-7xl mb-6">{solution.icon}</div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:scale-105 transition-transform duration-300">
                      {solution.name}
                    </h3>
                    <p className="text-gray-600 font-medium text-lg mb-6">
                      {solution.description}
                    </p>
                  </div>
                  
                  <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                    {solution.details}
                  </p>
                  
                  {/* Impact Metrics */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                      <span className="text-emerald-800 font-semibold">PROVEN IMPACT</span>
                    </div>
                    <div className="text-emerald-700 font-bold text-xl">
                      {solution.metrics}
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <button 
                    onClick={() => alert(`${solution.name} - Contact us to discuss your specific requirements.`)}
                    className={`w-full bg-gradient-to-r ${solution.gradient} text-white py-4 px-6 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105`}
                  >
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-3xl">🏗️</span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold">HISL</h3>
                  <p className="text-white/70 text-lg">Industrial Intelligence</p>
                </div>
              </div>
              <p className="text-white/80 mb-8 leading-relaxed text-xl max-w-lg">
                Industrial Intelligence for Safety, Sustainability, and Data Sovereignty
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white/90">STATUS: OPERATIONAL</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Solutions</h4>
              <ul className="space-y-4 text-white/70">
                <li><Link href="/projects" className="hover:text-white transition-colors text-lg">Construction Safety</Link></li>
                <li><Link href="/knowledge" className="hover:text-white transition-colors text-lg">Energy Reliability</Link></li>
                <li><Link href="/strategy-live" className="hover:text-white transition-colors text-lg">Manufacturing Insight</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Connect</h4>
              <ul className="space-y-4 text-white/70">
                <li>
                  <a 
                    href="https://www.linkedin.com/in/michaelhowardconstruction" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-lg"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="https://substack.com/@michaelhowardmciob" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors text-lg"
                  >
                    Substack
                  </a>
                </li>
                <li><Link href="/consent" className="hover:text-white transition-colors text-lg">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-16 pt-12 text-center">
            <p className="text-white/60 text-lg">
              © 2024 HISL - Howard Integritas Solutions Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* CSS for Animations */}
      <style jsx>{`
        @keyframes rotateGlobe {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
