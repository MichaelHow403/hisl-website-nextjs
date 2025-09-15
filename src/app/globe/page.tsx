"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function GlobePage() {
  const [isDay, setIsDay] = useState(true);
  const [showClouds, setShowClouds] = useState(true);

  useEffect(() => {
    // Toggle day/night every 10 seconds for demo
    const interval = setInterval(() => {
      setIsDay(prev => !prev);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="globe-page min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black text-white">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-white/10">
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
                <h1 className="text-xl font-bold text-white">HISL Globe</h1>
                <p className="text-xs text-gray-300">Global Intelligence Network</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link href="/globe" className="text-blue-400 font-medium">Globe</Link>
              <Link href="/about" className="text-gray-300 hover:text-white">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              <Link href="/deploy" className="text-gray-300 hover:text-white">Deploy</Link>
              <Link href="/consent" className="text-gray-300 hover:text-white">Consent</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Globe Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Global Intelligence Network
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Real-time visualization of HISL&apos;s distributed AI network with day/night cycles, 
              cloud coverage, and orbital intelligence systems.
            </p>
          </div>

          {/* Globe Container */}
          <div className="relative flex justify-center mb-12">
            <div className="relative w-96 h-96 md:w-[500px] md:h-[500px]">
              {/* Main Globe */}
              <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
                <Image
                  src={isDay ? "/images/earth_daymap.jpg" : "/images/earth_daymap.jpg"}
                  alt={isDay ? "Earth Day Map" : "Earth Night Map"}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover rounded-full animate-spin"
                  style={{ animationDuration: '60s' }}
                />
                
                {/* Cloud Layer */}
                {showClouds && (
                  <div className="absolute inset-0 rounded-full opacity-30">
                    <div className="w-full h-full bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* Ravens in Orbit */}
              <div className="absolute inset-0">
                {/* Huginn - Inner Orbit */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <Image
                      src="/images/raven_huginn.png"
                      alt="Huginn Raven"
                      width={32}
                      height={32}
                      className="opacity-80"
                    />
                  </div>
                </div>

                {/* Muninn - Outer Orbit */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                    <Image
                      src="/images/raven_muninn.png"
                      alt="Muninn Raven"
                      width={28}
                      height={28}
                      className="opacity-70"
                    />
                  </div>
                </div>
              </div>

              {/* Data Center Pins */}
              <div className="absolute inset-0">
                {/* DC Pin 1 */}
                <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400/50"></div>
                {/* DC Pin 2 */}
                <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                {/* DC Pin 3 */}
                <div className="absolute bottom-1/3 left-1/2 w-3 h-3 bg-purple-400 rounded-full animate-pulse shadow-lg shadow-purple-400/50"></div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-8 mb-12">
            <button
              onClick={() => setIsDay(!isDay)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {isDay ? "Switch to Night" : "Switch to Day"}
            </button>
            <button
              onClick={() => setShowClouds(!showClouds)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {showClouds ? "Hide Clouds" : "Show Clouds"}
            </button>
          </div>

          {/* Network Stats */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Global Coverage</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
              <div className="text-gray-300">Network Uptime</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
              <div className="text-gray-300">Data Centers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Image
                src="/images/HISL_Logo.jpeg"
                alt="HISL Logo"
                width={24}
                height={24}
                className="rounded"
              />
              <span className="text-gray-300">HISL Global Network</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-300">Sovereign: Online</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
