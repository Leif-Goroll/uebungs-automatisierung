import React from "react";
import { motion } from "framer-motion";
import { ShieldX } from "lucide-react";

const BlockedScreen = ({ reason, onReset }) => {
  return (
    <motion.div
      key="blocked"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2.5rem 1.5rem",
        textAlign: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: 440,
          width: "100%",
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "rgba(201,168,108,0.08)",
            border: "1px solid rgba(201,168,108,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <ShieldX size={28} style={{ color: "#C9A86C" }} />
        </motion.div>

        {/* Label */}
        <span style={{
          color: "#C9A86C",
          fontSize: 10,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
          marginBottom: 16,
          display: "block",
        }}>
          Zugang nicht möglich
        </span>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 5.5vw, 2.8rem)",
          color: "#F0EAE0",
          lineHeight: 1.25,
          fontWeight: 400,
          marginBottom: 20,
        }}>
          Diese Übung kann nicht freigeschaltet werden.
        </h1>

        {/* Reason box */}
        <div style={{
          background: "rgba(201,168,108,0.06)",
          border: "1px solid rgba(201,168,108,0.2)",
          borderRadius: 12,
          padding: "18px 24px",
          marginBottom: 36,
          width: "100%",
        }}>
          <p style={{
            color: "rgba(240,234,224,0.7)",
            fontSize: "0.9rem",
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.65,
            margin: 0,
          }}>
            {reason || "Dein Zugang konnte nicht bestätigt werden. Möglicherweise wurde diese E-Mail-Adresse bereits verwendet oder das Nutzungslimit wurde erreicht."}
          </p>
        </div>



        {/* Back button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          style={{
            background: "none",
            border: "1px solid rgba(201,168,108,0.3)",
            borderRadius: 8,
            cursor: "pointer",
            color: "rgba(240,234,224,0.4)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            padding: "12px 28px",
            transition: "color 0.3s, border-color 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#C9A86C";
            e.currentTarget.style.borderColor = "rgba(201,168,108,0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240,234,224,0.4)";
            e.currentTarget.style.borderColor = "rgba(201,168,108,0.3)";
          }}
        >
          Zurück zum Start
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default BlockedScreen;
