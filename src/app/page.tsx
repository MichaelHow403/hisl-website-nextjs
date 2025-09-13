"use client";
import { useState } from "react";
import Image from "next/image";

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

      if (data.response) {
        setResponse(data.response);
      } else {
        setResponse("Error: " + data.error);
      }
    } catch {
      setResponse("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
              <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#research" className="text-gray-700 hover:text-blue-600">Research</a>
              <a href="#ai-assistant" className="text-gray-700 hover:text-blue-600">AI Assistant</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Image
                src="/images/globe_3d_with_ravens.png"
                alt="HISL Globe with Ravens"
                width={200}
                height={200}
                className="rounded-full shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">HISL</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Human Intelligence Systems Laboratory - Advancing the frontiers of artificial intelligence 
              through cutting-edge research, innovative AI assistants, and intelligent systems development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#ai-assistant" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Try AI Assistant
              </a>
              <a href="#about" className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About HISL</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our mission is to bridge human intelligence with artificial systems, creating innovative solutions 
              that enhance human capabilities and advance scientific understanding.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/AI_DNA.png"
                  alt="AI DNA"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Research</h3>
              <p className="text-gray-600">
                Pioneering research in machine learning, neural networks, and cognitive computing systems.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/raven_huginn.png"
                  alt="Huginn Raven"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Intelligent Systems</h3>
              <p className="text-gray-600">
                Developing autonomous systems that can think, learn, and adapt to complex environments.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Image
                  src="/images/reach_for_the_stars.png"
                  alt="Reach for the Stars"
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                Pushing the boundaries of what&apos;s possible with AI technology and human-machine collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Research</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Exploring the intersection of human cognition and artificial intelligence through interdisciplinary research.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Current Projects</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Neural Architecture Search</h4>
                    <p className="text-gray-600">Automated design of optimal neural network architectures</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Cognitive Computing</h4>
                    <p className="text-gray-600">Systems that mimic human thought processes and reasoning</p>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-medium text-gray-900">Human-AI Collaboration</h4>
                    <p className="text-gray-600">Interfaces that enhance human-machine interaction</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex justify-center">
              <Image
                src="/images/AI_Construction bridge.png"
                alt="AI Construction Bridge"
                width={400}
                height={300}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section id="ai-assistant" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">AI Assistant</h2>
            <p className="text-lg text-gray-600">
              Experience our advanced AI assistant powered by cutting-edge language models. 
              Ask questions, get insights, and explore the capabilities of modern AI.
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
              <div className="mt-8 p-6 bg-white rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">AI Response:</h3>
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{response}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
              Interested in collaborating or learning more about our research? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:contact@hisl.ai" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Contact Us
              </a>
              <a href="#research" className="border border-gray-600 text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                View Research
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
              <p className="text-gray-400 max-w-md">
                Advancing the frontiers of artificial intelligence through innovative research, 
                development, and human-centered AI solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Research Areas</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Machine Learning</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Neural Networks</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cognitive Computing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Ethics</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Publications</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
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
