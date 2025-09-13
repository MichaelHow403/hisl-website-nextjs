// ============================================================================
// HISL Website - Complete Next.js Component Implementation
// ============================================================================

// 1. Main Homepage (src/app/page.tsx)
// ============================================================================
"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Hero from '@/components/Hero';
import CapabilitiesSection from '@/components/CapabilitiesSection';
import FeaturesGrid from '@/components/FeaturesGrid';
import PoemBlock from '@/components/PoemBlock';
import ChatPreview from '@/components/ChatPreview';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="relative">
      <Hero />
      <CapabilitiesSection />
      <FeaturesGrid />
      <PoemBlock />
      <ChatPreview />
      <Footer />
    </main>
  );
}

// ============================================================================
// 2. Hero Component (src/components/Hero.tsx)
// ============================================================================
"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import MiniGlobe from './MiniGlobe';

export default function Hero() {
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 300], [0, -6]);

  const scrollToChat = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[88vh] overflow-hidden border-b border-white/5">
      {/* Background layers */}
      <div className="hero-bg">
        <motion.div
          className="hero-dna"
          style={{ y: parallax }}
          aria-hidden
        />
        <div className="hero-vignette" aria-hidden />
      </div>

      {/* Content */}
      <div className="container-wrap relative z-10 grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center py-24">
        <div>
          <motion.h1
            className="text-[clamp(40px,6vw,80px)] font-semibold tracking-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            AI + Human... <span className="text-gold">with soul.</span>
          </motion.h1>
          
          <motion.p
            className="mt-3 text-muted max-w-[52ch] text-[18px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Sovereign AI agents that respect your data, privacy, and humanity.
          </motion.p>

          <motion.div
            className="mt-6 flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            <button onClick={scrollToChat} className="btn btn-gold">
              Start a Demo
            </button>
            <Link href="/globe" className="btn btn-ghost">
              Explore the Globe
            </Link>
          </motion.div>
        </div>

        {/* Mini globe teaser */}
        <div className="relative">
          <div className="rounded-2xl border border-edge/60 bg-panel/60 p-3">
            <MiniGlobe height={320} />
          </div>
          <div className="mt-2 text-xs text-[#8fb3ff]">
            Real-time sovereignty visualizer · ravens in orbit
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 3. MiniGlobe Component (src/components/MiniGlobe.tsx)
// ============================================================================
"use client";

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface MiniGlobeProps {
  height?: number;
}

export default function MiniGlobe({ height = 300 }: MiniGlobeProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, height);
    mount.appendChild(renderer.domElement);

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, mount.clientWidth / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // Lighting
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(5, 3, 5);
    scene.add(key);

    const fill = new THREE.AmbientLight(0x88aaff, 0.5);
    scene.add(fill);

    const rim = new THREE.DirectionalLight(0x88d0ff, 0.8);
    rim.position.set(-6, -2, -4);
    scene.add(rim);

    // Textures
    const loader = new THREE.TextureLoader();
    const texDay = loader.load('/assets/earth_daymap.jpg');
    const texNight = loader.load('/assets/earth_nightmap.jpg');
    const texClouds = loader.load('/assets/earth_clouds.jpg');

    texDay.colorSpace = THREE.SRGBColorSpace;
    texNight.colorSpace = THREE.SRGBColorSpace;
    texClouds.colorSpace = THREE.SRGBColorSpace;

    // Earth
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const geo = new THREE.SphereGeometry(2, 64, 64);
    const mat = new THREE.MeshPhongMaterial({
      map: texDay,
      emissiveMap: texNight,
      emissive: new THREE.Color(0xffffff),
      emissiveIntensity: 0.35,
      shininess: 5,
      specular: new THREE.Color(0x111111),
    });

    const earth = new THREE.Mesh(geo, mat);
    globeGroup.add(earth);

    // Clouds
    const cloudGeo = new THREE.SphereGeometry(2.02, 64, 64);
    const cloudMat = new THREE.MeshLambertMaterial({
      map: texClouds,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
    });

    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    globeGroup.add(clouds);

    // Atmosphere
    const atmoGeo = new THREE.SphereGeometry(2.1, 64, 64);
    const atmoMat = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0);
          gl_FragColor = vec4(0.5, 0.75, 1.0, 1.0) * intensity;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmo);

    // Raven sprites
    const ravenTex1 = loader.load('/images/raven_huginn.png');
    const ravenTex2 = loader.load('/images/raven_muninn.png');

    const makeRaven = (tex: THREE.Texture, size = 0.35) => {
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(size, size, 1);
      return sprite;
    };

    const raven1 = makeRaven(ravenTex1, 0.38);
    const raven2 = makeRaven(ravenTex2, 0.34);
    scene.add(raven1, raven2);

    // Animation
    let t = 0;
    const R1 = 3.1, R2 = 2.9;
    const inc1 = 22 * Math.PI / 180;
    const inc2 = -38 * Math.PI / 180;

    const animate = () => {
      t += 0.008;
      earth.rotation.y += 0.0016;
      clouds.rotation.y += 0.0019;

      // Raven 1 orbit
      const a1 = t * 0.85;
      const x1 = R1 * Math.cos(a1);
      const y1 = R1 * Math.sin(a1) * Math.sin(inc1);
      const z1 = R1 * Math.sin(a1) * Math.cos(inc1);
      raven1.position.set(x1, y1, z1);
      raven1.lookAt(camera.position);

      // Raven 2 orbit
      const a2 = t * 1.15 + Math.PI / 3;
      const x2 = R2 * Math.cos(a2);
      const y2 = R2 * Math.sin(a2) * Math.sin(inc2);
      const z2 = R2 * Math.sin(a2) * Math.cos(inc2);
      raven2.position.set(x2, y2, z2);
      raven2.lookAt(camera.position);

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [height]);

  return <div ref={mountRef} style={{ width: '100%', height }} />;
}

// ============================================================================
// 4. Capabilities Section (src/components/CapabilitiesSection.tsx)
// ============================================================================
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';
import MiniGlobe from './MiniGlobe';

const capabilities = [
  "On-prem & air-gap-ready orchestration",
  "Local-first (EU sovereignty)",
  "Auditable by design (immutable logs)",
  "GDPR / NIS2 aligned",
  "Why Ravens: truth-seeking memory & foresight"
];

export default function CapabilitiesSection() {
  return (
    <section className="py-20">
      <div className="container-wrap">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] items-center">
          <div>
            <SectionHeading
              eyebrow="Capabilities"
              title="Built for sovereignty. Designed for trust."
              subtitle="AI agents that respect your data boundaries and operate with full transparency."
            />
            
            <div className="mt-8 space-y-4">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-teal mt-2 flex-shrink-0" />
                  <p className="text-[16px] text-[#d4e2ff]">{cap}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl border border-edge bg-panel p-4">
              <MiniGlobe height={280} />
            </div>
            <div className="mt-2 text-xs text-muted text-center">
              MiniGlobe: small rotating sphere · gold accents
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 5. Features Grid (src/components/FeaturesGrid.tsx)
// ============================================================================
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const FEATURES = [
  {
    name: "ComplianceGuard",
    blurb: "GDPR & NIS2 compliance monitoring with human-readable flags and evidence.",
    badge: "Active"
  },
  {
    name: "DataSovereign", 
    blurb: "Local-first processing. Keep data in-region by default.",
    badge: "Active"
  },
  {
    name: "PrivacyShield",
    blurb: "End-to-end encryption patterns for agent traffic.",
    badge: "Standby"
  },
  {
    name: "AuditTrail",
    blurb: "Immutable logs with prompt/response hashing and run IDs.",
    badge: "Active"
  },
  {
    name: "EthicsCore",
    blurb: "Human-aligned guardrails and escalation paths.", 
    badge: "In Build"
  },
  {
    name: "SecureComms",
    blurb: "Hardened agent-to-agent channels and policy enforcement.",
    badge: "Standby"
  },
  {
    name: "DocuGenie",
    blurb: "On-prem document intelligence for real project files.",
    badge: "Active"
  },
  {
    name: "BuildLens", 
    blurb: "Construction ops insight: RAMS, handover, briefings.",
    badge: "Active"
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20">
      <div className="container-wrap">
        <SectionHeading
          eyebrow="Capabilities"
          title="Built for trust. Designed for action."
          subtitle="Agent-centric architecture with sovereignty by design — fast to demo, ready for audited pilots."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-12">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.name}
              className="rounded-xl border border-edge bg-panel p-4 hover:shadow-glow transition-all duration-300 will-change-transform"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.03 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[17px] font-semibold">{f.name}</h3>
                <span className="text-[11px] px-2 py-1 rounded-full border border-edge/70 text-muted">
                  {f.badge}
                </span>
              </div>
              <p className="mt-2 text-[14px] text-[#b7c7e6]">{f.blurb}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 6. Poem Block (src/components/PoemBlock.tsx) 
// ============================================================================
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

const poem = [
  "Then prove we now with best endeavour,",
  "what from our efforts yet may spring,",
  "he justly is despised who never,",
  "did thought to aid his labours bring;",
  "for this is Art's true indication,",
  "when skill is minister to thought,",
  "when types that are the mind's creation —",
  "the hand to perfect form has wrought."
];

export default function PoemBlock() {
  return (
    <section id="ethos" className="relative py-20 overflow-hidden">
      {/* Backdrop */}
      <div className="poem-backdrop" aria-hidden />
      
      <div className="container-wrap relative">
        <SectionHeading
          eyebrow="Why We Build"
          title="Engineering with human dignity. Precision without compromise."
          subtitle="The ethos that guides our craft — human thought first, AI as the instrument."
        />

        <motion.div
          className="relative rounded-2xl border border-edge bg-panel p-6 md:p-8 mt-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <blockquote className="font-spectral text-[16px] md:text-[18px] leading-relaxed text-[#dbe6ff]">
            {poem.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </blockquote>
          <div className="mt-3 text-[13px] text-[#93a6c8]">
            — Family verse, adapted
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ============================================================================
// 7. Chat Preview (src/components/ChatPreview.tsx)
// ============================================================================
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from './SectionHeading';

export default function ChatPreview() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [runInfo, setRunInfo] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      // Mock response for demo
      setTimeout(() => {
        const mockResponse = {
          runId: `run_${Date.now()}`,
          promptHash: `prompt_${Math.random().toString(36).substr(2, 9)}`,
          responseHash: `resp_${Math.random().toString(36).substr(2, 9)}`,
          text: "This is a simulated response from the IntegAI Sovereign Assistant. In production, this would connect to your local AI infrastructure while maintaining full audit trails and compliance monitoring.",
          tokens: Math.floor(Math.random() * 200) + 50,
          energy_wh: Math.round(Math.random() * 5 + 1),
          hops: ["Dublin, IE", "Frankfurt, DE"]
        };
        
        setResponse(mockResponse.text);
        setRunInfo(mockResponse);
        setLoading(false);
      }, 2000);
    } catch (error) {
      setResponse('Error: Connection failed');
      setLoading(false);
    }
  };

  return (
    <section id="chat" className="py-20">
      <div className="container-wrap">
        <SectionHeading
          eyebrow="Try It Now"
          title="Ask Our AI"
          subtitle="On-prem proxy, brand-aligned. Responses are logged with run IDs and hashes."
        />

        <div className="max-w-4xl mx-auto mt-12">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Input Panel */}
            <motion.div
              className="rounded-2xl border border-edge bg-panel p-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <form onSubmit={handleSubmit}>
                <label className="block text-[13px] mb-2 text-muted">
                  Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask about sovereign AI, data privacy, or compliance..."
                  rows={4}
                  className="w-full rounded-lg border border-edge bg-[#0f1828] text-[15px] p-3 outline-none focus:border-teal transition-colors resize-none"
                />
                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading || !prompt.trim()}
                    className="btn btn-gold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Running...' : 'Run Simulation'}
                  </button>
                  <span className="text-[12px] text-muted">
                    IntegAI Simulation Mode
                  </span>
                </div>
              </form>
            </motion.div>

            {/* Output Panel */}
            <motion.div
              className="rounded-2xl border border-edge bg-panel p-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[13px] text-muted mb-2">Output</div>
              <div className="min-h-[100px]">
                {loading ? (
                  <div className="flex items-center gap-2 text-teal">
                    <div className="w-2 h-2 rounded-full bg-teal animate-pulse" />
                    Processing...
                  </div>
                ) : response ? (
                  <div>
                    <pre className="text-[13px] whitespace-pre-wrap leading-relaxed text-[#d4e2ff] mb-4">
                      {response}
                    </pre>
                    
                    {runInfo && (
                      <div className="mt-4 p-3 rounded-lg bg-[#0a1018] border border-edge/50">
                        <div className="text-[12px] space-y-1 text-muted">
                          <div>runId: {runInfo.runId}</div>
                          <div>promptHash: {runInfo.promptHash}</div>
                          <div>responseHash: {runInfo.responseHash}</div>
                          <div>tokens: {runInfo.tokens}</div>
                          <div>energy: {runInfo.energy_wh} Wh (est.)</div>
                          <div>route: {runInfo.hops.join(' → ')}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-muted text-[13px]">
                    (response will appear here)
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// 8. Section Heading Utility (src/components/SectionHeading.tsx)
// ============================================================================
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <motion.div
          className="text-[13px] tracking-[0.18em] uppercase text-teal/80"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.div>
      )}
      
      <motion.h2
        className="text-[clamp(24px,3vw,40px)] font-semibold"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.05 }}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          className="text-muted max-w-[62ch] mt-1"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ============================================================================
// 9. Footer (src/components/Footer.tsx)
// ============================================================================
"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-edge/40 py-16">
      <div className="container-wrap">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-gold to-teal flex items-center justify-center">
              <span className="text-black font-bold text-sm">H</span>
            </div>
            <div>
              <div className="font-semibold">HISL</div>
              <div className="text-[13px] text-muted">Smart Solutions, Solid Foundations</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="https://hisl.substack.com"
              target="_blank"
              className="text-muted hover:text-text transition-colors text-sm"
            >
              Substack
            </Link>
            <Link
              href="https://linkedin.com/company/hisl"
              target="_blank" 
              className="text-muted hover:text-text transition-colors text-sm"
            >
              LinkedIn
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-edge/30 text-center text-[13px] text-muted">
          © 2025 Howard Integritas Solutions Ltd · Reg. No. 786214
        </div>
      </div>
    </footer>
  );
}
