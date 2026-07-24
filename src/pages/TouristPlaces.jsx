import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { districts } from "../data/districts";
import { categories } from "../data/places";
import { usePlaces } from "../hooks/usePlaces";
import { useThemeContext } from "../context/ThemeContext";
import PlaceCard from "../components/PlaceCard";

export default function TouristPlaces() {
  const [params, setParams] = useSearchParams();
  const districtParam = params.get("district") || "all";
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { places, loading, error } = usePlaces({ district: districtParam, category, q: query });
  const { selectDistrict, resetTheme } = useThemeContext();

  useEffect(() => {
    if (districtParam !== "all") selectDistrict(districtParam);
    else resetTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtParam]);

  const sortedDistricts = useMemo(() => {
    const featured = districts.filter((d) => d.slug === "kendrapara");
    const rest = districts.filter((d) => d.slug !== "kendrapara");
    return [...featured, ...rest];
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16">
      <div className="mb-10">
        <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Discover</p>
        <h1 className="font-display text-4xl font-bold text-[var(--color-text)]">Tourist Places</h1>
        <p className="mt-2 text-[var(--color-text)]/60">
          {loading ? "Loading…" : `${places.length} place${places.length !== 1 ? "s" : ""}`}
          {districtParam !== "all" ? ` in ${districts.find((d) => d.slug === districtParam)?.name}` : " across Odisha"}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6 flex items-center gap-2 border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5">
        <Search size={18} className="text-[var(--color-text)]/50" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search places…"
          className="w-full bg-transparent text-[var(--color-text)] outline-none placeholder:text-[var(--color-text)]/40"
        />
      </div>

      {/* District filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        <button
          onClick={() => setParams({})}
          className={`px-3 py-1.5 text-xs font-semibold notch-corner ${
            districtParam === "all"
              ? "bg-[var(--color-accent)] text-white"
              : "border border-white/15 text-[var(--color-text)]/70 hover:border-[var(--color-gold)]"
          }`}
        >
          All Districts
        </button>
        {sortedDistricts.map((d) => (
          <button
            key={d.slug}
            onClick={() => setParams({ district: d.slug })}
            className={`px-3 py-1.5 text-xs font-semibold notch-corner ${
              districtParam === d.slug
                ? "bg-[var(--color-accent)] text-white"
                : "border border-white/15 text-[var(--color-text)]/70 hover:border-[var(--color-gold)]"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1 text-xs notch-corner ${
              category === c
                ? "bg-[var(--color-gold)] text-[var(--color-bg)] font-semibold"
                : "border border-white/10 text-[var(--color-text)]/60 hover:border-[var(--color-gold)]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {error ? (
        <div className="notch-corner border border-[var(--color-accent)]/40 bg-[var(--color-bg2)]/30 p-10 text-center text-[var(--color-text)]/70">
          {error}
        </div>
      ) : loading ? (
        <div className="p-10 text-center text-[var(--color-text)]/50">Loading places…</div>
      ) : places.length === 0 ? (
        <div className="notch-corner border border-white/10 bg-[var(--color-bg2)]/30 p-10 text-center text-[var(--color-text)]/60">
          No places found yet — try a different filter, or be the first to{" "}
          <a href="/submit" className="text-[var(--color-gold)] underline">
            submit one
          </a>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {places.map((p, i) => (
            <PlaceCard key={p.id} place={p} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
