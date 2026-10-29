import React from "react";
import { motion } from "framer-motion";
import { Clock, ArrowLeft } from "lucide-react";
import AudioPlayer from "./AudioPlayer";
import { exercises } from "../data/exercises";
import {
  explanationTitles1,
  explanationDescriptions1,
  explanationTitles2,
  explanationDescriptions2,
  explanationTitles3,
  explanationDescriptions3,
  explanationTitles4,
  explanationDescriptions4,
  explanationTitles5,
  explanationDescriptions5
} from "../data/explanations";

const typColors = {
  "Beruhigung":    { text: "rgba(130,170,210,0.9)", bg: "rgba(130,170,210,0.07)", border: "rgba(130,170,210,0.25)" },
  "Selbstbindung": { text: "rgba(201,168,108,0.9)", bg: "rgba(201,168,108,0.07)", border: "rgba(201,168,108,0.25)" },
  "Loslassen":     { text: "rgba(185,145,210,0.9)", bg: "rgba(185,145,210,0.07)", border: "rgba(185,145,210,0.25)" },
  "Klarheit":      { text: "rgba(120,200,175,0.9)", bg: "rgba(120,200,175,0.07)", border: "rgba(120,200,175,0.25)" },
  "Magnetismus":   { text: "rgba(220,170,110,0.9)", bg: "rgba(220,170,110,0.07)", border: "rgba(220,170,110,0.25)" },
  "Erklärung":     { text: "rgba(201,168,108,0.9)", bg: "rgba(201,168,108,0.07)", border: "rgba(201,168,108,0.25)" },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Pill = ({ children, color }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: "4px 14px", borderRadius: 99,
    border: `1px solid ${color.border}`,
    background: color.bg, color: color.text,
    fontSize: 10, letterSpacing: "0.22em",
    textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6,
  }}>
    {children}
  </span>
);

const muted = { text: "rgba(240,234,224,0.4)", bg: "rgba(240,234,224,0.04)", border: "rgba(240,234,224,0.1)" };

const ExercisePlayerPage = ({ type, id, avatar = 1, onBackToSurvey }) => {
  let item = null;
  if (type === "exercise") {
    item = exercises.find((e) => e.id === id && e.avatar === avatar);
  } else if (type === "explanation") {
    let titles = explanationTitles1;
    let descriptions = explanationDescriptions1;
    let audioPath = `/audio/av1-erkl-${id}.m4a`;

    if (avatar === 2) {
      titles = explanationTitles2;
      descriptions = explanationDescriptions2;
      audioPath = `/audio/av2-erkl-${id}.m4a`;
    } else if (avatar === 3) {
      titles = explanationTitles3;
      descriptions = explanationDescriptions3;
      audioPath = id <= 5
        ? `/audio/Avatar_3_alle_Erklaerungen/AV3-E-${id}.m4a`
        : `/audio/av3-erkl-${id}.m4a`;
    } else if (avatar === 4) {
      titles = explanationTitles4;
      descriptions = explanationDescriptions4;
      audioPath = id <= 5
        ? `/audio/Avatar_4_alle_Erklaerungen/AV4-E-${id}.m4a`
        : `/audio/av4-erkl-${id}.m4a`;
    } else if (avatar === 5) {
      titles = explanationTitles5;
      descriptions = explanationDescriptions5;
      audioPath = id <= 5
        ? `/audio/Avatar_5_alle_Erklaerungen/AV5-E-${id}.m4a`
        : `/audio/av5-erkl-${id}.m4a`;
    }

    const title = titles[id];
    if (title) {
      item = {
        id,
        titel: title,
        typ: "Erklärung",
        dauer: "3-5 min",
        zusammenfassung: descriptions[id] || "Regulation und Selbsterkenntnis für dein Nervensystem.",
        ziel: "Kernaussage verinnerlichen und regulieren",
        audio: audioPath
      };
    }
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <h1 className="text-2xl font-serif text-primary mb-4">Übung nicht gefunden</h1>
        <p className="text-muted mb-8 font-sans max-w-sm">Diese Übung scheint nicht zu existieren oder die ID ist fehlerhaft.</p>
        <button
          onClick={onBackToSurvey}
          className="px-6 py-3 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-300 uppercase text-xs tracking-wider"
        >
          Zum Fragebogen
        </button>
      </div>
    );
  }

  const colors = typColors[item.typ] || typColors["Beruhigung"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "100vh",
        padding: "2.5rem 1.5rem", textAlign: "center",
        position: "relative", zIndex: 10, overflowY: "auto",
      }}
    >
      {/* Back to survey button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={onBackToSurvey}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(240,234,224,0.45)",
            fontSize: 11,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            padding: "8px",
            transition: "color 0.3s"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A86C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,234,224,0.45)")}
        >
          <ArrowLeft size={14} />
          <span>Startseite</span>
        </button>
      </div>

      <motion.div
        variants={stagger} initial="hidden" animate="show"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 520 }}
      >
        {/* Label */}
        <motion.span variants={fadeUp} style={{
          color: "#C9A86C", fontSize: 10, letterSpacing: "0.35em",
          textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 18,
        }}>
          {type === "explanation" ? "Wissen & Integration" : "Deine tägliche Übung"}
        </motion.span>

        {/* Titel */}
        <motion.h1 variants={fadeUp} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.9rem, 6vw, 3.2rem)",
          color: "#F0EAE0", lineHeight: 1.2, fontWeight: 400, marginBottom: 16,
        }}>
          {item.titel}
        </motion.h1>

        {/* Zusammenfassung */}
        <motion.p variants={fadeUp} style={{
          color: "rgba(240,234,224,0.5)", fontSize: "0.93rem",
          fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65,
          maxWidth: 380, marginBottom: 8,
        }}>
          {item.zusammenfassung}
        </motion.p>

        {/* Ziel */}
        <motion.p variants={fadeUp} style={{
          color: colors.text, fontSize: "0.76rem",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em",
          marginBottom: 20, opacity: 0.85,
        }}>
          Ziel: {item.ziel}
        </motion.p>

        {/* Badges */}
        <motion.div variants={fadeUp} style={{
          display: "flex", gap: 8, flexWrap: "wrap",
          justifyContent: "center", marginBottom: 32,
        }}>
          <Pill color={colors}>{item.typ}</Pill>
          <Pill color={muted}><Clock size={9} />{item.dauer}</Pill>
          <Pill color={muted}>Audio</Pill>
        </motion.div>

        {/* ─── AUDIO PLAYER ─── */}
        <motion.div variants={fadeUp} style={{ width: "100%", marginBottom: 36 }}>
          <AudioPlayer src={item.audio} accentColor={colors.text.replace("0.9","0.95").replace("0.85","0.95")} />
        </motion.div>

        {/* ─── WHATSAPP GROUP ─── */}
        <motion.div
          variants={fadeUp}
          style={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            gap: 12,
            alignItems: "center",
            width: "100%",
            maxWidth: 420,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: "20px 24px"
          }}
        >
          <span style={{ fontSize: 11, color: "rgba(240,234,224,0.45)", fontFamily: "'DM Sans', sans-serif" }}>
            Tritt unserer WhatsApp-Gruppe bei für mehr Content
          </span>
          <motion.a
            href="https://whatsapp.com/channel/0029VbDMZda002TG5AOFvX1E"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              background: "#25D366",
              color: "#FFFFFF",
              padding: "14px 20px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              border: "none",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(37, 211, 102, 0.15)",
            }}
          >
            <span>Gruppe beitreten</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.002-2.634-1.018-5.11-2.873-6.969-1.854-1.859-4.324-2.883-6.96-2.885-5.433 0-9.858 4.413-9.861 9.848-.001 1.761.47 3.483 1.365 5.018L1.97 21.925l5.228-1.912zm11.385-6.705c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.668.149-.198.297-.766.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.174.2-.298.3-.496.099-.198.05-.372-.025-.521-.075-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
            </svg>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ExercisePlayerPage;
