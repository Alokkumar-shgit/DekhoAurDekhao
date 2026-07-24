import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";
import { readDb, writeDb } from "../utils/db.js";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuid()}${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

const router = Router();

// GET /api/places?district=kendrapara&category=Beach&q=turtle
router.get("/", (req, res) => {
  const { district, category, q } = req.query;
  const db = readDb();
  let results = db.places;

  if (district && district !== "all") results = results.filter((p) => p.district === district);
  if (category && category !== "All") results = results.filter((p) => p.category === category);
  if (q) {
    const needle = q.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        (p.shortDescription || "").toLowerCase().includes(needle)
    );
  }

  res.json({ places: results });
});

router.get("/:id", (req, res) => {
  const db = readDb();
  const place = db.places.find((p) => p.id === req.params.id);
  if (!place) return res.status(404).json({ error: "Place not found." });
  res.json({ place });
});

// POST /api/places  (multipart/form-data: images[], videos[], + text fields)
router.post(
  "/",
  requireAuth,
  upload.fields([
    { name: "images", maxCount: 8 },
    { name: "videos", maxCount: 4 },
  ]),
  (req, res) => {
    const b = req.body;
    if (!b.name || !b.district || !b.category) {
      return res.status(400).json({ error: "name, district and category are required." });
    }

    const images = (req.files?.images || []).map((f) => `/uploads/${f.filename}`);
    const videos = (req.files?.videos || []).map((f) => `/uploads/${f.filename}`);

    const place = {
      id: `community-${uuid()}`,
      name: b.name,
      district: b.district,
      category: b.category,
      image: images[0] || b.image || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1200&auto=format&fit=crop",
      images,
      videos,
      coords: { lat: parseFloat(b.lat) || 20.2961, lng: parseFloat(b.lng) || 85.8245 },
      nearestCity: b.nearestCity || "",
      distanceFromCity: b.distanceFromCity || "",
      travelTime: b.travelTime || "—",
      distanceFromCapital: "",
      shortDescription: b.shortDescription || "",
      history: b.history || b.shortDescription || "",
      bestTimeToVisit: b.bestTimeToVisit || "Year-round",
      entryFee: b.entryFee || "Not specified",
      nearbyAttractions: [],
      // Flip default to "pending" here if you want admin moderation before a
      // submission goes live, per the spec's optional moderation flow.
      status: "approved",
      submittedBy: req.user.name,
      submittedById: req.user.id,
      createdAt: new Date().toISOString(),
    };

    const db = readDb();
    db.places.push(place);
    writeDb(db);

    res.status(201).json({ place });
  }
);

export default router;
