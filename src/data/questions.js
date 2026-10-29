// Fixed 4-question flow
export const questions = [
  {
    id: 1,
    key: "bereich",
    question: "In welchem Lebensbereich wünschst Du Dir gerade am meisten Regulation und innere Sicherheit?",
    options: [
      {
        label: "Frauen, Liebe & Beziehung",
        description: "Ich bin eine Frau und wünsche mir mehr innere Sicherheit in Liebe, Dating oder Beziehung.",
        value: "Beziehung"
      },
      {
        label: "Frauen, Geld & Business",
        description: "Ich bin eine Frau und wünsche mir mehr Regulation rund um Geld, Erfolg, Sichtbarkeit oder mein Business.",
        value: "Business"
      },
      {
        label: "Männlichkeit & innere Klarheit",
        description: "Ich bin ein Mann und wünsche mir mehr Klarheit, Präsenz und Verbindung zu mir selbst.",
        value: "Maennlichkeit"
      },
      {
        label: "Familie & Kinder",
        description: "Ich bin Mutter oder Vater und wünsche mir mehr Ruhe, Verbindung und Sicherheit im Familiensystem.",
        value: "Familie"
      },
      {
        label: "Frauen, Weiblichkeit & Gewicht",
        description: "Ich bin eine Frau und sehne mich nach mehr Weiblichkeit und Zufriedenheit in meinem eigenen Körper.",
        value: "Gewicht"
      }
    ]
  },
  {
    id: 2,
    key: "thema",
    question: "Was beschäftigt Dich gerade am meisten?",
    options: [
      { label: "Beziehung", value: "Beziehung" },
      { label: "Stress / Kopf", value: "Stress / Kopf" },
      { label: "Geld / Business", value: "Geld / Business" },
      { label: "Selbstwert", value: "Selbstwert" },
      { label: "Allgemeine Unsicherheit", value: "Allgemeine Unsicherheit" },
    ],
  },
  {
    id: 3,
    key: "zustand",
    question: "Was fühlst Du gerade am stärksten?",
    options: [
      { label: "Unruhe", value: "Unruhe" },
      { label: "Angst", value: "Angst" },
      { label: "Druck", value: "Druck" },
      { label: "Traurigkeit", value: "Traurigkeit" },
      { label: "Leere", value: "Leere" },
      { label: "Sehnsucht", value: "Sehnsucht" },
    ],
  },
  {
    id: 4,
    key: "beduerfnis",
    question: "Was brauchst Du gerade am meisten?",
    options: [
      { label: "Ruhe", value: "Ruhe" },
      { label: "Halt", value: "Halt" },
      { label: "Sicherheit", value: "Sicherheit" },
      { label: "Klarheit", value: "Klarheit" },
      { label: "Loslassen", value: "Loslassen" },
      { label: "Vertrauen", value: "Vertrauen" },
    ],
  },
];
