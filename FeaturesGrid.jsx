import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const FEATURES = [
  { name: "ComplianceGuard", blurb: "GDPR & NIS2 monitoring with human-readable flags and evidence.", badge: "Active" },
  { name: "DataSovereign", blurb: "Local-first processing. Keep data in-region by default.", badge: "Active" },
  { name: "PrivacyShield", blurb: "End-to-end encryption patterns for agent traffic.", badge: "Standby" },
  { name: "AuditTrail", blurb: "Immutable logs with prompt/response hashing and run IDs.", badge: "Active" },
  { name: "EthicsCore", blurb: "Human-aligned guardrails and escalation paths.", badge: "In Build" },
  { name: "SecureComms", blurb: "Hardened agent-to-agent channels and policy enforcement.", badge: "Standby" },
  { name: "DocuGenie", blurb: "On-prem document intelligence for real project files.", badge: "Active" },
  { name: "BuildLens", blurb: "Construction ops insight: RAMS, handover, briefings.", badge: "Active" },
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
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <motion.article
              key={f.name}
              className="rounded-xl border border-edge bg-panel p-4 shadow-glow hover:shadow-[0_0_52px_rgba(57,215,201,.12)] transition will-change-transform"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .45, delay: i * 0.03 }}
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
