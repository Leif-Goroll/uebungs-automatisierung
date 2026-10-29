# Übungs-Automatisierung (Diana Hemmi)

React + Vite App, die Nutzer:innen per Fragenfluss zu passenden Nervensystem-Übungen (Audio) führt. Hosting über Netlify (`netlify.toml`).

## Starten

```bash
npm install
npm run dev      # lokaler Dev-Server
npm run build    # Build nach dist/ (kopiert public/ mit)
```

## Struktur

- `src/data/exercises.js` – alle Übungen (5 Avatare × 30), inkl. `audio`-Pfad
- `src/data/explanations.js` – Erklärungen
- `src/data/questions.js`, `matchingTable.js` – Fragen und Matching-Logik
- `public/audio/` – alle Audiodateien (`.m4a`)
- `public/audio/Uebungsbibliothek_Mapping_V.4.xlsx` – Übungsbibliothek (Quelle der Wahrheit für Titel/IDs)
- `fehlende-audios.md` – Liste der Audios, die noch fehlen

## Audio-Dateien

Benennung: `av<Avatar>-ueb-<Nr>.m4a` (Übung) und `av<Avatar>-erkl-<Nr>.m4a` (Erklärung), z. B. `av3-ueb-6.m4a`.

Stand:

| Avatar | Übungen | Erklärungen |
|---|---|---|
| 1, 2 | 30/30 | 30/30 |
| 3, 4, 5 | 5/30 (liegen noch in `Avatar_X_alle_…/` als `AVX-UeB-n.m4a` / `AVX-E-n.m4a`) | 5/30 |

**Audio hinzufügen:**
1. Datei als `.m4a` exakt wie oben benennen und nach `public/audio/` legen.
2. In `src/data/exercises.js` prüfen, dass der `audio`-Pfad der Übung auf die Datei zeigt (für Avatar 3–5 Übung 6–30 zeigen die Pfade schon auf `/audio/av<N>-ueb-<Nr>.m4a`).
3. Eintrag in `fehlende-audios.md` streichen, committen, Pull Request öffnen.

Offene Punkte: Avatar 3–5 haben für Nr. 6–30 noch keine Audios (150 Stück); die 5 vorhandenen pro Typ liegen in Unterordnern und könnten auf das einheitliche Namensschema umbenannt werden.
