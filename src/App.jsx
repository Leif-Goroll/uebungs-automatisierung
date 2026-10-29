import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "./components/WelcomeScreen";
import QuestionFlow from "./components/QuestionFlow";
import LeadForm from "./components/LeadForm";
import LoadingMatch from "./components/LoadingMatch";
import ResultScreen from "./components/ResultScreen";
import BlockedScreen from "./components/BlockedScreen";
import ExercisePlayerPage from "./components/ExercisePlayerPage";
import { findExercise } from "./data/matchingTable";
import { exercises } from "./data/exercises";
import { questions } from "./data/questions";

const DOMAIN = "https://go.dianahemmi.info";

// Avatar mapping: bereich value → avatar number
const AVATAR_MAP = {
  "Beziehung": 1,
  "Business": 2,
  "Maennlichkeit": 3,
  "Familie": 4,
  "Gewicht": 5,
};

// ─── Explanation titles per avatar (for week plan) ───

const explanationTitles1 = {
  1: "Warum Dein Nervensystem nicht gegen Dich arbeitet",
  2: "Warum Verstehen nicht heilt",
  3: "Warum Du nicht kaputt bist",
  4: "Was Regulation wirklich bedeutet",
  5: "Warum Dein Körper schneller reagiert als Dein Kopf",
  6: "Warum Du ihn nicht vergessen kannst",
  7: "Was Sehnsucht wirklich ist",
  8: "Warum Warten so anstrengend ist",
  9: "Warum Rückzug so weh tut",
  10: "Warum Du Dich selbst verlierst",
  11: "Warum Du Dich immer wieder anpasst",
  12: "Warum Grenzen Sicherheit schaffen",
  13: "Was passiert, wenn Du Dich selbst wählst",
  14: "Warum Dein Wert nicht von anderen abhängt",
  15: "Warum Würde reguliert",
  16: "Warum Geldstress ein Nervensystemthema ist",
  17: "Warum Druck selten mehr Geld bringt",
  18: "Warum Empfangen schwer sein kann",
  19: "Was Sicherheit wirklich bedeutet",
  20: "Warum Sichtbarkeit Angst machen kann",
  21: "Warum Gefühle nicht gefährlich sind",
  22: "Was Dein Körper mit Stress macht",
  23: "Warum Erschöpfung oft Schutz ist",
  24: "Warum Du manchmal nichts mehr fühlst",
  25: "Was passiert, wenn Du wieder weich wirst",
  26: "Warum Veränderung Wiederholung braucht",
  27: "Warum Ruhe magnetisch wirkt",
  28: "Was weibliche Präsenz wirklich ist",
  29: "Warum Vertrauen im Körper entsteht",
  30: "Wie Du lernst, Dir selbst wieder zu glauben"
};

const explanationTitles2 = {
  1: "Warum Geldstress ein Nervensystemthema ist",
  2: "Warum mehr Arbeit nicht automatisch mehr Sicherheit bringt",
  3: "Warum dein Körper bei Geld schneller reagiert als dein Kopf",
  4: "Warum Business nicht nur Strategie, sondern Zustand ist",
  5: "Warum Druck deine Kreativität blockiert",
  6: "Warum du nicht zu wenig weißt, sondern mehr Sicherheit brauchst",
  7: "Warum Existenzangst nicht mit Denken verschwindet",
  8: "Warum dein Nervensystem Umsatzschwankungen so stark spürt",
  9: "Warum Rechnungen deinen Körper in Alarm bringen können",
  10: "Warum Geld nicht nur Geld ist",
  11: "Warum Empfangen im Körper beginnt",
  12: "Warum Fülle kein Gedanke, sondern ein Zustand ist",
  13: "Warum du Geld nicht nur manifestieren, sondern halten können musst",
  14: "Warum mehr Umsatz manchmal Angst macht",
  15: "Warum stabile Einnahmen innere Stabilität brauchen",
  16: "Warum Sichtbarkeit Angst machen kann",
  17: "Warum du sichtbar sein darfst, ohne dich zu beweisen",
  18: "Warum Perfektionismus oft Schutz vor Bewertung ist",
  19: "Warum Content aus Druck anders wirkt als Content aus Präsenz",
  20: "Warum Sichtbarkeit nicht bedeutet, dich zu übergehen",
  21: "Warum dein Preis nicht nur eine Zahl ist",
  22: "Warum Verkaufen aus Regulation anders wirkt",
  23: "Warum Menschen deinem Zustand vertrauen",
  24: "Warum Nicht-Kaufen nichts über deinen Wert sagt",
  25: "Warum du deinen Wert im Körper halten darfst",
  26: "Warum Entscheidungen aus Druck selten frei sind",
  27: "Warum Klarheit erst nach Regulation entsteht",
  28: "Warum Wachstum Kapazität braucht",
  29: "Warum Erfolg dein Nervensystem aktivieren kann",
  30: "Warum dein Business sicherer wird, wenn du in dir sicher wirst"
};

const explanationTitles3 = {
  1: "Warum viele Männer funktionieren statt fühlen",
  2: "Warum Rückzug ein Schutzmechanismus sein kann",
  3: "Warum Kontrolle Sicherheit ersetzen soll",
  4: "Warum Druck im Körper entsteht",
  5: "Warum Dein Körper schneller reagiert als Dein Verstand",
  6: "Warum Verletzlichkeit keine Schwäche ist",
  7: "Warum viele Männer ihr Herz schützen",
  8: "Warum Nähe überfordernd sein kann",
  9: "Warum Männer sich zurückziehen, obwohl sie fühlen",
  10: "Warum Verbindung Präsenz braucht",
  11: "Warum Schuld Männer innerlich lähmen kann",
  12: "Warum Scham oft hinter Distanz steht",
  13: "Warum Verantwortung nicht Schuld bedeutet",
  14: "Warum Männer Angst haben, schwach zu wirken",
  15: "Warum Selbstverurteilung keine Veränderung schafft",
  16: "Warum Wahrheit einen regulierten Körper braucht",
  17: "Warum Klarheit nicht aus Druck entsteht",
  18: "Warum viele Männer ihre Wahrheit verschlucken",
  19: "Warum klare Worte mehr Sicherheit schaffen als Rückzug",
  20: "Warum innere Führung bei Selbstkontakt beginnt",
  21: "Warum Wut oft gestaute Kraft ist",
  22: "Warum männliche Kraft Erdung braucht",
  23: "Warum das Becken Sicherheit speichert",
  24: "Warum Sexualität Sicherheit braucht",
  25: "Warum Präsenz stärker wirkt als Kontrolle",
  26: "Warum Männer nicht alles alleine tragen müssen",
  27: "Warum Beziehung nicht gelöst, sondern gehalten werden will",
  28: "Warum Rückverbindung nach Rückzug entscheidend ist",
  29: "Warum Ruhe männliche Klarheit stärkt",
  30: "Warum Wahrheit die männlichste Form von Stärke ist"
};

const explanationTitles4 = {
  1: "Warum Kinder regulierte Eltern brauchen",
  2: "Warum Co-Regulation bei Dir beginnt",
  3: "Warum Kinder Zustände mehr spüren als Worte",
  4: "Warum Elternsein Dein Nervensystem stark fordert",
  5: "Warum Familienregulation nicht beim Kind beginnt",
  6: "Warum Schuld keine Verbindung schafft",
  7: "Warum Du keine perfekte Mutter und kein perfekter Vater sein musst",
  8: "Warum Fehler Teil von Bindung sind",
  9: "Warum Du Dich nach einem Ausbruch nicht verurteilen musst",
  10: "Warum Elternherzen so viel tragen",
  11: "Warum Kinderwut nicht automatisch Gefahr ist",
  12: "Warum starke Gefühle Deines Kindes Dich triggern können",
  13: "Warum Kinder grosse Gefühle nicht alleine regulieren können",
  14: "Warum Dein Kind nicht schwierig, sondern überfordert sein kann",
  15: "Warum Rückzug bei Kindern ein Schutz sein kann",
  16: "Warum Grenzen Sicherheit schenken",
  17: "Warum klare Führung nicht hart sein muss",
  18: "Warum Deine Stimme den Raum regulieren kann",
  19: "Warum Beziehung tiefer wirkt als Kontrolle",
  20: "Warum Erziehungsdruck Dich von Deinem Kind entfernt",
  21: "Warum äussere Unruhe innere Stabilität braucht",
  22: "Warum Alltagsstress das Familiensystem belastet",
  23: "Warum ein Zuhause vor allem ein Zustand ist",
  24: "Warum Kinder Übergänge oft schwer halten können",
  25: "Warum Trennungssituationen Eltern und Kinder aktivieren",
  26: "Warum Rückverbindung wichtiger ist als perfekte Reaktion",
  27: "Warum Entschuldigung Sicherheit schaffen kann",
  28: "Warum Dein Kind Dich nicht perfekt, sondern erreichbar braucht",
  29: "Warum Vertrauen im Familiensystem langsam wächst",
  30: "Warum Deine Regulation ein Geschenk an Dein Kind ist"
};

const explanationTitles5 = {
  1: "Warum Dein Körper nicht gegen Dich arbeitet",
  2: "Warum Essen oft ein Regulationsversuch ist",
  3: "Warum Kontrolle keine echte Sicherheit schenkt",
  4: "Warum Dein Nervensystem keine weitere Diät braucht",
  5: "Warum Körpervertrauen der Wendepunkt ist",
  6: "Warum Scham den Körper in Alarm bringt",
  7: "Warum Selbstkritik Veränderung blockiert",
  8: "Warum Du nicht undiszipliniert bist",
  9: "Warum Schuld nach dem Essen alte Muster verstärkt",
  10: "Warum Annahme nicht Aufgeben bedeutet",
  11: "Warum Heisshunger oft ein Sicherheitsruf ist",
  12: "Warum Hunger und Sättigung wieder Vertrauen brauchen",
  13: "Warum entspanntes Essen im Körper beginnt",
  14: "Warum Genuss Sicherheit braucht",
  15: "Warum Rückfälle keine Niederlagen sind",
  16: "Warum Gewicht manchmal Schutz bedeutet",
  17: "Warum Dein Bauch emotionale Spannung tragen kann",
  18: "Warum Dein Körper nicht über Druck loslässt",
  19: "Warum Körpervergleich Dich von Dir trennt",
  20: "Warum Dein Körper langsam wieder sicher werden darf",
  21: "Warum Weiblichkeit nicht vom Gewicht abhängt",
  22: "Warum Dein Becken für Körpervertrauen wichtig ist",
  23: "Warum Kontrolle oft abgeschnittene Weiblichkeit schützt",
  24: "Warum Empfangen auch beim Essen beginnt",
  25: "Warum Dein jetziger Körper schon würdig ist",
  26: "Warum liebevolle Disziplin anders wirkt als Härte",
  27: "Warum Leichtigkeit für Dein System ungewohnt sein kann",
  28: "Warum Frieden mit Essen möglich ist",
  29: "Warum Dein Körper neue Erfahrungen braucht",
  30: "Warum Weiblichkeit dort beginnt, wo Du Dir wieder vertraust"
};

// Map avatar number → explanation titles
const EXPLANATION_TITLES = {
  1: explanationTitles1,
  2: explanationTitles2,
  3: explanationTitles3,
  4: explanationTitles4,
  5: explanationTitles5,
};

// ─── URL helpers per avatar ───

function avatarUrlPrefix(avatar) {
  if (avatar === 1) return "";
  return `-av${avatar}`;
}

function exercisePageUrl(avatar, id) {
  if (avatar === 1) return `${DOMAIN}/uebung${id}`;
  return `${DOMAIN}/uebung-av${avatar}-${id}`;
}

function explanationPageUrl(avatar, id) {
  if (avatar === 1) return `${DOMAIN}/erklaerung${id}`;
  return `${DOMAIN}/erklaerung-av${avatar}-${id}`;
}

function exerciseAudioFileUrl(avatar, id) {
  return `${DOMAIN}/audio/av${avatar}-erkl-${id}.m4a`;
}

// Parse pathname to see if it matches any exercise/explanation pattern
function parsePathname(pathname) {
  let decoded = "";
  try {
    decoded = decodeURIComponent(pathname);
  } catch (e) {
    decoded = pathname;
  }
  
  const path = decoded.toLowerCase().trim();
  
  // Matches: /uebung1, /uebung-1, /uebung/1, /übung1, /ub1, /uebung-av2-1, /uebung-av3-1, etc.
  const exerciseMatch = path.match(/^\/(uebung|übung|ub)(?:[-/]?av(\d+))?[-\/]?(\d+)$/);
  if (exerciseMatch) {
    const avatar = exerciseMatch[2] ? parseInt(exerciseMatch[2], 10) : 1;
    const id = parseInt(exerciseMatch[3], 10);
    if (id >= 1 && id <= 30 && avatar >= 1 && avatar <= 5) {
      return { type: "exercise", id, avatar };
    }
  }
  
  // Matches: /erklaerung1, /erklaerung-av2-1, /erklaerung-av3-1, etc.
  const explanationMatch = path.match(/^\/(erklaerung|erklärung|e-ub|e-üb)(?:[-/]?av(\d+))?[-\/]?(\d+)$/);
  if (explanationMatch) {
    const avatar = explanationMatch[2] ? parseInt(explanationMatch[2], 10) : 1;
    const id = parseInt(explanationMatch[3], 10);
    if (id >= 1 && id <= 30 && avatar >= 1 && avatar <= 5) {
      return { type: "explanation", id, avatar };
    }
  }
  
  return null;
}

// Randomly pick n items from an array (no duplicates)
function pickRandom(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// Build a 7-day week plan: 4 exercises + 3 explanations, interleaved
// Pattern: Übung, Erklärung, Übung, Erklärung, Übung, Erklärung, Übung
// Uses ALL exercises (including non-audio ones) for the 7-day plan
function buildWeekPlan(matchedExercise) {
  const avatar = matchedExercise.avatar || 1;
  const titles = EXPLANATION_TITLES[avatar] || explanationTitles1;

  // Get ALL exercises for this avatar (including those without audio, for the webhook)
  const allAvatarExercises = exercises.filter((e) => e.avatar === avatar);

  // 1. Pick 3 more exercises from the same cluster & avatar (excluding matched)
  const sameCluster = allAvatarExercises.filter(
    (e) => e.cluster === matchedExercise.cluster && e.id !== matchedExercise.id
  );
  let extra3 = pickRandom(sameCluster, 3);
  if (extra3.length < 3) {
    const fallbackPool = allAvatarExercises.filter(
      (e) => e.id !== matchedExercise.id && !extra3.some((ex) => ex.id === e.id)
    );
    const needed = 3 - extra3.length;
    extra3 = [...extra3, ...pickRandom(fallbackPool, needed)];
  }
  const classicalFour = [matchedExercise, ...extra3];

  // 2. Map corresponding 3 explanation exercises
  const explanationThree = classicalFour.slice(0, 3).map((ex) => ({
    id: ex.id,
    type: "explanation",
    avatar: avatar,
    title: titles[ex.id] || `Erklärung ${ex.id}`,
    pageUrl: explanationPageUrl(avatar, ex.id),
  }));

  // 3. Interleave: Übung, Erklärung, Übung, Erklärung, Übung, Erklärung, Übung
  return [
    {
      day: 1,
      type: "exercise",
      title: classicalFour[0].titel,
      link: exercisePageUrl(avatar, classicalFour[0].id),
    },
    {
      day: 2,
      type: "explanation",
      title: explanationThree[0].title,
      link: explanationThree[0].pageUrl,
    },
    {
      day: 3,
      type: "exercise",
      title: classicalFour[1].titel,
      link: exercisePageUrl(avatar, classicalFour[1].id),
    },
    {
      day: 4,
      type: "explanation",
      title: explanationThree[1].title,
      link: explanationThree[1].pageUrl,
    },
    {
      day: 5,
      type: "exercise",
      title: classicalFour[2].titel,
      link: exercisePageUrl(avatar, classicalFour[2].id),
    },
    {
      day: 6,
      type: "explanation",
      title: explanationThree[2].title,
      link: explanationThree[2].pageUrl,
    },
    {
      day: 7,
      type: "exercise",
      title: classicalFour[3]?.titel ?? classicalFour[0].titel,
      link: exercisePageUrl(avatar, classicalFour[3]?.id ?? classicalFour[0].id),
    },
  ];
}

function getWebhookCluster(exercise) {
  if (!exercise) return "";
  if (exercise.avatar === 1) {
    return exercise.cluster || "";
  }
  // Avatar 2 mapping
  if (exercise.avatar === 2) {
    switch (exercise.cluster) {
      case "cluster_sichtbarkeit-erfolg":
        return "cluster_sichtbarkeit";
      case "cluster_druck-leistung":
        return "cluster_funktionieren-business";
      case "cluster_selbstwert-beziehung":
        return "cluster_verkaufen-wert";
      case "cluster_geld-umsatz":
        if ([1, 3, 11, 17, 19].includes(exercise.id)) {
          return "cluster_geldstress";
        }
        return "cluster_umsatz-empfang";
      case "cluster_klarheit-ausrichtung":
        if ([15, 16].includes(exercise.id)) {
          return "cluster_verkaufen-wert";
        }
        return "cluster_umsatz-empfang";
      default:
        return exercise.cluster || "";
    }
  }
  // Avatars 3, 4, 5: use cluster directly
  return exercise.cluster || "";
}

function App() {
  const [screen, setScreen] = useState("welcome"); // welcome | questions | leadForm | loading | result | blocked
  const [blockReason, setBlockReason] = useState("");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });
  const [result, setResult] = useState(null);
  
  // Custom router state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  const parsedRoute = parsePathname(currentPath);

  const handleStart = () => {
    setStep(0);
    setAnswers({});
    setUserInfo({ name: "", email: "" });
    setResult(null);
    setScreen("questions");
  };

  const handleQuestionSelect = (key, value) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    setTimeout(() => {
      if (step < questions.length - 1) {
        setStep((s) => s + 1);
      } else {
        // All questions answered — determine avatar from bereich answer
        const avatar = AVATAR_MAP[updated.bereich] || 1;
        const matched = findExercise(updated.thema, updated.zustand, updated.beduerfnis, avatar);
        setResult(matched);
        setScreen("leadForm");
      }
    }, 600);
  };

  const handleLeadSubmit = async (userData) => {
    setUserInfo(userData);
    setScreen("loading");

    const surveyWeekPlan = buildWeekPlan(result);
    const surveyAvatar = AVATAR_MAP[answers.bereich] || 1;
    const mappedCluster = getWebhookCluster(result);

    try {
      // Use a 30-second timeout so slow n8n responses don't fail the user
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      let res;
      try {
        res = await fetch("https://n8n.srv1410863.hstgr.cloud/webhook/survey", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            // Contact data
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            // Quiz answers
            bereich: answers.bereich || "",
            thema: answers.thema || "",
            zustand: answers.zustand || "",
            beduerfnis: answers.beduerfnis || "",
            avatar: surveyAvatar,
            cluster: mappedCluster,
            tag: mappedCluster,
            Cluster: mappedCluster,
            // First exercise
            exercise: result.titel,
            pageUrl: exercisePageUrl(surveyAvatar, result.id),
            // 7-day plan: 4 Übungen + 3 Erklärungen
            weekPlan: surveyWeekPlan,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (fetchErr) {
        console.warn("Webhook fetch failed (network/timeout):", fetchErr);
        clearTimeout(timeoutId);
        setBlockReason("Die Verbindung zur Datenbank ist fehlgeschlagen oder zeitlich abgelaufen. Bitte versuche es später noch einmal.");
        setScreen("blocked");
        return;
      }
      clearTimeout(timeoutId);

      let status = "";
      let reasonRaw = "";

      try {
        const text = await res.text();
        try {
          const raw = JSON.parse(text);
          const data = (Array.isArray(raw) ? raw[0] : raw) || {};
          
          const findKey = (obj, targetKey) => {
            const entry = Object.entries(obj).find(([k]) => k.trim().toLowerCase() === targetKey.toLowerCase());
            return entry ? entry[1] : null;
          };

          status = (findKey(data, "status") || "").toString().trim().toLowerCase();
          reasonRaw = (findKey(data, "reason") || "").toString().trim().toLowerCase();
        } catch (jsonErr) {
          const cleanText = text.trim().toLowerCase();
          if (cleanText === "invalid" || cleanText.includes("status:invalid") || cleanText.includes("status: invalid")) {
            status = "invalid";
          } else if (cleanText === "valid" || cleanText.includes("status:valid") || cleanText.includes("status: valid")) {
            status = "valid";
          }
        }
      } catch (readErr) {
        console.error("Failed to read webhook response:", readErr);
      }

      if (status === "valid") {
        setScreen("result");
      } else {
        // Any response that is not explicitly "valid" is blocked
        if (reasonRaw.includes("email") || reasonRaw.includes("mail") || reasonRaw.includes("limit")) {
          setBlockReason("Diese E-Mail-Adresse wurde bereits verwendet oder das Nutzungslimit wurde erreicht.");
        } else {
          setBlockReason("Diese E-Mail-Adresse wurde bereits verwendet, um eine Übung freizuschalten. Pro E-Mail ist nur eine Übung möglich.");
        }
        setScreen("blocked");
      }
    } catch (err) {
      console.error("Webhook handling failed:", err);
      setBlockReason("Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später noch einmal.");
      setScreen("blocked");
    }
  };

  const handleReset = () => {
    window.history.pushState({}, "", "/");
    setCurrentPath("/");
    setScreen("welcome");
    setStep(0);
    setAnswers({});
    setResult(null);
    setUserInfo({ name: "", email: "" });
  };

  const handleBackToSurvey = () => {
    window.history.pushState({}, "", "/");
    setCurrentPath("/");
    setScreen("welcome");
  };

  return (
    <div
      className="relative min-h-screen overflow-y-auto overflow-x-hidden"
      style={{ background: "#0A0907", color: "#F0EAE0", fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,108,0.04) 0%, transparent 70%)",
            animation: "ambientPulse 8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <style>{`
        @keyframes ambientPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {parsedRoute ? (
            <ExercisePlayerPage
              key={`player-${parsedRoute.type}-${parsedRoute.avatar}-${parsedRoute.id}`}
              type={parsedRoute.type}
              id={parsedRoute.id}
              avatar={parsedRoute.avatar}
              onBackToSurvey={handleBackToSurvey}
            />
          ) : screen === "welcome" ? (
            <WelcomeScreen key="welcome" onStart={handleStart} />
          ) : screen === "questions" ? (
            <QuestionFlow
              key={`step-${step}`}
              step={step}
              totalSteps={questions.length}
              question={questions[step]}
              answers={answers}
              onSelect={handleQuestionSelect}
            />
          ) : screen === "leadForm" ? (
            <LeadForm key="lead" onSubmit={handleLeadSubmit} />
          ) : screen === "loading" ? (
            <LoadingMatch key="loading" />
          ) : null}
          {!parsedRoute && screen === "blocked" && (
            <BlockedScreen key="blocked" reason={blockReason} onReset={handleReset} />
          )}
          {!parsedRoute && screen === "result" && (
            <ResultScreen key="result" result={result} onReset={handleReset} />
          )}
        </AnimatePresence>
      </main>

      {/* Decorative bottom line */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none" style={{ opacity: 0.2 }}>
        <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom, transparent, #C9A86C, transparent)" }} />
      </div>
    </div>
  );
}

export default App;
