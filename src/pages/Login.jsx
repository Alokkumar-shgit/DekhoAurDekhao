import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate(location.state?.from || "/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full notch-corner border border-white/10 bg-[var(--color-bg2)]/40 p-8"
      >
        <h1 className="mb-1 font-display text-2xl font-bold text-[var(--color-text)]">Welcome back</h1>
        <p className="mb-6 text-sm text-[var(--color-text)]/60">Log in to submit places and manage your posts.</p>

        {error && <p className="mb-4 text-sm text-[var(--color-accent)]">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-[var(--color-text)]/70">Email</label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-white/15 bg-[var(--color-bg)]/60 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-[var(--color-text)]/70">Password</label>
            <input
              required
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-white/15 bg-[var(--color-bg)]/60 px-4 py-2.5 text-white outline-none focus:border-[var(--color-accent)]" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-none notch-corner bg-[var(--color-accent)] py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Logging in…" : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text)]/60">
          New here?{" "}
          <Link to="/signup" className="font-semibold text-[var(--color-gold)] hover:underline">
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
