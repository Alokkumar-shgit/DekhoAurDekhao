import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <h1 className="font-display text-6xl font-bold text-[var(--color-gold)]">404</h1>
      <p className="mt-3 text-[var(--color-text)]/70">This trail doesn't lead anywhere yet.</p>
      <Link to="/" className="mt-6 rounded-none notch-corner bg-[var(--color-accent)] px-6 py-3 font-semibold text-white">
        Back Home
      </Link>
    </div>
  );
}
