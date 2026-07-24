import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, Landmark, Waves, TreePine, Users2, UtensilsCrossed, Quote } from "lucide-react";
import DistrictSelector from "../components/DistrictSelector";
import PlaceCard from "../components/PlaceCard";
import StatsCounter from "../components/StatsCounter";
import { usePlaces } from "../hooks/usePlaces";

const highlights = [
  { icon: Landmark, title: "Heritage", text: "Temples, forts and palaces spanning two millennia." },
  { icon: Waves, title: "Beaches", text: "Golden coastlines from Puri to Gopalpur to Gahirmatha." },
  { icon: TreePine, title: "Wildlife", text: "Mangroves, tiger reserves and turtle nesting grounds." },
  { icon: Users2, title: "Tribal Culture", text: "62 tribal communities, living crafts and folk art." },
  { icon: UtensilsCrossed, title: "Cuisine", text: "From Puri's mahaprasad to Sambalpuri delicacies." },
  { icon: Compass, title: "Off-beat Trails", text: "Hidden waterfalls and villages, mapped by travelers like you." },
];

const testimonials = [
  {
    quote:
      "We planned our entire Kendrapara trip around this site — the distance info and turtle-nesting dates were spot on.",
    name: "Ananya R.",
    place: "Traveler, Bengaluru",
  },
  {
    quote: "Found a waterfall near Koraput that wasn't on any map, submitted by another local traveler. Incredible.",
    name: "Debasish P.",
    place: "Traveler, Cuttack",
  },
  {
    quote: "Each district genuinely feels different when you click through — the theming is such a nice touch.",
    name: "Priya M.",
    place: "Traveler, Delhi",
  },
];

export default function Home() {
  const { places, loading, error } = usePlaces();
  const featured = places.slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden grain">
        <div className="absolute inset-0 -z-10 bg-arch-grad" />
        <div className="absolute inset-0 -z-10 opacity-30">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1600&auto=format&fit=crop"
          >
            {/* Replace with a real Odisha landscapes/temples/beaches reel: /public/hero-odisha.mp4 */}
            <source src="/hero-odisha.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-[var(--color-bg)]/60 to-[var(--color-bg)]" />

        <div className="mx-auto max-w-5xl px-5 pb-28 pt-24 text-center md:pt-36">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-accent text-sm uppercase tracking-[0.3em] text-[var(--color-gold)]"
          >
            30 Districts · One Living Culture
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-bold leading-tight text-[var(--color-text)] sm:text-5xl md:text-6xl"
          >
            Discover the Soul of Odisha —
            <br className="hidden md:block" /> <span className="text-gradient-gold">One District at a Time</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-5 max-w-2xl text-base text-[var(--color-text)]/70 md:text-lg"
          >
            From Bhitarkanika's crocodile-filled mangroves to Puri's temple bells — DekhoAurDekhao maps every
            district's tourist places, hidden gems, and the stories behind them. Built with travelers, for travelers.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/places"
              className="rounded-none notch-corner bg-[var(--color-accent)] px-7 py-3 font-semibold text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-0.5"
            >
              Explore Now
            </Link>
            <Link
              to="/submit"
              className="rounded-none notch-corner border border-[var(--color-gold)] px-7 py-3 font-semibold text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-bg)]"
            >
              Share a Hidden Gem
            </Link>
          </motion.div>
        </div>
      </section>

      {/* DISTRICT SELECTOR */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Pick a District</p>
          <h2 className="font-display text-3xl font-bold text-[var(--color-text)] md:text-4xl">
            30 Districts, 30 Personalities
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-[var(--color-text)]/60">
            Hover or tap a district to preview its colours and character — then dive into its tourist places.
          </p>
        </div>
        <DistrictSelector />
      </section>

      {/* FEATURED PLACES */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Featured</p>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text)] md:text-4xl">Places Worth the Detour</h2>
          </div>
          <Link to="/places" className="text-sm font-semibold text-[var(--color-gold)] hover:underline">
            View all places →
          </Link>
        </div>
        {loading ? (
          <p className="text-[var(--color-text)]/50">Loading places…</p>
        ) : error ? (
          <p className="notch-corner border border-[var(--color-accent)]/40 bg-[var(--color-bg2)]/30 p-6 text-sm text-[var(--color-text)]/70">
            {error}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p, i) => (
              <PlaceCard key={p.id} place={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* WHY VISIT */}
      <section className="border-y border-white/10 bg-[var(--color-bg2)]/30 py-20">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-10 text-center">
            <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Why Odisha</p>
            <h2 className="font-display text-3xl font-bold text-[var(--color-text)] md:text-4xl">Six Reasons to Pack Your Bags</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.06 }}
                className="notch-corner border border-white/10 bg-[var(--color-bg)]/50 p-6"
              >
                <h.icon className="mb-3 text-[var(--color-accent)]" size={28} />
                <h3 className="mb-1 font-display text-lg font-semibold text-[var(--color-text)]">{h.title}</h3>
                <p className="text-sm text-[var(--color-text)]/60">{h.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <StatsCounter />
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="mb-10 text-center">
          <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Traveler Stories</p>
          <h2 className="font-display text-3xl font-bold text-[var(--color-text)] md:text-4xl">What Explorers Are Saying</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08 }}
              className="notch-corner border border-white/10 bg-[var(--color-bg2)]/40 p-6"
            >
              <Quote className="mb-3 text-[var(--color-gold)]" size={22} />
              <p className="mb-4 text-sm italic text-[var(--color-text)]/80">"{t.quote}"</p>
              <p className="text-sm font-semibold text-[var(--color-text)]">{t.name}</p>
              <p className="text-xs text-[var(--color-text)]/50">{t.place}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* COMMUNITY CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-24">
        <div className="arch-frame bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-bg2)] px-8 py-14 text-center">
          <h2 className="font-display text-2xl font-bold text-[var(--color-text)] md:text-3xl">
            Know a hidden gem? Share it with fellow travelers.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-[var(--color-text)]/70">
            Every district has spots that never make it to guidebooks. Log in and add the place, its story, and your
            own photos or videos — your contribution goes live for other explorers to see.
          </p>
          <Link
            to="/submit"
            className="mt-6 inline-block rounded-none notch-corner bg-[var(--color-accent)] px-7 py-3 font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Submit a Place
          </Link>
        </div>
      </section>
    </div>
  );
}
