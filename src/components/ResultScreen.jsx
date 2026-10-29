import React from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import AudioPlayer from "./AudioPlayer";

const typColors = {
  "Beruhigung":    { text: "rgba(130,170,210,0.9)", bg: "rgba(130,170,210,0.07)", border: "rgba(130,170,210,0.25)" },
  "Selbstbindung": { text: "rgba(201,168,108,0.9)", bg: "rgba(201,168,108,0.07)", border: "rgba(201,168,108,0.25)" },
  "Loslassen":     { text: "rgba(185,145,210,0.9)", bg: "rgba(185,145,210,0.07)", border: "rgba(185,145,210,0.25)" },
  "Klarheit":      { text: "rgba(120,200,175,0.9)", bg: "rgba(120,200,175,0.07)", border: "rgba(120,200,175,0.25)" },
  "Magnetismus":   { text: "rgba(220,170,110,0.9)", bg: "rgba(220,170,110,0.07)", border: "rgba(220,170,110,0.25)" },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.72, ease: "easeOut" } },
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

const ResultScreen = ({ result, onReset }) => {
  if (!result) return null;
  const colors = typColors[result.typ] || typColors["Beruhigung"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "100vh",
        padding: "2.5rem 1.5rem", textAlign: "center",
        position: "relative", zIndex: 10, overflowY: "auto",
      }}
    >
      <motion.div
        variants={stagger} initial="hidden" animate="show"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 520 }}
      >
        {/* Label */}
        <motion.span variants={fadeUp} style={{
          color: "#C9A86C", fontSize: 10, letterSpacing: "0.35em",
          textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif", marginBottom: 18,
        }}>
          Deine Übung
        </motion.span>

        {/* Titel */}
        <motion.h1 variants={fadeUp} style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.9rem, 6vw, 3.2rem)",
          color: "#F0EAE0", lineHeight: 1.2, fontWeight: 400, marginBottom: 16,
        }}>
          {result.titel}
        </motion.h1>

        {/* Zusammenfassung */}
        <motion.p variants={fadeUp} style={{
          color: "rgba(240,234,224,0.5)", fontSize: "0.93rem",
          fontFamily: "'DM Sans', sans-serif", lineHeight: 1.65,
          maxWidth: 380, marginBottom: 8,
        }}>
          {result.zusammenfassung}
        </motion.p>

        {/* Ziel */}
        <motion.p variants={fadeUp} style={{
          color: colors.text, fontSize: "0.76rem",
          fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.04em",
          marginBottom: 20, opacity: 0.85,
        }}>
          Ziel: {result.ziel}
        </motion.p>

        {/* Badges */}
        <motion.div variants={fadeUp} style={{
          display: "flex", gap: 8, flexWrap: "wrap",
          justifyContent: "center", marginBottom: 32,
        }}>
          <Pill color={colors}>{result.typ}</Pill>
          <Pill color={muted}><Clock size={9} />{result.dauer}</Pill>
          <Pill color={muted}>Audio</Pill>
        </motion.div>

        {/* ─── AUDIO PLAYER ─── */}
        <motion.div variants={fadeUp} style={{ width: "100%", marginBottom: 36 }}>
          <AudioPlayer src={result.audio} accentColor={colors.text.replace("0.9","0.95").replace("0.85","0.95")} />
        </motion.div>

        {/* Reset */}
        <motion.button
          variants={fadeUp}
          onClick={onReset}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(240,234,224,0.25)", fontSize: 11, letterSpacing: "0.2em",
            textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif",
            padding: "8px 0", transition: "color 0.4s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A86C")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,234,224,0.25)")}
        >
          Neue Sitzung
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultScreen;
