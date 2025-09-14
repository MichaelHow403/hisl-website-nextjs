import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import Image from 'next/image';
import { getImageSrc } from '@/app/lib/imagery';

async function getIntegAIBio() {
  const filePath = path.join(process.cwd(), 'content', 'integai-bio.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    frontmatter: data,
    content
  };
}

export default async function IntegAIPage() {
  const { frontmatter, content } = await getIntegAIBio();
  const logoImage = getImageSrc('processed', 'IngegAI Logo', 300);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              {logoImage && (
                <Image
                  src={logoImage}
                  alt="IntegAI Logo"
                  width={200}
                  height={200}
                  className="mx-auto drop-shadow-2xl"
                />
              )}
            </div>
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

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <div className="prose prose-invert prose-lg max-w-none">
              <MDXRemote source={content} />
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="text-3xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-2">Intelligent Analysis</h3>
              <p className="text-gray-300 text-sm">
                Advanced pattern recognition and multi-dimensional problem solving
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="text-3xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-white mb-2">Human Collaboration</h3>
              <p className="text-gray-300 text-sm">
                Seamless integration with human workflows and decision-making
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold text-white mb-2">Privacy First</h3>
              <p className="text-gray-300 text-sm">
                Complete user control over data and processing sovereignty
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex justify-center space-x-6">
            <a
              href="/about/michael"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Meet Michael Howard
            </a>
            <a
              href="/poem"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Read the Vision
            </a>
            <a
              href="/globe"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Try the Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const { frontmatter } = await getIntegAIBio();
  
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
  };
}
