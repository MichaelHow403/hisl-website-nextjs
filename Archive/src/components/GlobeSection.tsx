'use client'

import dynamic from 'next/dynamic'

const InteractiveGlobe = dynamic(
  () => import('@/components/globe/InteractiveGlobe'),
  {
    ssr: false,
    loading: () => <div className="w-full h-64 bg-gray-800 animate-pulse rounded-lg" />
  }
)

export default function GlobeSection() {
  return (
    <div className="mt-8">
      <InteractiveGlobe />
    </div>
  )
}
