import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(form);
      navigate("/");
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
        <h1 className="mb-1 font-display text-2xl font-bold text-[var(--color-text)]">Create your account</h1>
        <p className="mb-6 text-sm text-[var(--color-text)]/60">Join the community and start sharing places.</p>

        {error && <p className="mb-4 text-sm text-[var(--color-accent)]">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-[var(--color-text)]/70">Full name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-white/15 bg-[var(--color-bg)]/60 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            />
          </div>
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
              minLength={6}
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-white/15 bg-[var(--color-bg)]/60 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-none notch-corner bg-[var(--color-accent)] py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--color-text)]/60">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-[var(--color-gold)] hover:underline">
            Log in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
