import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { readDb, writeDb } from "../utils/db.js";
import { requireAuth, JWT_SECRET } from "../middleware/auth.js";

const router = Router();

const toPublicUser = (u) => ({ id: u.id, name: u.name, email: u.email });

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email and password are all required." });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }

  const db = readDb();
  if (db.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: "An account with this email already exists." });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: uuid(), name, email, passwordHash };
  db.users.push(user);
  writeDb(db);

  const token = jwt.sign(toPublicUser(user), JWT_SECRET, { expiresIn: "7d" });
  res.status(201).json({ token, user: toPublicUser(user) });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const db = readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) return res.status(401).json({ error: "Invalid email or password." });

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) return res.status(401).json({ error: "Invalid email or password." });

  const token = jwt.sign(toPublicUser(user), JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: toPublicUser(user) });
});

router.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

export default router;
