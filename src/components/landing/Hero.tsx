"use client";

// From offers-meta-agent.md Section 1: Hero
// Headline: "Audit-Ready Compliance In 14 Days Or We Work For Free Until You Are"
// Subhead: "The $3.5M Penalty Shield: Australia's Only Automated ASIC Intelligence Platform Monitoring 84,000+ Entities In Real-Time"

import { TypingText } from "@/components/ui/typing-text";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />

      <div className="relative max-w-6xl mx-auto px-4 py-24 text-center space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-sm">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="font-medium">Australia's Only Automated ASIC Intelligence Platform</span>
        </div>

        {/* Headline with typing at the xxx spot */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-5xl mx-auto">
          Audit-Ready Compliance For <span className="sr-only">AFSL Licence Type </span>
          <span className="text-blue-500">
            <TypingText
              words={[
                "Wholesale Advisory",
                "Retail Advisory",
                "Managed Investment Scheme",
                "Market Making",
                "Custodial/Depository Services",
              ]}
              typingSpeed={90}
              deletingSpeed={60}
              pauseBetween={1600}
            />
          </span>{" "}
          In 14 Days Or We Work For Free Until You Are
        </h1>

        {/* Subhead */}
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
          The $3.5M Penalty Shield: Australia's Only Automated ASIC Intelligence Platform Monitoring 84,000+ Entities In Real-Time
        </p>

        {/* Removed separate typing line; now part of the headline */}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <a href="#pricing" className={buttonClasses({ variant: "default", size: "lg" })}>
            Claim Your Sprint Spot (12 Available)
          </a>
          <a href="#calculator" className={buttonClasses({ variant: "outline", size: "lg" })}>
            Calculate Penalty Risk (Free)
          </a>
        </div>

        {/* Trust badges */}
        <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>84,000+ Entities Monitored</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>60-Second Real-Time Alerts</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>14-Day Delivery Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
import { buttonClasses } from "@/components/ui/button";
