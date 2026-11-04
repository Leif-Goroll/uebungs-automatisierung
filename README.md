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
- `docs/Uebungsbibliothek_Mapping_V.4.xlsx` – Übungsbibliothek (Quelle der Wahrheit für Titel/IDs)
- `fehlende-audios.md` – Liste der Audios, die noch fehlen

## Audio-Dateien (so werden neue Audios live)

Lege die Datei in `public/audio/` ab, mit **genau** diesem Namen (alles klein, Endung `.m4a`):

| Was | Name | Beispiel |
|---|---|---|
| Übung | `av<Avatar 1-5>-ueb-<Nr 1-30>.m4a` | `av3-ueb-6.m4a` |
| Erklärung | `av<Avatar 1-5>-erkl-<Nr 1-30>.m4a` | `av4-erkl-12.m4a` |

Mehr ist nicht nötig: Beim nächsten Build erkennt `scripts/generate-audio-manifest.mjs` die Datei automatisch, die Übung wird freigeschaltet und im Matching berücksichtigt. Die Nummer entspricht der ID in `docs/Uebungsbibliothek_Mapping_V.4.xlsx`.

Falsch benannte Dateien werden nicht erkannt. `npm run check:audio` listet sie auf; beim Build erscheint eine Warnung im Log.

Stand: Avatar 1 und 2 komplett (30/30 Übungen, 30/30 Erklärungen). Avatar 3, 4, 5: je 5/30 – siehe `fehlende-audios.md`.

## Weitere Ordner

- `docs/` – Mapping-Excel und Master-PDFs der Avatare

Hinweis: Jeder Push auf `main` wird automatisch über Netlify veröffentlicht (go.dianahemmi.info).
