import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";

const poem = [
  "Then prove we now with best endeavour,",
  "What from our efforts yet may spring;",
  "He justly is despised who never",
  "Did thought to aid his labours bring;",
  "For this is Art’s true indication,",
  "When skill is minister to thought,",
  "When types that are the mind’s creations —",
  "The hand to perfect form has wrought."
];

export default function PoemBlock() {
  return (
    <section id="ethos" className="relative py-20 overflow-hidden">
      <div className="poem-backdrop" aria-hidden />
      <div className="container-wrap relative">
        <SectionHeading
          eyebrow="Why We Build"
          title="Engineering with human dignity. Precision without compromise."
          subtitle="The ethos that guides our craft — human thought first, AI as the instrument."
        />
        <motion.div
          className="relative rounded-2xl border border-edge bg-panel p-6 md:p-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .55 }}
        >
          <blockquote className="text-[16px] md:text-[18px] leading-relaxed text-[#dbe6ff]">
            {poem.map((line, idx) => (
              <div key={idx}>{line}</div>
            ))}
          </blockquote>
          <div className="mt-3 text-[13px] text-[#93a6c8]">— William Howard (adaptation)</div>
        </motion.div>
      </div>
    </section>
  );
}
