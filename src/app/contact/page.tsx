import Image from "next/image";
import Link from "next/link";

export default function ContactPage() {
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
              <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
              <Link href="/contact" className="text-blue-600 font-medium">Contact</Link>
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
              Contact HISL
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get in touch with our team for partnerships, research collaboration, 
              or to learn more about sovereign AI deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p className="text-gray-600">contact@hisl.ai</p>
                      <p className="text-sm text-gray-500">General inquiries and partnerships</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Research Collaboration</h3>
                      <p className="text-gray-600">research@hisl.ai</p>
                      <p className="text-sm text-gray-500">Academic partnerships and joint research</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Enterprise Solutions</h3>
                      <p className="text-gray-600">enterprise@hisl.ai</p>
                      <p className="text-sm text-gray-500">Custom deployments and enterprise support</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Office Locations</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900">European Headquarters</h3>
                    <p className="text-gray-600">Dublin, Ireland</p>
                    <p className="text-sm text-gray-500">EU operations and compliance center</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900">Research Center</h3>
                    <p className="text-gray-600">Remote-first global team</p>
                    <p className="text-sm text-gray-500">Distributed research and development</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your organization or company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Select a subject</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="research">Research Collaboration</option>
                    <option value="enterprise">Enterprise Solutions</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your project, research interests, or how we can help..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Image
                  src="/images/AI_DNA.png"
                  alt="Documentation"
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Technical documentation and API references
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Docs →
                </a>
              </div>

              <div className="text-center">
                <Image
                  src="/images/raven_huginn.png"
                  alt="Community"
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Join our research community and discussions
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Join Community →
                </a>
              </div>

              <div className="text-center">
                <Image
                  src="/images/reach_for_the_stars.png"
                  alt="Newsletter"
                  width={48}
                  height={48}
                  className="mx-auto mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">Newsletter</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Stay updated with our latest research and developments
                </p>
                <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Subscribe →
                </a>
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
