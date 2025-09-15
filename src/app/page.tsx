import { allSections } from "contentlayer/generated";
import { MDXClient } from "@/lib/mdx";

export const metadata = {
  title: "HISL — Sovereign AI on the ground",
  description: "HISL landing page driven by Contentlayer sections.",
};

function SectionCard({ s }: { s: { _id: string; title?: string; kicker?: string; body: { code: string }; ctaLabel?: string; ctaHref?: string } }) {
  return (
    <section className="relative py-12 border-b border-[color:var(--edge)]/50">
      <div className="container-wrap">
        {s.kicker ? <div className="text-[13px] tracking-[0.18em] uppercase text-[color:var(--teal)]/80">{s.kicker}</div> : null}
        {s.title ? <h2 className="mt-1 text-[clamp(24px,3vw,40px)] font-semibold">{s.title}</h2> : null}
        <article className="prose prose-invert max-w-none mt-3">
          <MDXClient code={s.body.code} />
        </article>
        {s.ctaLabel && s.ctaHref ? (
          <div className="mt-6">
            <a className="btn btn-gold" href={s.ctaHref}>{s.ctaLabel}</a>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function HomePage() {
  // Sort by filename prefix (e.g., 01-, 02- ... 99-)
  const sections = allSections
    .slice()
    .sort((a, b) => a._raw.sourceFileName.localeCompare(b._raw.sourceFileName));

  return (
    <main>
      {sections.map((s) => (
        <SectionCard key={s._id} s={s} />
      ))}
    </main>
  );
}
