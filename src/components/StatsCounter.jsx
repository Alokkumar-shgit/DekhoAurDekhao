import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-display text-4xl font-bold text-gradient-gold md:text-5xl">
      {value}
      {suffix}
    </span>
  );
}

const stats = [
  { target: 30, suffix: "", label: "Districts" },
  { target: 150, suffix: "+", label: "Places Listed" },
  { target: 1000, suffix: "+", label: "Photos & Videos" },
  { target: 100, suffix: "%", label: "Community Powered" },
];

export default function StatsCounter() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="text-center"
        >
          <Counter target={s.target} suffix={s.suffix} />
          <p className="mt-1 text-xs uppercase tracking-widest text-[var(--color-text)]/60">{s.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
