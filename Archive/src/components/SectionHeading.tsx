'use client'

import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
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
  )
}
