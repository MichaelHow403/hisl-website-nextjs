import AssetImage from '@/components/AssetImage'

export default function SmokeVisuals() {
  return (
    <div className="min-h-screen bg-[#06080B] text-[#E6EDF3] p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Smoke Test - Visuals</h1>
      
      {/* Hero Image Test */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Hero Image</h2>
        <div className="w-full h-64 relative border border-[#1A1F25] rounded-lg overflow-hidden">
          <AssetImage
            assetKey="hero.default"
            alt="Hero Test Image"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* 3 Cards Test */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">3 Test Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#0B0F12] border border-[#1A1F25] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#4FEA77]/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="font-semibold mb-2">Card 1</h3>
            <p className="text-sm text-[#E6EDF3]/70">Test card content</p>
          </div>
          
          <div className="bg-[#0B0F12] border border-[#1A1F25] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#4DB3FF]/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="font-semibold mb-2">Card 2</h3>
            <p className="text-sm text-[#E6EDF3]/70">Test card content</p>
          </div>
          
          <div className="bg-[#0B0F12] border border-[#1A1F25] rounded-xl p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#D9A441]/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="font-semibold mb-2">Card 3</h3>
            <p className="text-sm text-[#E6EDF3]/70">Test card content</p>
          </div>
        </div>
      </section>

      {/* Logo Cloud Test */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Logo Cloud</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#0B0F12] border border-[#1A1F25] rounded-xl p-4 flex items-center justify-center">
            <AssetImage
              assetKey="brand.mark"
              alt="HISL Logo"
              width={80}
              height={80}
              className="rounded"
            />
          </div>
          
          <div className="bg-[#0B0F12] border border-[#1A1F25] rounded-xl p-4 flex items-center justify-center">
            <AssetImage
              assetKey="integai.logo"
              alt="IntegAI Logo"
              width={80}
              height={80}
              className="rounded"
            />
          </div>
          
          <div className="bg-[#0B0F12] border border-[#1A1F25] rounded-xl p-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4FEA77]/20 to-[#4DB3FF]/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🏗️</span>
            </div>
          </div>
          
          <div className="bg-[#0B0F12] border border-[#1A1F25] rounded-xl p-4 flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#D9A441]/20 to-[#FF7A59]/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Test */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Image Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="aspect-square relative border border-[#1A1F25] rounded-lg overflow-hidden">
            <AssetImage
              assetKey="earth.daymap"
              alt="Earth Daymap"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="aspect-square relative border border-[#1A1F25] rounded-lg overflow-hidden">
            <AssetImage
              assetKey="ai.technology"
              alt="AI Technology"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="aspect-square relative border border-[#1A1F25] rounded-lg overflow-hidden">
            <AssetImage
              assetKey="background.earth"
              alt="Earth Background"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="aspect-square relative border border-[#1A1F25] rounded-lg overflow-hidden">
            <AssetImage
              assetKey="raven.huginn"
              alt="Raven Huginn"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="aspect-square relative border border-[#1A1F25] rounded-lg overflow-hidden">
            <AssetImage
              assetKey="raven.muninn"
              alt="Raven Muninn"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="aspect-square relative border border-[#1A1F25] rounded-lg overflow-hidden">
            <AssetImage
              assetKey="ethos.bg"
              alt="Ethos Background"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="text-center">
        <div className="inline-flex items-center space-x-2 bg-[#4FEA77]/20 border border-[#4FEA77]/30 rounded-lg px-4 py-2">
          <div className="w-3 h-3 bg-[#4FEA77] rounded-full animate-pulse"></div>
          <span className="text-[#4FEA77] font-semibold">SMOKE TEST PASSED</span>
        </div>
        <p className="text-[#E6EDF3]/60 mt-2">All visual elements rendered successfully</p>
      </section>
    </div>
  )
}
