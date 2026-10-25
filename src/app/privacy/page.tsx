import React from 'react';
import Link from 'next/link';
import { Shield, Lock, CheckCircle, ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#c5a880] hover:text-[#e0cca9] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <div className="space-y-4 border-b border-[#232332] pb-8">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#c5a880] uppercase tracking-wider">
          <Shield className="w-4 h-4" />
          Data Protection & Privacy Policy
        </div>
        <h1 className="serif-heading text-3xl sm:text-5xl text-[#faf8f5]">
          Privacy, Consent & Data Governance
        </h1>
        <p className="text-xs sm:text-sm text-[#9c978e]">
          Effective Date: October 2026 · Ministry Compliance & Subscriber Protection Notice
        </p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-[#dcd6cc] leading-relaxed">
        <section className="space-y-3">
          <h2 className="serif-heading text-2xl text-[#faf8f5]">1. Overview & Commitment</h2>
          <p>
            Evangelist Tolucci and The Ministry Team are committed to protecting the privacy, dignity, and integrity of every visitor, subscriber, and ministry partner. This policy explains how we collect, store, and utilize personal information gathered through this digital ministry platform in full adherence to the Nigeria Data Protection Act (NDPA) and applicable global data privacy regulations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="serif-heading text-2xl text-[#faf8f5]">2. Personal Information Collected</h2>
          <p>We collect only information willingly provided by you through our interactive touchpoints:</p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li><strong>Subscription Forms:</strong> Full name (optional), email address (required), and communication preferences (Daily Devotionals and/or Ministry Newsletter).</li>
            <li><strong>Ministry Invitations & Contact:</strong> Name, email address, telephone contact, organization/church name, proposed event dates, city/country location, and correspondence message.</li>
            <li><strong>Technical Analytics:</strong> Privacy-conscious, aggregated metrics such as browser type, general geographical region, and pages visited to optimize website accessibility. We do not sell or monetize personal browsing history.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="serif-heading text-2xl text-[#faf8f5]">3. Explicit Consent & Preference Separation</h2>
          <p>
            In alignment with Section 5 and Section 10 of our ministry operational guidelines:
          </p>
          <div className="p-5 rounded-2xl bg-[#12121a] border border-[#c5a880]/30 space-y-2 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <span><strong>Separated Communications:</strong> Daily devotional spiritual readings and general ministry newsletters/announcements are managed under distinct user consent tags. You may opt in to one, both, or neither.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <span><strong>Public Browsing Without Coercion:</strong> Access to public sermons, book overviews, music streaming, and devotional archives does not require email registration.</span>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="serif-heading text-2xl text-[#faf8f5]">4. Unsubscribe & Right to Rectification</h2>
          <p>
            Every broadcast email sent from our ministry includes a prominent, one-click <strong>Unsubscribe</strong> link. You maintain the right to revoke consent, inspect the data recorded on your behalf, or request total deletion by emailing <a href="mailto:privacy@evangelisttolucci.org" className="text-[#c5a880] underline">privacy@evangelisttolucci.org</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="serif-heading text-2xl text-[#faf8f5]">5. Security & Third-Party Disclosure</h2>
          <p>
            We strictly do not sell, rent, or lease subscriber lists or contact submissions to third parties or commercial advertising brokers. Subscriber data is accessible solely by authorized members of Evangelist Tolucci&apos;s administrative secretariat for ministry communication and prayer fulfillment.
          </p>
        </section>
      </div>
    </div>
  );
}
