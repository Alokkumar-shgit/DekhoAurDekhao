import { motion } from "framer-motion";
import { Target, MapPinned, Users } from "lucide-react";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">About Us</p>
        <h1 className="mb-6 font-display text-4xl font-bold text-[var(--color-text)]">
          Every District Deserves Its Own Spotlight
        </h1>
        <p className="mb-6 text-[var(--color-text)]/70">
          DekhoAurDekhao ("Look and Show") began with a simple frustration: most travel guides cover the same five
          places in Odisha — Puri, Konark, Bhubaneswar — and stop there. But Odisha has 30 districts, each with its
          own landscape, cuisine, craft, and calendar of festivals. We wanted a single home for all of it.
        </p>

        <div className="my-10 grid gap-6 sm:grid-cols-3">
          {[
            { icon: Target, title: "Our Mission", text: "Make every district's tourist places discoverable, with real context — not just a pin on a map." },
            { icon: MapPinned, title: "District-First", text: "Each district gets its own theme, tone and story, reflecting its distinct culture." },
            { icon: Users, title: "Community-Built", text: "Travelers add the places we've missed — with photos, videos and their own notes." },
          ].map((f) => (
            <div key={f.title} className="notch-corner border border-white/10 bg-[var(--color-bg2)]/40 p-6">
              <f.icon className="mb-3 text-[var(--color-accent)]" size={26} />
              <h3 className="mb-1 font-display text-lg font-semibold text-[var(--color-text)]">{f.title}</h3>
              <p className="text-sm text-[var(--color-text)]/60">{f.text}</p>
            </div>
          ))}
        </div>

        <h2 className="mb-3 font-display text-2xl font-semibold text-[var(--color-text)]">How Community Contributions Work</h2>
        <p className="mb-4 text-[var(--color-text)]/70">
          Create a free account, then use "Submit a Place" to add anywhere you think belongs here — a waterfall with
          no name on Google Maps, a village festival, a family-run eatery. Add its location, a few lines on why it
          matters, and your own photos or videos. It's tagged as a community contribution and credited to you.
        </p>

        <h2 className="mb-3 font-display text-2xl font-semibold text-[var(--color-text)]">Why "DekhoAurDekhao"?</h2>
        <p className="text-[var(--color-text)]/70">
          It means "look, and show others." That's the whole idea — discover a place, then help the next traveler
          find it too.
        </p>
      </motion.div>
    </div>
  );
}
