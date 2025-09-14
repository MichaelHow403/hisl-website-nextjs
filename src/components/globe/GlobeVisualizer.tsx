'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import GlobeScene from './GlobeScene';
import { DataCenter, DATA_CENTERS, latLngToVector3, REGIONS, PROVIDERS } from '@/data/data-centers';


interface SimulationResult {
  hops: DataCenter[];
  totalLatency: number;
  energyEstimate: number;
  responseTime: number;
  response?: string;
}

export default function GlobeVisualizer() {
  const [selectedDataCenter, setSelectedDataCenter] = useState<DataCenter | null>(null);
  const [prompt, setPrompt] = useState('');
  const [agentId, setAgentId] = useState('claude-3-5-sonnet');
  const [context, setContext] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [showPulse, setShowPulse] = useState(false);
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');

  // Filter data centers based on selected filters
  const filteredDataCenters = useMemo(() => {
    return DATA_CENTERS.filter(dc => {
      if (!dc.active) return false;
      if (filterRegion !== 'all' && dc.region !== filterRegion) return false;
      if (filterProvider !== 'all' && dc.provider !== filterProvider) return false;
      return true;
    });
  }, [filterRegion, filterProvider]);

  // Generate animation path for pulse
  const animationPath = useMemo(() => {
    if (!simulationResult?.hops.length) return [];
    
    return simulationResult.hops.map(dc => {
      const [lng, lat] = dc.coordinates;
      const pos = latLngToVector3(lat, lng, 1.05);
      return new THREE.Vector3(pos.x, pos.y, pos.z);
    });
  }, [simulationResult]);

  // Simulate prompt processing
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsSimulating(true);
    setShowPulse(false);
    setSimulationResult(null);

    try {
      // Simulate routing logic
      const startTime = Date.now();
      
      // Select optimal data centers based on latency and capacity
      const availableDCs = filteredDataCenters.filter(dc => dc.active);
      const primaryDC = availableDCs.reduce((best, current) => 
        (current.latency || 100) < (best.latency || 100) ? current : best
      );
      
      // Create a realistic hop sequence
      const hops = [primaryDC];
      if (availableDCs.length > 1) {
        const secondaryDC = availableDCs.find(dc => 
          dc.id !== primaryDC.id && dc.provider !== primaryDC.provider
        );
        if (secondaryDC) hops.push(secondaryDC);
      }

      // Calculate metrics
      const totalLatency = hops.reduce((sum, dc) => sum + (dc.latency || 50), 0);
      const energyEstimate = Math.max(0.1, prompt.length * 0.001 + hops.length * 0.05);
      
      // Call the API endpoint
      const response = await fetch('/api/deepseek', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId, prompt, context })
      });

      const responseData = await response.json();
      const responseTime = Date.now() - startTime;

      const result: SimulationResult = {
        hops,
        totalLatency,
        energyEstimate,
        responseTime,
        response: responseData.response || responseData.message || 'Simulation complete'
      };

      setSimulationResult(result);
      setShowPulse(true);

      // Track with PostHog if available
      if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).posthog) {
        ((window as unknown as Record<string, unknown>).posthog as unknown as { capture: (event: string, props: Record<string, unknown>) => void }).capture('globe_simulation_run', {
          hops: hops.length,
          page: 'globe',
          agentId,
          promptLength: prompt.length
        });
      }

    } catch (error) {
      console.error('Simulation error:', error);
      setSimulationResult({
        hops: [filteredDataCenters[0]],
        totalLatency: 100,
        energyEstimate: 0.1,
        responseTime: 1000,
        response: 'Simulation failed - running in demo mode'
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Where Your Prompts Go
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Visualize the journey of your AI prompts across global data centers. 
            Watch as your requests travel through the infrastructure that powers modern AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Globe Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-white">Global Infrastructure</h2>
                <div className="flex gap-2">
                  <select
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                    className="bg-black/50 text-white rounded px-3 py-1 text-sm border border-white/20"
                  >
                    <option value="all">All Regions</option>
                    {REGIONS.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                  <select
                    value={filterProvider}
                    onChange={(e) => setFilterProvider(e.target.value)}
                    className="bg-black/50 text-white rounded px-3 py-1 text-sm border border-white/20"
                  >
                    <option value="all">All Providers</option>
                    {PROVIDERS.map(provider => (
                      <option key={provider} value={provider}>{provider}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <GlobeScene
                dataCenters={filteredDataCenters}
                selectedDataCenter={selectedDataCenter}
                onDataCenterClick={setSelectedDataCenter}
                animationPath={animationPath}
                showPulse={showPulse}
                className="h-96 md:h-[500px]"
              />
              
              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span className="text-gray-300">AWS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-gray-300">Google Cloud</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-gray-300">Azure</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                  <span className="text-gray-300">Anthropic</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-gray-300">OpenAI</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Control Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Prompt Form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-4">Submit Prompt</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    AI Agent
                  </label>
                  <select
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    className="w-full bg-black/50 text-white rounded-lg px-3 py-2 border border-white/20 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="claude-3-5-sonnet">Claude 3.5 Sonnet</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="gemini-pro">Gemini Pro</option>
                    <option value="deepseek-coder">DeepSeek Coder</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter your prompt here..."
                    rows={4}
                    className="w-full bg-black/50 text-white rounded-lg px-3 py-2 border border-white/20 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Context (optional)
                  </label>
                  <textarea
                    value={context}
                    onChange={(e) => setContext(e.target.value)}
                    placeholder="Additional context..."
                    rows={2}
                    className="w-full bg-black/50 text-white rounded-lg px-3 py-2 border border-white/20 focus:border-blue-500 focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!prompt.trim() || isSimulating}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {isSimulating ? 'Processing...' : 'Submit Prompt'}
                </button>
              </form>
            </div>

            {/* Selected Data Center Info */}
            <AnimatePresence>
              {selectedDataCenter && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">Data Center Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white">{selectedDataCenter.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Provider:</span>
                      <span className="text-white">{selectedDataCenter.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{selectedDataCenter.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Latency:</span>
                      <span className="text-white">{selectedDataCenter.latency}ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Capacity:</span>
                      <span className="text-white">{selectedDataCenter.capacity}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Simulation Results */}
            <AnimatePresence>
              {simulationResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-lg font-semibold text-white mb-3">Simulation Results</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-400 block">Hops</span>
                        <span className="text-white font-semibold">{simulationResult.hops.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Latency</span>
                        <span className="text-white font-semibold">{simulationResult.totalLatency}ms</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Energy</span>
                        <span className="text-white font-semibold">{simulationResult.energyEstimate.toFixed(3)} kWh</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block">Response Time</span>
                        <span className="text-white font-semibold">{simulationResult.responseTime}ms</span>
                      </div>
                    </div>
                    
                    {simulationResult.response && (
                      <div className="mt-4">
                        <span className="text-gray-400 block text-sm mb-2">Response</span>
                        <div className="bg-black/30 rounded p-3 text-sm text-gray-200 max-h-32 overflow-y-auto">
                          {simulationResult.response}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Data Centers Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
        >
          <h3 className="text-2xl font-semibold text-white mb-6">Active Data Centers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-gray-300">Name</th>
                  <th className="text-left py-3 px-4 text-gray-300">Provider</th>
                  <th className="text-left py-3 px-4 text-gray-300">Region</th>
                  <th className="text-left py-3 px-4 text-gray-300">Location</th>
                  <th className="text-left py-3 px-4 text-gray-300">Latency</th>
                  <th className="text-left py-3 px-4 text-gray-300">Capacity</th>
                </tr>
              </thead>
              <tbody>
                {filteredDataCenters.map((dc) => (
                  <tr
                    key={dc.id}
                    className={`border-b border-white/10 hover:bg-white/5 cursor-pointer transition-colors ${
                      selectedDataCenter?.id === dc.id ? 'bg-white/10' : ''
                    }`}
                    onClick={() => setSelectedDataCenter(dc)}
                  >
                    <td className="py-3 px-4 text-white">{dc.name}</td>
                    <td className="py-3 px-4 text-gray-300">{dc.provider}</td>
                    <td className="py-3 px-4 text-gray-300">{dc.region}</td>
                    <td className="py-3 px-4 text-gray-300">{dc.location}</td>
                    <td className="py-3 px-4 text-gray-300">{dc.latency}ms</td>
                    <td className="py-3 px-4 text-gray-300">{dc.capacity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
