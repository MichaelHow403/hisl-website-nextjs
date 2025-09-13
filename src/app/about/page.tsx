import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
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
              <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
              <Link href="/globe" className="text-gray-700 hover:text-blue-600">Globe</Link>
              <Link href="/about" className="text-blue-600 font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
              <Link href="/deploy" className="text-gray-700 hover:text-blue-600">Deploy</Link>
              <Link href="/consent" className="text-gray-700 hover:text-blue-600">Consent</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About HISL
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Human Intelligence Systems Laboratory - Pioneering the future of sovereign AI 
              with ethical, transparent, and human-centered artificial intelligence systems.
            </p>
          </div>

          <div className="space-y-16">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                To advance the frontiers of artificial intelligence through sovereign, ethical, 
                and human-centered research and development. We believe AI should augment human 
                intelligence while preserving privacy, autonomy, and democratic values.
              </p>
            </div>

            {/* Values */}
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <Image
                  src="/images/raven_huginn.png"
                  alt="Sovereignty"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sovereignty</h3>
                <p className="text-gray-600">
                  Full control over AI systems and data, ensuring independence from external dependencies.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <Image
                  src="/images/AI_DNA.png"
                  alt="Ethics"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Ethics</h3>
                <p className="text-gray-600">
                  Transparent, accountable AI systems that respect human rights and democratic principles.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg text-center">
                <Image
                  src="/images/reach_for_the_stars.png"
                  alt="Innovation"
                  width={64}
                  height={64}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  Pushing the boundaries of AI research while maintaining safety and reliability.
                </p>
              </div>
            </div>

            {/* Team */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Leadership Team</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-center">
                  <Image
                    src="/images/michael_howard.png"
                    alt="Michael Howard"
                    width={120}
                    height={120}
                    className="mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">Michael Howard</h3>
                  <p className="text-blue-600 mb-2">Founder & Chief AI Officer</p>
                  <p className="text-gray-600 text-sm">
                    Leading AI research and development with focus on sovereign intelligence systems.
                  </p>
                </div>
                <div className="text-center">
                  <Image
                    src="/images/IngegAI Logo.png"
                    alt="IntegAI"
                    width={120}
                    height={120}
                    className="mx-auto rounded-full mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">IntegAI Partnership</h3>
                  <p className="text-blue-600 mb-2">Strategic Technology Alliance</p>
                  <p className="text-gray-600 text-sm">
                    Collaborative partnership advancing integrated AI solutions and research.
                  </p>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Technology</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">RAVEN Orchestrator</h3>
                  <p className="text-gray-600 mb-4">
                    Our flagship sovereign AI orchestration platform that enables on-premises 
                    deployment with full data control and compliance.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Zero third-party dependencies</li>
                    <li>• End-to-end encryption</li>
                    <li>• Comprehensive audit trails</li>
                    <li>• Multi-model orchestration</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Compliance Framework</h3>
                  <p className="text-gray-600 mb-4">
                    Built-in compliance with major regulations and industry standards 
                    for enterprise and government deployment.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• GDPR compliance</li>
                    <li>• EU AI Act ready</li>
                    <li>• Industry-specific standards</li>
                    <li>• Automated compliance reporting</li>
                  </ul>
                </div>
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
              <span className="text-gray-300">HISL - Human Intelligence Systems Laboratory</span>
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
