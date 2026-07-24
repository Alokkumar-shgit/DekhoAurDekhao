import { Navigation } from "lucide-react";

// Uses the key-less Google Maps iframe embed. For a richer, interactive
// experience (custom markers, live directions), swap this for
// `@react-google-maps/api` and a Google Maps JavaScript API key.
export default function MapEmbed({ lat, lng, label }) {
  const src = `https://maps.google.com/maps?q=${lat},${lng}(${encodeURIComponent(
    label || "Location"
  )})&z=13&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div className="overflow-hidden notch-corner border border-white/10">
      <iframe
        title={`Map showing ${label}`}
        src={src}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={directionsUrl}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-2 bg-[var(--color-primary)] py-3 text-sm font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent)]"
      >
        <Navigation size={16} /> Get Directions
      </a>
    </div>
  );
}
