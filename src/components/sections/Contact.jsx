import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, SOCIAL_LINKS } from '../../data/portfolioData';
import SectionHeading from '../common/SectionHeading';
import TiltCard from '../common/TiltCard';
import Button from '../common/Button';
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCopy,
  FaCheck,
  FaPaperPlane,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
  FaDiscord,
  FaTwitter,
  FaClock
} from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const iconMap = {
    FaGithub,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp,
    FaDiscord,
    FaTwitter
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message with confetti
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F4B044', '#E0680E', '#88A5B7', '#FFFFFF']
      });

      // Reset form after a few seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Accent Lights */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Get in Touch"
          title="Let's Build Something"
          highlight="Amazing Together"
          subtitle="I'm open to internships, freelance projects and collaborations. If you have an idea, feel free to reach out — let's create something impactful."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Contact Cards & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Quick Contact Information Card */}
            <TiltCard
              maxRotation={8}
              className="p-6 sm:p-8 bg-dark-700/80 border-gold/30 shadow-gold-sm"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <span>Contact Channels</span>
                <span className="w-2 h-2 rounded-full bg-gold" />
              </h3>

              <div className="space-y-4">
                {/* Email Item */}
                <div className="flex items-start justify-between p-3.5 rounded-2xl bg-dark-800/80 border border-slateBlue/15">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center text-gold flex-shrink-0">
                      <FaEnvelope className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-[11px] font-semibold text-slateBlue uppercase tracking-wider">Email</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-xs sm:text-sm font-medium text-white hover:text-gold transition-colors truncate block"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    title="Copy Email"
                    className="p-2 rounded-lg bg-dark-700 hover:bg-gold/20 text-slateBlue hover:text-gold transition-colors flex-shrink-0 ml-2"
                  >
                    {copied ? <FaCheck className="w-3.5 h-3.5 text-emerald-400" /> : <FaCopy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Phone Item */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-dark-800/80 border border-slateBlue/15">
                  <div className="w-10 h-10 rounded-xl bg-orange/15 flex items-center justify-center text-orange flex-shrink-0">
                    <FaPhoneAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slateBlue uppercase tracking-wider">Phone / WhatsApp</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone}`}
                      className="text-xs sm:text-sm font-medium text-white hover:text-orange transition-colors"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Location Item */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-dark-800/80 border border-slateBlue/15">
                  <div className="w-10 h-10 rounded-xl bg-slateBlue/15 flex items-center justify-center text-slateBlue flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slateBlue uppercase tracking-wider">Location</div>
                    <div className="text-xs sm:text-sm font-medium text-soft">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>

                {/* Response Time Item */}
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-dark-800/80 border border-slateBlue/15">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <FaClock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slateBlue uppercase tracking-wider">Response Window</div>
                    <div className="text-xs sm:text-sm font-medium text-emerald-400">
                      Within 24 Hours
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels in card */}
              <div className="mt-6 pt-6 border-t border-slateBlue/15">
                <div className="text-xs font-semibold uppercase tracking-wider text-slateBlue mb-3">
                  Direct Social Message
                </div>
                <div className="flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((item) => {
                    const Icon = iconMap[item.icon] || FaGithub;
                    return (
                      <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.name}
                        className="w-9 h-9 rounded-xl bg-dark-800 border border-slateBlue/20 flex items-center justify-center text-soft hover:text-gold hover:border-gold transition-all duration-200"
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-dark-700/70 p-6 sm:p-10 rounded-3xl border border-slateBlue/20 backdrop-blur-md relative"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-slateBlue text-sm mb-8">
              Have a project inquiry, internship offer, or questions? Fill out the details below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slateBlue">
                    Your Name <span className="text-orange">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-slateBlue/25 text-white placeholder-slateBlue/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slateBlue">
                    Your Email <span className="text-orange">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-slateBlue/25 text-white placeholder-slateBlue/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slateBlue">
                  Subject <span className="text-orange">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Collaboration / Internship Opportunity"
                  className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-slateBlue/25 text-white placeholder-slateBlue/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slateBlue">
                  Your Message <span className="text-orange">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project scope, goals, or timeline..."
                  className="w-full px-4 py-3 rounded-xl bg-dark-900/80 border border-slateBlue/25 text-white placeholder-slateBlue/40 text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto min-w-[200px]"
                  disabled={isSubmitting || submitted}
                  icon={submitted ? FaCheck : FaPaperPlane}
                >
                  {isSubmitting
                    ? 'Sending Message...'
                    : submitted
                    ? 'Message Sent Successfully!'
                    : 'Send Message'}
                </Button>
              </div>

              {/* Feedback Alert */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2"
                >
                  <FaCheck className="text-emerald-400 flex-shrink-0" />
                  <span>Thank you! Your message has been received. I'll get back to you promptly.</span>
                </motion.div>
              )}
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
