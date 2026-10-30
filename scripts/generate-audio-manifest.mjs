// Liest public/audio und schreibt src/data/audioManifest.json.
// Läuft automatisch vor "npm run dev" und "npm run build".
// Nur Dateien mit dem Namensschema av<1-5>-ueb-<1-30>.m4a bzw. av<1-5>-erkl-<1-30>.m4a gelten als Audio.
import { readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const audioDir = join(root, "public", "audio");
const out = join(root, "src", "data", "audioManifest.json");

const valid = /^av([1-5])-(ueb|erkl)-(\d+)\.m4a$/;
const files = readdirSync(audioDir, { withFileTypes: true }).filter((e) => e.isFile() && !e.name.startsWith(".")).map((e) => e.name);

const ok = [];
const bad = [];
for (const f of files) {
  const m = f.match(valid);
  if (m && +m[3] >= 1 && +m[3] <= 30) ok.push(f);
  else bad.push(f);
}

mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(ok.sort(), null, 2) + "\n");

console.log(`Audio-Manifest: ${ok.length} gültige Dateien.`);
if (bad.length) {
  console.warn("\nFALSCH BENANNT (werden NICHT erkannt):");
  for (const f of bad) console.warn("  - " + f);
  console.warn("Erlaubt: av<1-5>-ueb-<1-30>.m4a und av<1-5>-erkl-<1-30>.m4a (alles klein), z. B. av3-ueb-6.m4a\n");
  if (process.argv.includes("--strict")) process.exit(1);
}
