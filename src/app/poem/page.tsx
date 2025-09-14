"use client";
import Link from "next/link";

export default function PoemPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-amber-50 font-sans relative overflow-hidden">
      {/* Industrial Starfield Background */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-slate-900 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent"></div>
        {/* Industrial starfield with eco-nodes */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(2px 2px at 20px 30px, #F2D08A, transparent),
                           radial-gradient(2px 2px at 40px 70px, rgba(242, 208, 138, 0.4), transparent),
                           radial-gradient(1px 1px at 90px 40px, #D9A441, transparent),
                           radial-gradient(1px 1px at 130px 80px, #4FEA77, transparent),
                           radial-gradient(2px 2px at 160px 30px, rgba(217, 164, 65, 0.3), transparent)`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 100px'
        }}></div>
        
        {/* Industrial texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(30deg, #F2D08A 0%, #D9A441 100%)`,
          mixBlendMode: 'overlay'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative border-b border-amber-400/20 bg-slate-900/80 backdrop-blur-xl shadow-lg shadow-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse shadow-sm shadow-amber-400/50"></div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent">
                  HISL
                </h1>
                <p className="text-xs text-amber-300/70 font-medium tracking-wide">INDUSTRIAL INTELLIGENCE</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-slate-300 hover:text-amber-300 font-medium transition-colors">
                HOME
              </Link>
              <Link href="/projects" className="text-slate-300 hover:text-amber-300 font-medium transition-colors">
                PROJECTS
              </Link>
              <Link href="/knowledge" className="text-slate-300 hover:text-amber-300 font-medium transition-colors">
                KNOWLEDGE
              </Link>
              <Link href="/strategy-live" className="text-slate-300 hover:text-amber-300 font-medium transition-colors">
                STRATEGY LIVE
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Poem Content */}
      <main className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-3 bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-xl px-6 py-3 mb-8 shadow-lg shadow-amber-900/20">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50"></div>
              <span className="text-amber-300 font-semibold text-lg tracking-wide">INDUSTRIAL VERSE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent mb-6 tracking-wider leading-tight">
              The Craft of Excellence
            </h1>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-amber-400/20 rounded-2xl p-12 shadow-2xl shadow-amber-900/10">
            <div className="prose prose-xl max-w-none text-center">
              <blockquote className="text-2xl md:text-3xl leading-relaxed font-light text-amber-100 italic border-none">
                <p className="mb-6">
                  &ldquo;THEN PROVE WE NOW WITH BEST ENDEVOUR,<br />
                  WHAT FROM OUR EFFORTS YET MY SPRING,<br />
                  HE JUSTLY IS DISPISED WHO NEVER;<br />
                  DID THOUGHT TO AIDE HIS LABOURS BRING,
                </p>
                <p className="mb-0">
                  FOR THIS IS ARTS TRUE INDICATION;<br />
                  WHEN SKILL IS MINISTER TO THOUGHT,<br />
                  WHEN TYPES THAT ARE THE MINDS CREATION —<br />
                  THE HAND TO PERFECT FORM HAS WROUGHT&rdquo;
                </p>
              </blockquote>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-emerald-400/20 rounded-xl p-6 inline-block">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-emerald-300 text-sm font-semibold">CRAFT & CREATION</span>
              </div>
              <p className="text-slate-400 text-sm">
                Where industrial intelligence meets human endeavour
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-amber-400/20 bg-slate-950/90 backdrop-blur-xl py-12 shadow-2xl shadow-amber-900/5 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse shadow-sm shadow-amber-400/50"></div>
              <div>
                <h3 className="text-lg font-semibold text-amber-400">HISL</h3>
                <p className="text-sm text-amber-300/70">INDUSTRIAL INTELLIGENCE</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 text-xs">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse shadow-sm shadow-teal-400/50"></div>
              <span className="text-amber-300">STATUS: OPERATIONAL</span>
            </div>
          </div>
          
          <div className="border-t border-amber-400/20 mt-8 pt-8 text-center">
            <p className="text-amber-100/60 text-sm font-mono">
              © 2024 HISL - HUMAN INTELLIGENCE SYSTEMS LABORATORY - ALL SYSTEMS OPERATIONAL
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
