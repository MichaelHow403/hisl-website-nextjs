import FeaturesGrid from '@/components/FeaturesGrid'
import InteractiveGlobe from '@/components/globe/InteractiveGlobe'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with Globe */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <InteractiveGlobe />
        </div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl font-bold mb-4 drop-shadow-lg">
            Howard Integritas Solutions
          </h1>
          <p className="text-xl mb-8 drop-shadow-md">
            AI-Powered Construction Management
          </p>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition">
            Start Demo
          </button>
        </div>
      </section>
      
      {/* Features Grid */}
      <FeaturesGrid />
    </main>
  )
}
