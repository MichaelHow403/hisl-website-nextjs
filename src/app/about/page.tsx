// Temporarily disabled for build - contentlayer2/generated not available
export const metadata = {
  title: 'About · HISL',
  description: 'Biographies and mission for HISL and IntegAI.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-tight">About</h1>
      <p className="mt-2 text-[#bcd0f7]">
        People and platform behind HISL&rsquo;s sovereign AI mission.
      </p>
      <div className="mt-8 p-6 bg-[#0B0F12] border border-[#1A1F25] rounded-xl">
        <p className="text-[#E6EDF3]/70">About page content will be available after contentlayer build completes.</p>
      </div>
    </main>
  );
}
