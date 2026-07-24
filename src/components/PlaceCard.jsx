import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getDistrictBySlug } from "../data/districts";
import DistanceBadge from "./DistanceBadge";

export default function PlaceCard({ place, index = 0 }) {
  const district = getDistrictBySlug(place.district);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
    >
      <Link
        to={`/places/${place.id}`}
        className="group block overflow-hidden notch-corner border border-white/10 bg-[var(--color-bg2)]/40 transition-all hover:-translate-y-1 hover:border-[var(--color-accent)]/60"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={place.image}
            alt={place.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-3 top-3 rounded-none bg-[var(--color-accent)] px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
            {place.category}
          </span>
          {place.submittedBy && (
            <span className="absolute right-3 top-3 rounded-none bg-[var(--color-gold)] px-2 py-1 text-[11px] font-semibold text-[var(--color-bg)]">
              Community
            </span>
          )}
        </div>
        <div className="p-4">
          <p className="mb-1 text-[11px] uppercase tracking-widest text-[var(--color-gold)]">
            {district ? district.name : place.district}
          </p>
          <h3 className="mb-2 font-display text-lg font-semibold text-[var(--color-text)] group-hover:text-[var(--color-gold)]">
            {place.name}
          </h3>
          <p className="mb-3 line-clamp-2 text-sm text-[var(--color-text)]/60">{place.shortDescription}</p>
          <DistanceBadge distance={place.distanceFromCity} city={place.nearestCity} />
        </div>
      </Link>
    </motion.div>
  );
}
