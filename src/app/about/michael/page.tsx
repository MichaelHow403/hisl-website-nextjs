import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import Image from 'next/image';
import { getImageSrc } from '@/app/lib/imagery';

async function getMichaelBio() {
  const filePath = path.join(process.cwd(), 'content', 'michael-bio.mdx');
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  
  return {
    frontmatter: data,
    content
  };
}

export default async function MichaelPage() {
  const { frontmatter, content } = await getMichaelBio();
  const profileImage = getImageSrc('processed', 'michael_howard', 400);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-black">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="mb-8">
              {profileImage && (
                <Image
                  src={profileImage}
                  alt="Michael Howard"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto border-4 border-gold-500 shadow-2xl"
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

          {/* Navigation */}
          <div className="mt-12 flex justify-center space-x-6">
            <a
              href="/about/integai"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Learn about IntegAI
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
              Explore the Globe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata() {
  const { frontmatter } = await getMichaelBio();
  
  return {
    title: frontmatter.title,
    description: frontmatter.summary,
  };
}
