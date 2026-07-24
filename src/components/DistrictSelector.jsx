import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { districts } from "../data/districts";
import { useThemeContext } from "../context/ThemeContext";

export default function DistrictSelector() {
  const navigate = useNavigate();
  const { selectDistrict, districtSlug } = useThemeContext();

  const handlePick = (slug) => {
    selectDistrict(slug);
    navigate(`/places?district=${slug}`);
  };

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
      {districts.map((d, i) => (
        <motion.button
          key={d.slug}
          onClick={() => handlePick(d.slug)}
          onMouseEnter={() => selectDistrict(d.slug)}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: (i % 10) * 0.03 }}
          className={`group relative overflow-hidden notch-corner border p-4 text-left transition-all ${
            districtSlug === d.slug
              ? "border-[var(--color-accent)] bg-[var(--color-bg2)]"
              : "border-white/10 bg-[var(--color-bg2)]/30 hover:border-[var(--color-gold)]/60"
          }`}
          style={{
            background:
              districtSlug === d.slug
                ? `linear-gradient(135deg, ${d.theme.primary}55, transparent)`
                : undefined,
          }}
        >
          <p className="font-display text-sm font-semibold text-[var(--color-text)]">{d.name}</p>
          <p className="mt-1 text-[11px] text-[var(--color-text)]/50">{d.region}</p>
          <span
            className="mt-2 block h-1 w-8 rounded-full transition-all group-hover:w-full"
            style={{ background: d.theme.accent }}
          />
        </motion.button>
      ))}
    </div>
  );
}
