import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, Ticket, Navigation2, MapPin } from "lucide-react";
import { usePlace, usePlaces } from "../hooks/usePlaces";
import { getDistrictBySlug } from "../data/districts";
import MapEmbed from "../components/MapEmbed";
import PlaceCard from "../components/PlaceCard";

export default function PlaceDetail() {
  const { id } = useParams();
  const { place, loading, error } = usePlace(id);
  const { places: districtPlaces } = usePlaces({ district: place?.district });

  if (loading) {
    return <div className="mx-auto max-w-3xl px-5 py-24 text-center text-[var(--color-text)]/50">Loading…</div>;
  }

  if (error || !place) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-24 text-center">
        <h1 className="mb-3 font-display text-2xl font-bold text-[var(--color-text)]">Place not found</h1>
        <Link to="/places" className="text-[var(--color-gold)] underline">
          Back to Tourist Places
        </Link>
      </div>
    );
  }

  const district = getDistrictBySlug(place.district);
  const related = districtPlaces.filter((p) => p.id !== place.id).slice(0, 3);

  return (
    <div>
      <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
        <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-5xl px-5 pb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-gold)]">
            {district?.name} · {place.category}
          </p>
          <h1 className="font-display text-3xl font-bold text-white md:text-5xl">{place.name}</h1>
          {place.submittedBy && (
            <span className="mt-3 inline-block bg-[var(--color-gold)] px-3 py-1 text-xs font-semibold text-[var(--color-bg)]">
              Community Contribution by {place.submittedBy}
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-10 px-5 py-14 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2"
        >
          <h2 className="mb-3 font-display text-xl font-semibold text-[var(--color-text)]">History & Significance</h2>
          <p className="mb-8 text-[var(--color-text)]/70 leading-relaxed">{place.history}</p>

          {place.videos?.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Videos</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {place.videos.map((v, i) => (
                  <video key={i} src={v} controls className="w-full notch-corner border border-white/10" />
                ))}
              </div>
            </div>
          )}

          <h3 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Nearby Attractions</h3>
          <ul className="mb-8 flex flex-wrap gap-2">
            {place.nearbyAttractions?.map((n) => (
              <li key={n} className="notch-corner border border-white/10 px-3 py-1 text-sm text-[var(--color-text)]/70">
                {n}
              </li>
            ))}
          </ul>

          <h3 className="mb-3 font-display text-lg font-semibold text-[var(--color-text)]">Location</h3>
          <MapEmbed lat={place.coords.lat} lng={place.coords.lng} label={place.name} />
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="h-fit notch-corner border border-white/10 bg-[var(--color-bg2)]/40 p-6"
        >
          <h3 className="mb-4 font-display text-lg font-semibold text-[var(--color-text)]">Trip Info</h3>
          <dl className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <Navigation2 size={16} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <dt className="text-[var(--color-text)]/50">Distance</dt>
                <dd className="text-[var(--color-text)]">
                  {place.distanceFromCity} from {place.nearestCity} ({place.travelTime})
                </dd>
                {place.distanceFromCapital && (
                  <dd className="text-[var(--color-text)]/50 text-xs mt-0.5">{place.distanceFromCapital}</dd>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock size={16} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <dt className="text-[var(--color-text)]/50">Best Time to Visit</dt>
                <dd className="text-[var(--color-text)]">{place.bestTimeToVisit}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Ticket size={16} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <dt className="text-[var(--color-text)]/50">Entry Fee</dt>
                <dd className="text-[var(--color-text)]">{place.entryFee}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={16} className="mt-0.5 text-[var(--color-gold)]" />
              <div>
                <dt className="text-[var(--color-text)]/50">District</dt>
                <dd className="text-[var(--color-text)]">{district?.name}</dd>
              </div>
            </div>
          </dl>
        </motion.aside>
      </div>

      {related.length > 0 && (
        <div className="mx-auto max-w-5xl px-5 pb-20">
          <h3 className="mb-6 font-display text-xl font-semibold text-[var(--color-text)]">
            More in {district?.name}
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {related.map((p, i) => (
              <PlaceCard key={p.id} place={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
