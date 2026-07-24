import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="M10 9l6 3-6 3V9z" fill="currentColor" stroke="none" />
  </svg>
);
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v6h3v-6h3l1-3h-4V9c0-.6.4-1 1-1z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[var(--color-bg2)]/60 transition-colors duration-500">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-4">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center notch-corner bg-[var(--color-accent)]">
              <MapPin size={16} className="text-[var(--color-bg)]" />
            </span>
            <span className="font-display text-lg font-semibold text-[var(--color-text)]">DekhoAurDekhao</span>
          </div>
          <p className="text-sm text-[var(--color-text)]/60">
            Explore the tourist places, hidden gems and living culture of every district in Odisha.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-[var(--color-gold)]">Explore</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text)]/70">
            <li><Link to="/" className="hover:text-[var(--color-gold)]">Home</Link></li>
            <li><Link to="/places" className="hover:text-[var(--color-gold)]">Tourist Places</Link></li>
            <li><Link to="/about" className="hover:text-[var(--color-gold)]">About</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--color-gold)]">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-[var(--color-gold)]">Community</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text)]/70">
            <li><Link to="/submit" className="hover:text-[var(--color-gold)]">Submit a Place</Link></li>
            <li><Link to="/login" className="hover:text-[var(--color-gold)]">Login / Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-display text-sm uppercase tracking-widest text-[var(--color-gold)]">Follow</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="text-[var(--color-text)]/70 hover:text-[var(--color-accent)]"><InstagramIcon /></a>
            <a href="#" aria-label="YouTube" className="text-[var(--color-text)]/70 hover:text-[var(--color-accent)]"><YoutubeIcon /></a>
            <a href="#" aria-label="Facebook" className="text-[var(--color-text)]/70 hover:text-[var(--color-accent)]"><FacebookIcon /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-[var(--color-text)]/40">
        © {new Date().getFullYear()} DekhoAurDekhao. Made for travelers who look twice.
      </div>
    </footer>
  );
}
