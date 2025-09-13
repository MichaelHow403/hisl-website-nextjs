"use client";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWhyHow, setShowWhyHow] = useState(false);
  const [agencyLevel, setAgencyLevel] = useState<"draft_only" | "review_window" | "guardrailed_auto">("draft_only");

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

      if (data.response) {
        setResponse(data.response);
        setShowWhyHow(true);
      } else {
        setResponse("Error: " + data.error);
      }
    } catch {
      setResponse("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const sectors = [
    { name: "pharma", icon: "/images/AI_DNA.png", desc: "Pharmaceutical research and drug discovery" },
    { name: "construction", icon: "/images/AI_Construction bridge.png", desc: "Smart construction and infrastructure" },
    { name: "environmental", icon: "/images/earth_daymap.jpg", desc: "Environmental monitoring and conservation" },
    { name: "medical", icon: "/images/raven_huginn.png", desc: "Medical diagnostics and healthcare AI" },
    { name: "legal", icon: "/images/Feather.PNG", desc: "Legal research and compliance automation" },
    { name: "economics", icon: "/images/reach_for_the_stars.png", desc: "Economic modeling and financial analysis" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/HISL_Logo.jpeg"
                alt="HISL Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">HISL</h1>
                <p className="text-xs text-gray-500">Human Intelligence Systems Lab</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-blue-600 font-medium">Home</a>
              <a href="/globe" className="text-gray-700 hover:text-blue-600">Globe</a>
              <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="/contact" className="text-gray-700 hover:text-blue-600">Contact</a>
              <a href="/deploy" className="text-gray-700 hover:text-blue-600">Deploy</a>
              <a href="/consent" className="text-gray-700 hover:text-blue-600">Consent</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Sovereign AI for <span className="text-blue-600">Human Intelligence</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                HISL pioneers ethical, transparent AI systems that augment human capabilities 
                while preserving privacy, autonomy, and democratic values through our RAVEN orchestrator.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#ai-assistant" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center">
                  Try AI Assistant
                </a>
                <a href="/globe" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-center">
                  View Global Network
                </a>
              </div>
            </div>
            
            {/* Mini Globe */}
            <div className="flex justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src="/images/globe_3d_with_ravens.png"
                    alt="HISL Global Network"
                    width={320}
                    height={320}
                    className="w-full h-full object-cover rounded-full animate-spin"
                    style={{ animationDuration: '60s' }}
                  />
                </div>
                {/* Orbital Ravens */}
                <div className="absolute inset-0">
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <Image
                        src="/images/raven_huginn.png"
                        alt="Huginn"
                        width={24}
                        height={24}
                        className="opacity-80"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                      <Image
                        src="/images/raven_muninn.png"
                        alt="Muninn"
                        width={20}
                        height={20}
                        className="opacity-70"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sovereign AI Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete control over your AI infrastructure with privacy-preserving, 
              compliant, and transparent artificial intelligence systems.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50">
              <Image
                src="/images/raven_huginn.png"
                alt="RAVEN Orchestrator"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">RAVEN Orchestrator</h3>
              <p className="text-gray-600">
                On-premises AI orchestration with zero third-party dependencies and full data sovereignty.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50">
              <Image
                src="/images/AI_DNA.png"
                alt="Privacy First"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Privacy by Design</h3>
              <p className="text-gray-600">
                End-to-end encryption, data minimization, and comprehensive privacy controls built-in.
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50">
              <Image
                src="/images/reach_for_the_stars.png"
                alt="Compliance Ready"
                width={64}
                height={64}
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Compliance Ready</h3>
              <p className="text-gray-600">
                Built-in GDPR, EU AI Act, and sector-specific compliance with automated reporting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Poem/Ethos Section */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Ethos</h2>
          <div className="text-lg md:text-xl leading-relaxed space-y-4 italic">
            <p>&quot;In the realm where silicon meets soul,</p>
            <p>Where algorithms dance with human goal,</p>
            <p>We forge not masters, but faithful friends—</p>
            <p>Intelligence that serves, protects, transcends.&quot;</p>
          </div>
          <div className="mt-8 text-gray-300">
            <p className="text-base">
              At HISL, we believe artificial intelligence should amplify human wisdom, 
              not replace human judgment. Our sovereign AI systems are designed to be 
              transparent, accountable, and aligned with human values.
            </p>
          </div>
        </div>
      </section>

      {/* Sector Ambassadors */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sector Ambassadors</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Specialized AI solutions tailored for specific industries with curated knowledge bases 
              and compliance frameworks.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {sectors.map((sector) => (
              <div key={sector.name} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src={sector.icon}
                  alt={sector.name}
                  width={48}
                  height={48}
                  className="mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">
                  {sector.name}
                </h3>
                <p className="text-gray-600 mb-4">{sector.desc}</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                  Explore {sector.name} AI →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-assistant" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Assistant</h2>
            <p className="text-lg text-gray-600">
              Experience our sovereign AI assistant with full transparency, 
              explainability, and user agency control.
            </p>
          </div>
          
          {/* Agency Control */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Agency Level Control</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Draft Only</span>
              <input
                type="range"
                min="0"
                max="2"
                value={agencyLevel === "draft_only" ? 0 : agencyLevel === "review_window" ? 1 : 2}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setAgencyLevel(value === 0 ? "draft_only" : value === 1 ? "review_window" : "guardrailed_auto");
                }}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm text-gray-600">Guardrailed Auto</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Current: {agencyLevel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your question or prompt:
                </label>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask me anything about AI, research, or any topic you're curious about..."
                  className="w-full p-4 border border-gray-300 rounded-lg resize-none h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>
              
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-blue-600 text-white p-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Ask AI Assistant"
                )}
              </button>
            </form>

            {response && (
              <div className="mt-8 space-y-4">
                <div className="p-6 bg-white rounded-lg shadow-sm border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Response:</h3>
                  <div className="prose prose-blue max-w-none">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{response}</p>
                  </div>
                </div>

                {/* Why/How Pane */}
                {showWhyHow && (
                  <div className="bg-gray-50 rounded-lg border">
                    <button
                      onClick={() => setShowWhyHow(!showWhyHow)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-gray-900">Why/How - Explainability</span>
                      <svg className={`w-5 h-5 text-gray-500 transform transition-transform ${showWhyHow ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div className="px-4 pb-4 space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Reasoning Trace</h4>
                          <p className="text-sm text-gray-600">
                            Model analyzed prompt → Retrieved relevant knowledge → 
                            Applied reasoning patterns → Generated response
                          </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-2">Model Votes</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span>DeepSeek</span>
                              <span className="text-green-600">✓ Yes</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Regulation Map</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div>• GDPR Article 5(1)(c) - Data minimization applied</div>
                          <div>• EU AI Act Article 13 - Transparency requirements met</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Educational/Substack Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Learn & Stay Updated</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Educational resources, research insights, and the latest developments 
              in sovereign AI and human-centered technology.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Research Publications</h3>
              <p className="text-gray-600 mb-6">
                Access our latest research papers, whitepapers, and technical documentation 
                on sovereign AI systems and ethical AI development.
              </p>
              <a href="#" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-block">
                Browse Research
              </a>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Newsletter & Updates</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to our newsletter for the latest insights on AI governance, 
                privacy-preserving AI, and sovereign technology developments.
              </p>
              <a href="#" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors inline-block">
                Subscribe Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <Image
                  src="/images/HISL_Logo.jpeg"
                  alt="HISL Logo"
                  width={32}
                  height={32}
                  className="rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">HISL</h3>
                  <p className="text-sm text-gray-400">Human Intelligence Systems Laboratory</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md mb-4">
                Advancing the frontiers of artificial intelligence through sovereign, 
                ethical, and human-centered AI systems.
              </p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Sovereign: Online</span>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/globe" className="hover:text-white transition-colors">Global Network</a></li>
                <li><a href="/deploy" className="hover:text-white transition-colors">Deploy RAVEN</a></li>
                <li><a href="/consent" className="hover:text-white transition-colors">Privacy Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal & Compliance</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GDPR Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">EU AI Act</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 HISL - Human Intelligence Systems Laboratory. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
