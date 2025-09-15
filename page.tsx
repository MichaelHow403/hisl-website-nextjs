
'use client';
import dynamic from 'next/dynamic';

const MiniGlobe = dynamic(() => import('@/components/MiniGlobe'), { ssr: false });

export const metadata = {
  title: 'Explore the Globe · HISL',
  description: 'Visualize how IntegAI routes queries across sovereign infrastructure.',
};

export default function GlobePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-[clamp(28px,4vw,44px)] font-semibold tracking-tight">Explore the Globe</h1>
      <p className="mt-2 text-[#bcd0f7]">
        See how your AI queries travel through sovereign infrastructure. Data stays private, observable, and energy-aware.
      </p>

      <div className="mt-8 rounded-2xl border border-[color:var(--edge)] bg-[color:var(--panel)] p-4">
        <MiniGlobe />
      </div>
    </main>
  );
}
