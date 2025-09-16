import React from "react";
import "./styles/globals.css";

import Hero from "./components/Hero";
import FeaturesGrid from "./components/FeaturesGrid";
import PoemBlock from "./components/PoemBlock";

export default function App() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <PoemBlock />
      <section id="chat" className="container-wrap py-20">
        <h2 className="text-[clamp(24px,3vw,40px)] font-semibold mb-4">Ask Our AI</h2>
        <p className="text-muted mb-4">
          On-prem proxy, brand-aligned. Responses are logged with run IDs and hashes.
        </p>
        <div className="rounded-xl border border-edge bg-panel p-4">
          <div className="text-muted text-sm">
            (Chat UI placeholder — Manus will insert the working component.)
          </div>
        </div>
      </section>
    </>
  );
}
