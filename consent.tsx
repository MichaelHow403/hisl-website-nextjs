"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ConsentPage() {
  const [agencyLevel, setAgencyLevel] = useState<"draft_only" | "review_window" | "guardrailed_auto">("draft_only");
  const [consentGiven, setConsentGiven] = useState(false);
  const [dataProcessing, setDataProcessing] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  const downloadConsentReceipt = () => {
    const receipt = {
      timestamp: new Date().toISOString(),
      userId: "user-" + Math.random().toString(36).substr(2, 9),
      agencyLevel,
      consents: {
        dataProcessing,
        analytics,
        aiInteraction: consentGiven
      },
      version: "1.0",
      jurisdiction: "EU",
      regulations: ["GDPR", "EU-AI-Act"]
    };

    const blob = new Blob([JSON.stringify(receipt, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hisl-consent-receipt-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                <h1 className="text-xl font-bold text-gray-900">HISL Consent</h1>
                <p className="text-xs text-gray-500">Privacy & Agency Management</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/globe" className="text-gray-700 hover:text-blue-600">Globe</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              <Link href="/deploy" className="text-gray-700 hover:text-blue-600">Deploy</Link>
              <Link href="/consent" className="text-blue-600 font-medium">Consent</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Privacy & Agency Control
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Manage your data processing preferences, AI interaction agency level, and download 
              verifiable consent receipts in compliance with GDPR and EU AI Act.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Agency Slider */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">AI Agency Level</h2>
              <p className="text-gray-600 mb-8">
                Control how much autonomy the AI system has when processing your requests.
              </p>

              <div className="space-y-6">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="2"
                    value={agencyLevel === "draft_only" ? 0 : agencyLevel === "review_window" ? 1 : 2}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setAgencyLevel(value === 0 ? "draft_only" : value === 1 ? "review_window" : "guardrailed_auto");
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>Draft Only</span>
                    <span>Review Window</span>
                    <span>Guardrailed Auto</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Current Level: {agencyLevel.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </h3>
                  <p className="text-blue-800 text-sm">
                    {agencyLevel === "draft_only" && "AI generates drafts only. All outputs require your explicit approval before any action."}
                    {agencyLevel === "review_window" && "AI can take actions after a 12-hour review window. You can intervene during this period."}
                    {agencyLevel === "guardrailed_auto" && "AI can take immediate action within predefined safety guardrails and compliance boundaries."}
                  </p>
                </div>
              </div>
            </div>

            {/* Consent Management */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Processing Consent</h2>
              <p className="text-gray-600 mb-8">
                Granular control over how your data is processed and stored.
              </p>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">AI Interaction</h3>
                    <p className="text-sm text-gray-500">Process prompts and generate responses</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Data Processing</h3>
                    <p className="text-sm text-gray-500">Store and analyze interaction patterns</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={dataProcessing}
                      onChange={(e) => setDataProcessing(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Analytics</h3>
                    <p className="text-sm text-gray-500">Usage analytics and performance metrics</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analytics}
                      onChange={(e) => setAnalytics(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Consent Actions</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={downloadConsentReceipt}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Download Consent Receipt
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Revoke All Consent
              </button>
              <button className="border border-red-300 text-red-700 px-8 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors">
                Delete All Data
              </button>
            </div>
          </div>

          {/* Compliance Info */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Regulatory Compliance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">GDPR Compliance</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Right to access your data</li>
                  <li>• Right to rectification</li>
                  <li>• Right to erasure (&quot;right to be forgotten&quot;)</li>
                  <li>• Right to data portability</li>
                  <li>• Right to object to processing</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">EU AI Act Compliance</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Transparency in AI decision-making</li>
                  <li>• Human oversight requirements</li>
                  <li>• Risk assessment and mitigation</li>
                  <li>• Algorithmic accountability</li>
                  <li>• Bias monitoring and correction</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
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
              <span className="text-gray-300">HISL Privacy Center</span>
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
    </div>
  );
}
