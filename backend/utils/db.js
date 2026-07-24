import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "..", "data", "db.json");

// Tiny file-backed "database" so this backend runs with zero external
// services. Swap these functions for Mongoose models when you move to
// MongoDB — every route calls only `readDb` / `writeDb`, so that's the
// only file you need to touch.

export function readDb() {
  const raw = readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

export function writeDb(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
