import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import { getImageSrc, getRandomImage } from '@/app/lib/imagery';

async function getSitePoem() {
  const filePath = path.join(process.cwd(), 'content', 'site-poem.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    frontmatter: data,
    content
  };
}

export default async function PoemPage() {
  const { frontmatter, content } = await getSitePoem();
  const backgroundImage = getImageSrc('starfields', 'reach_for_the_stars', 2400) || 
                         getRandomImage('starfields')?.src ||
                         '/images/reach_for_the_stars.png';

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                {frontmatter.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                {frontmatter.summary}
              </p>
              <div className="text-sm text-gray-400 mt-4">
                Last updated: {new Date(frontmatter.updated).toLocaleDateString()}
              </div>
            </div>

            {/* Poem Content */}
            <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-white/20">
              <div className="prose prose-invert prose-lg max-w-none text-center">
                <MDXRemote source={content} />
              </div>
            </div>

            {/* Floating Elements */}
            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">🌟</span>
                  The Vision
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  This poem captures the essence of HISL's mission: creating a global network 
                  of sovereign intelligence that serves humanity while preserving individual 
                  autonomy and dignity.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <span className="mr-3">🔮</span>
                  The Future
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Where your prompts go, dreams follow. Each query sent through our network 
                  is a step toward a future where technology truly serves the human spirit.
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="mt-12 flex justify-center space-x-6">
              <a
                href="/about/michael"
                className="bg-blue-600/80 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Meet the Founder
              </a>
              <a
                href="/about/integai"
                className="bg-purple-600/80 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Discover IntegAI
              </a>
              <a
                href="/globe"
                className="bg-green-600/80 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm"
              >
                Explore the Network
              </a>
            </div>

            {/* Quote */}
            <div className="mt-16 text-center">
              <blockquote className="text-2xl md:text-3xl font-light text-white/90 italic">
                &quot;In every packet, every byte,<br />
                Lives the promise of what&apos;s right&quot;
              </blockquote>
              <cite className="text-gray-400 text-sm mt-4 block">
                — From "The Digital Constellation"
              </cite>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const { frontmatter } = await getSitePoem();
  
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
  };
}
