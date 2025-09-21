import { allSections } from 'contentlayer/generated'
import { MDXClient } from '@/lib/mdx'
import { notFound } from 'next/navigation'
import GlobeSection from '@/components/GlobeSection'

export default function Home() {
  // Sort sections by order (from filename prefix)
  const sortedSections = allSections.sort((a, b) => a.order - b.order)

  if (!sortedSections.length) {
    notFound()
  }

  return (
    <main id="main-content" className="min-h-screen">
      {sortedSections.map((section, index) => (
        <section
          key={section._id}
          className={`py-16 px-4 ${index % 2 === 0 ? 'bg-surface' : 'bg-background'}`}
        >
          <div className="max-w-6xl mx-auto">
            {section.kicker && (
              <p className="text-gold text-sm uppercase tracking-wider mb-2">
                {section.kicker}
              </p>
            )}
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {section.title}
            </h2>

            <div className="prose prose-invert prose-lg max-w-none">
              <MDXClient code={section.body.code} />
            </div>

            {/* Special handling for globe teaser section */}
            {section._raw.flattenedPath.includes('05-globe-teaser') && (
              <div className="mt-8">
                <GlobeSection />
              </div>
            )}

            {section.ctaLabel && section.ctaHref && (
              <div className="mt-8">
                <a
                  href={section.ctaHref}
                  className="inline-flex items-center px-6 py-3 bg-gold text-background font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  {section.ctaLabel}
                </a>
              </div>
            )}
          </div>
        </section>
      ))}
    </main>
  )
}
