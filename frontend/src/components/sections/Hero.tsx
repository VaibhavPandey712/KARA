'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Sparkles, Bot, ArrowRightCircle, Handshake } from 'lucide-react'
import { handleAuditClick as goToAudit } from '@/lib/onboarding'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BrandCollabForm from './BrandCollabForm'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Hero() {
  const router = useRouter()
  const [showCollabForm, setShowCollabForm] = useState(false)

  const handleAuditClick = () => goToAudit(router)

  const handleCollabClick = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session?.user) {
      router.push('/auth')
      return
    }
    setShowCollabForm(true)
  }

  return (
    <div className="hero" id="home">
      {/* Background Video */}
      <video
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4"
      />

      {/* Content */}
      <div className="hero__content-wrap">
        <div className="hero__content">
          {/* Heading */}
          <motion.h1
            className="hero__heading"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <Zap className="hero__heading-icon" size={24} />{' '}
            Your AI-Powered{' '}
            <Sparkles className="hero__heading-icon" size={24} />{' '}
            Content Team{' '}
            <Bot className="hero__heading-icon" size={24} />
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="hero__subtext"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            KARA is the operating system for the creator economy. We help creators
            manage, repurpose, distribute, and grow their content across all major
            platforms automatically. Create once, AI handles the rest.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            className="hero__cta-group"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <button className="hero__cta" onClick={handleAuditClick}>
              <span>Book a Free Creator Audit</span>
              <ArrowRightCircle className="hero__cta-icon" size={20} />
            </button>

            <button className="hero__cta-secondary" onClick={handleCollabClick}>
              <Handshake size={18} strokeWidth={1.8} />
              <span>Get Brand Collaborations</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Brand Collab Modal */}
      <BrandCollabForm
        isOpen={showCollabForm}
        onClose={() => setShowCollabForm(false)}
      />
    </div>
  )
}
