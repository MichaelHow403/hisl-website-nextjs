import { allBios } from 'contentlayer/generated';
import { MDXClient } from '@/lib/mdx';
import Image from 'next/image';

export const metadata = {
  title: 'About · HISL',
  description: 'Biographies and mission for HISL and IntegAI.',
};

export default function AboutPage() {
  const bios = allBios?.slice().sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-tight">About</h1>
      <p className="mt-2 text-[#bcd0f7]">
        People and platform behind HISL&rsquo;s sovereign AI mission.
      </p>

      <div className="mt-8 space-y-12">
        {bios?.map((b) => (
          <section id={b.slug} key={b._id} className="rounded-2xl border border-[color:var(--edge)] bg-[color:var(--panel)] p-6">
            <header className="mb-3">
              <h2 className="text-[22px] font-semibold">{b.title}</h2>
              <p className="text-sm text-[#9fb2d8]">{b.summary}</p>
            </header>
            { b.image && (
              <Image src={b.image} alt={b.title} width={96} height={96} className="mb-4 w-24 h-24 rounded-full border border-[color:var(--edge)] object-cover" />
            )}
            <article className="prose prose-invert max-w-none">
              <MDXClient code={b.body.code} />
            </article>
          </section>
        ))}
      </div>
    </main>
  );
}
