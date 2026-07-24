import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, MapPin, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useThemeContext } from "../context/ThemeContext";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/places", label: "Tourist Places" },
  { to: "/contact", label: "Contact Us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { activeDistrict } = useThemeContext();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--color-bg)]/90 backdrop-blur-md transition-colors duration-500">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-none notch-corner bg-[var(--color-accent)] text-[var(--color-bg)] font-display font-bold transition-transform group-hover:scale-105">
            <MapPin size={18} strokeWidth={2.5} />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold tracking-tight text-[var(--color-text)]">
              DekhoAurDekhao
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted,#b8c0d4)]">
              {activeDistrict ? activeDistrict.name : "Explore Odisha"}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-body text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-text)]/80 hover:text-[var(--color-gold)]"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/submit"
                className="rounded-none notch-corner bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                Submit a Place
              </Link>
              <span className="flex items-center gap-1 text-sm text-[var(--color-text)]/80">
                <User size={16} /> {user.name.split(" ")[0]}
              </span>
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="text-[var(--color-text)]/60 hover:text-[var(--color-accent)]"
                title="Log out"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-none notch-corner border border-[var(--color-gold)] px-4 py-2 text-sm font-semibold text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-bg)]"
            >
              Login / Sign Up
            </Link>
          )}
        </div>

        <button className="md:hidden text-[var(--color-text)]" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="flex flex-col gap-1 border-t border-white/10 bg-[var(--color-bg)] px-5 pb-5 pt-3 md:hidden">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-2 text-[var(--color-text)]/90 font-body"
            >
              {l.label}
            </NavLink>
          ))}
          {user ? (
            <>
              <Link to="/submit" onClick={() => setOpen(false)} className="py-2 text-[var(--color-gold)] font-semibold">
                Submit a Place
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                  navigate("/");
                }}
                className="py-2 text-left text-[var(--color-text)]/70"
              >
                Log out ({user.name.split(" ")[0]})
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="py-2 font-semibold text-[var(--color-gold)]">
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
