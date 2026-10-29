import { exercises } from "./exercises.js";

// Q1 → preferred Übungstyp order
const themaTypPriority = {
  "Beziehung":               ["Selbstbindung", "Beruhigung", "Loslassen"],
  "Stress / Kopf":           ["Beruhigung", "Loslassen", "Klarheit"],
  "Geld / Business":         ["Beruhigung", "Klarheit", "Magnetismus"],
  "Selbstwert":              ["Magnetismus", "Selbstbindung", "Beruhigung"],
  "Allgemeine Unsicherheit": ["Beruhigung", "Klarheit", "Selbstbindung"],
};

// Q2 answer → exercise Zustände that semantically match
const zustandAliases = {
  "Unruhe":      ["Unruhe", "Hektik", "Nervosität", "Gedanken", "Stress"],
  "Angst":       ["Angst", "Verlustangst", "Sichtbarkeitsangst", "Unsicherheit"],
  "Druck":       ["Druck", "Anspannung", "Geldstress", "Überforderung", "Stress"],
  "Traurigkeit": ["Leere", "Bedürftigkeit", "Sehnsucht"],
  "Leere":       ["Leere", "Bedürftigkeit", "Kontrolle", "Kleinmachen"],
  "Sehnsucht":   ["Sehnsucht", "Fixierung"],
};

// Q3 answer → exercise Bedürfnisse that semantically match
const beduerfnisAliases = {
  "Ruhe":      ["Ruhe"],
  "Halt":      ["Halt", "Selbstwert"],
  "Sicherheit":["Sicherheit"],
  "Klarheit":  ["Klarheit"],
  "Loslassen": ["Loslassen", "Entlastung"],
  "Vertrauen": ["Vertrauen", "Selbstvertrauen", "Präsenz", "Empfangen"],
};

/**
 * Score-based matching — finds the best exercise for the given answers.
 * Scoring:
 *   Typ rank 0: +10, rank 1: +6, rank 2: +3
 *   Zustand alias match: +5
 *   Bedürfnis alias match: +4
 * Tie-break: lower exercise ID wins (stable ordering).
 */
export function findExercise(thema, zustand, beduerfnis, avatar = 1) {
  const preferredTypes = themaTypPriority[thema] || [];
  const validZustaende  = zustandAliases[zustand]    || [zustand];
  const validBeduerfnisse = beduerfnisAliases[beduerfnis] || [beduerfnis];

  // Only pick from exercises that have actual audio files available
  const avatarSpecificExercises = exercises.filter(
    (ex) => ex.avatar === avatar && ex.audioAvailable !== false
  );

  let best = null;
  let bestScore = -1;

  for (const ex of avatarSpecificExercises) {
    let score = 0;

    // Typ priority
    const typRank = preferredTypes.indexOf(ex.typ);
    if (typRank === 0) score += 10;
    else if (typRank === 1) score += 6;
    else if (typRank === 2) score += 3;

    // Zustand match (any alias)
    const zustandMatch = ex.zustaende.some((z) =>
      validZustaende.some((v) => z.toLowerCase() === v.toLowerCase())
    );
    if (zustandMatch) score += 5;

    // Bedürfnis match (any alias)
    const beduerfnisMatch = ex.beduerfnisse.some((b) =>
      validBeduerfnisse.some((v) => b.toLowerCase() === v.toLowerCase())
    );
    if (beduerfnisMatch) score += 4;

    if (score > bestScore) {
      bestScore = score;
      best = ex;
    }
  }

  return best || avatarSpecificExercises[0];
}
