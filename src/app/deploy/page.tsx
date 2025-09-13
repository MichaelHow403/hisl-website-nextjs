"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DeployPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    sector: "",
    useCase: "",
    dataClass: "demo",
    riskLevel: "low",
    complianceReqs: [] as string[],
    agencyLevel: "draft_only" as "draft_only" | "review_window" | "guardrailed_auto"
  });

  const sectors = [
    "pharma", "construction", "agriculture", "conservation", 
    "environmental", "medical", "legal", "economics", "logistics"
  ];

  const handleSubmit = async () => {
    // This would normally submit to /api/broker/submit
    console.log("Deployment assessment:", formData);
    alert("Assessment submitted! You will receive deployment recommendations shortly.");
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
                <h1 className="text-xl font-bold text-gray-900">HISL Deploy</h1>
                <p className="text-xs text-gray-500">Orchestrator Intake Wizard</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/globe" className="text-gray-700 hover:text-blue-600">Globe</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              <Link href="/deploy" className="text-blue-600 font-medium">Deploy</Link>
              <Link href="/consent" className="text-gray-700 hover:text-blue-600">Consent</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Deploy HISL Orchestrator
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Configure your sovereign AI deployment with RAVEN orchestrator. 
              Complete the assessment to receive tailored deployment recommendations.
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3, 4].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 4 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <span className="text-sm text-gray-500">
                Step {step} of 4: {
                  step === 1 ? "Sector & Use Case" :
                  step === 2 ? "Data Classification" :
                  step === 3 ? "Risk & Compliance" :
                  "Agency & Deployment"
                }
              </span>
            </div>
          </div>

          {/* Form Steps */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sector & Use Case</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry Sector
                  </label>
                  <select
                    value={formData.sector}
                    onChange={(e) => setFormData({...formData, sector: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your sector</option>
                    {sectors.map(sector => (
                      <option key={sector} value={sector}>
                        {sector.charAt(0).toUpperCase() + sector.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Use Case
                  </label>
                  <textarea
                    value={formData.useCase}
                    onChange={(e) => setFormData({...formData, useCase: e.target.value})}
                    placeholder="Describe your primary AI use case, objectives, and expected outcomes..."
                    className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Classification</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data Classification Level
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: "demo", label: "Demo", desc: "Sample/synthetic data for testing" },
                      { value: "public", label: "Public", desc: "Publicly available information" },
                      { value: "user_provided", label: "User Provided", desc: "Data provided by users" },
                      { value: "internal", label: "Internal", desc: "Internal business data" },
                      { value: "secret", label: "Secret", desc: "Highly sensitive/classified data" }
                    ].map(option => (
                      <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="dataClass"
                          value={option.value}
                          checked={formData.dataClass === option.value}
                          onChange={(e) => setFormData({...formData, dataClass: e.target.value})}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk & Compliance</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Risk Level Assessment
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: "low", label: "Low Risk", desc: "Minimal impact if system fails" },
                      { value: "med", label: "Medium Risk", desc: "Moderate business impact" },
                      { value: "high", label: "High Risk", desc: "Critical business or safety impact" }
                    ].map(option => (
                      <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="riskLevel"
                          value={option.value}
                          checked={formData.riskLevel === option.value}
                          onChange={(e) => setFormData({...formData, riskLevel: e.target.value})}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compliance Requirements
                  </label>
                  <div className="space-y-2">
                    {["GDPR", "EU-AI-Act", "HIPAA", "SOX", "ISO-27001"].map(req => (
                      <label key={req} className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.complianceReqs.includes(req)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({...formData, complianceReqs: [...formData.complianceReqs, req]});
                            } else {
                              setFormData({...formData, complianceReqs: formData.complianceReqs.filter(r => r !== req)});
                            }
                          }}
                        />
                        <span className="text-gray-900">{req}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Agency & Deployment</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    AI Agency Level
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: "draft_only", label: "Draft Only", desc: "AI generates drafts requiring approval" },
                      { value: "review_window", label: "Review Window", desc: "12-hour review period before action" },
                      { value: "guardrailed_auto", label: "Guardrailed Auto", desc: "Immediate action within safety bounds" }
                    ].map(option => (
                      <label key={option.value} className="flex items-start space-x-3 cursor-pointer">
                        <input
                          type="radio"
                          name="agencyLevel"
                          value={option.value}
                          checked={formData.agencyLevel === option.value}
                          onChange={(e) => setFormData({...formData, agencyLevel: e.target.value as "draft_only" | "review_window" | "guardrailed_auto"})}
                          className="mt-1"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-500">{option.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Deployment Summary</h3>
                  <div className="space-y-2 text-sm text-blue-800">
                    <div><strong>Sector:</strong> {formData.sector || "Not selected"}</div>
                    <div><strong>Data Class:</strong> {formData.dataClass}</div>
                    <div><strong>Risk Level:</strong> {formData.riskLevel}</div>
                    <div><strong>Agency:</strong> {formData.agencyLevel.replace('_', ' ')}</div>
                    <div><strong>Compliance:</strong> {formData.complianceReqs.join(", ") || "None selected"}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {step < 4 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={step === 1 && (!formData.sector || !formData.useCase)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Submit Assessment
                </button>
              )}
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/raven_huginn.png"
                  alt="RAVEN"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <h3 className="font-semibold text-gray-900">RAVEN Orchestrator</h3>
              </div>
              <p className="text-sm text-gray-600">
                Sovereign on-premises AI orchestration with full data control and compliance.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/AI_DNA.png"
                  alt="Security"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <h3 className="font-semibold text-gray-900">Security First</h3>
              </div>
              <p className="text-sm text-gray-600">
                End-to-end encryption, zero-trust architecture, and comprehensive audit trails.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/reach_for_the_stars.png"
                  alt="Compliance"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <h3 className="font-semibold text-gray-900">Compliance Ready</h3>
              </div>
              <p className="text-sm text-gray-600">
                Built-in GDPR, EU AI Act, and industry-specific compliance frameworks.
              </p>
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
              <span className="text-gray-300">HISL Deployment Center</span>
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
