import { Navigation2 } from "lucide-react";

export default function DistanceBadge({ distance, city }) {
  if (!distance) return null;
  return (
    <span className="inline-flex items-center gap-1.5 rounded-none bg-[var(--color-bg2)] px-2.5 py-1 text-xs font-medium text-[var(--color-gold)]">
      <Navigation2 size={12} />
      {distance} {city ? `from ${city}` : ""}
    </span>
  );
}
