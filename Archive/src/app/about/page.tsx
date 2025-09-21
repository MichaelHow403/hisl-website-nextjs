import { allBios } from 'contentlayer/generated'
import { MDXClient } from '@/lib/mdx'
import Image from 'next/image'
import { notFound } from 'next/navigation'

export default function About() {
  if (!allBios.length) {
    notFound()
  }

  return (
    <main id="main-content" className="min-h-screen py-16 px-4 bg-surface">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
          About HISL
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {allBios.map((bio) => (
            <div key={bio._id} className="bg-background p-8 rounded-lg shadow-lg">
              {bio.image && (
                <div className="mb-6">
                  <Image
                    src={bio.image}
                    alt={bio.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto"
                  />
                </div>
              )}
              
              <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                {bio.name}
              </h2>
              
              {bio.role && (
                <p className="text-gold text-center mb-6">
                  {bio.role}
                </p>
              )}
              
              <div className="prose prose-invert max-w-none">
                <MDXClient code={bio.body.code} />
              </div>
              
              {bio.updated && (
                <p className="text-sm text-gray-400 mt-6">
                  Last updated: {new Date(bio.updated).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Our Ethos
          </h2>
          <p className="text-xl text-foreground max-w-4xl mx-auto">
            At HISL, we believe in building AI systems that respect human sovereignty, 
            protect data privacy, and operate with complete transparency. Our IntegAI 
            platform represents a fundamental shift from centralized AI models to 
            sovereign, human-aligned intelligence.
          </p>
        </div>
      </div>
    </main>
  )
}
