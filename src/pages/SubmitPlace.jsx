import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ImagePlus, Film, CheckCircle2 } from "lucide-react";
import { districts } from "../data/districts";
import { categories } from "../data/places";
import { submitPlace } from "../hooks/usePlaces";
import MapEmbed from "../components/MapEmbed";

export default function SubmitPlace() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    district: districts[0].slug,
    category: categories[1],
    shortDescription: "",
    history: "",
    lat: "20.2961",
    lng: "85.8245",
    nearestCity: "",
    distanceFromCity: "",
    bestTimeToVisit: "",
  });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleFiles = (e, type) => {
    const files = Array.from(e.target.files || []);
    if (type === "image") {
      setImages((prev) => [...prev, ...files]);
      setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
    } else {
      setVideos((prev) => [...prev, ...files]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await submitPlace(
        {
          name: form.name,
          district: form.district,
          category: form.category,
          shortDescription: form.shortDescription,
          history: form.history || form.shortDescription,
          lat: form.lat,
          lng: form.lng,
          nearestCity: form.nearestCity,
          distanceFromCity: form.distanceFromCity,
          bestTimeToVisit: form.bestTimeToVisit || "Year-round",
        },
        { images, videos }
      );
      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center">
        <CheckCircle2 className="mx-auto mb-4 text-[var(--color-gold)]" size={48} />
        <h1 className="mb-2 font-display text-2xl font-bold text-[var(--color-text)]">Thanks for sharing!</h1>
        <p className="mb-6 text-[var(--color-text)]/60">
          Your place is now live under "Community" listings for other travelers to discover.
        </p>
        <button
          onClick={() => navigate("/places")}
          className="rounded-none notch-corner bg-[var(--color-accent)] px-6 py-3 font-semibold text-white"
        >
          View Tourist Places
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="mb-2 font-accent text-xs uppercase tracking-[0.25em] text-[var(--color-gold)]">Community</p>
        <h1 className="mb-2 font-display text-3xl font-bold text-[var(--color-text)]">Submit a Tourist Place</h1>
        <p className="mb-8 text-[var(--color-text)]/60">
          Know a spot that isn't listed yet? Add it below, with the story of why it's worth visiting.
        </p>

        {error && (
          <p className="mb-6 notch-corner border border-[var(--color-accent)]/40 bg-[var(--color-bg2)]/30 p-4 text-sm text-[var(--color-text)]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">Place Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
                placeholder="e.g. Sunset Point, Talcher"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">District</label>
              <select
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              >
                {districts.map((d) => (
                  <option key={d.slug} value={d.slug} className="bg-[var(--color-bg)]">
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              >
                {categories.filter((c) => c !== "All").map((c) => (
                  <option key={c} value={c} className="bg-[var(--color-bg)]">
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">Best Time to Visit</label>
              <input
                value={form.bestTimeToVisit}
                onChange={(e) => setForm({ ...form, bestTimeToVisit: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
                placeholder="e.g. October – February"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm text-[var(--color-text)]/70">Short Description</label>
            <input
              required
              value={form.shortDescription}
              onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
              className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              placeholder="One line that captures the place"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-[var(--color-text)]/70">
              Why should people visit? (history / meaning / your story)
            </label>
            <textarea
              rows={4}
              value={form.history}
              onChange={(e) => setForm({ ...form, history: e.target.value })}
              className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              placeholder="Tell other travelers what makes it worth the trip"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">Nearest City / Town</label>
              <input
                value={form.nearestCity}
                onChange={(e) => setForm({ ...form, nearestCity: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">Distance from that City</label>
              <input
                value={form.distanceFromCity}
                onChange={(e) => setForm({ ...form, distanceFromCity: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
                placeholder="e.g. 14 km"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">Latitude</label>
              <input
                value={form.lat}
                onChange={(e) => setForm({ ...form, lat: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-[var(--color-text)]/70">Longitude</label>
              <input
                value={form.lng}
                onChange={(e) => setForm({ ...form, lng: e.target.value })}
                className="w-full border border-white/15 bg-[var(--color-bg2)]/40 px-4 py-2.5 text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
              />
            </div>
          </div>
          <p className="-mt-2 text-xs text-[var(--color-text)]/40">
            Tip: right-click the spot on Google Maps and copy the coordinates shown at the top of the menu.
          </p>
          <MapEmbed lat={parseFloat(form.lat) || 20.2961} lng={parseFloat(form.lng) || 85.8245} label={form.name || "Selected location"} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-[var(--color-text)]/70">
                <ImagePlus size={16} /> Photos
              </label>
              <input type="file" accept="image/*" multiple onChange={(e) => handleFiles(e, "image")} className="text-sm text-[var(--color-text)]/70" />
              {previews.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {previews.map((img, i) => (
                    <img key={i} src={img} alt="" className="h-16 w-16 object-cover notch-corner" />
                  ))}
                </div>
              )}
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm text-[var(--color-text)]/70">
                <Film size={16} /> Videos
              </label>
              <input type="file" accept="video/*" multiple onChange={(e) => handleFiles(e, "video")} className="text-sm text-[var(--color-text)]/70" />
              {videos.length > 0 && <p className="mt-2 text-xs text-[var(--color-gold)]">{videos.length} video(s) attached</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-none notch-corner bg-[var(--color-accent)] py-3 font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 sm:w-auto sm:px-10"
          >
            {submitting ? "Submitting…" : "Submit Place"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
