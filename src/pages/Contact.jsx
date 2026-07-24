import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import MapEmbed from "../components/MapEmbed";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Wire this up to Nodemailer / Formspree / your backend of choice.
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Get in Touch</p>
        <h1 className="mb-10 font-display text-4xl font-bold text-[var(--color-text)]">Contact Us</h1>
      </motion.div>

      <div className="grid gap-10 md:grid-cols-2">
        <div>
          {sent ? (
            <div className="notch-corner border border-[var(--color-gold)]/40 bg-[var(--color-bg2)]/40 p-6 text-[var(--color-text)]">
              Thanks for reaching out — we'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm text-[var(--color-text)]/70">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[var(--color-text)]/70">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-[var(--color-text)]/70">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="rounded-none notch-corner bg-[var(--color-accent)] px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          )}

          <div className="mt-10 space-y-3 text-sm text-[var(--color-text)]/70">
            <p className="flex items-center gap-2"><Mail size={16} className="text-[var(--color-gold)]" /> hello@dekhoaurdekhao.in</p>
            <p className="flex items-center gap-2"><Phone size={16} className="text-[var(--color-gold)]" /> +91 90000 00000</p>
            <p className="flex items-center gap-2"><MapPin size={16} className="text-[var(--color-gold)]" /> Bhubaneswar, Odisha, India</p>
          </div>
        </div>

        <MapEmbed lat={20.2961} lng={85.8245} label="Bhubaneswar, Odisha" />
      </div>
    </div>
  );
}
