import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LeadForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ firstname: "", lastname: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.firstname || !formData.lastname || !formData.email) {
      setError("Bitte fülle alle Felder aus, um Deine Übung zu erhalten.");
      return;
    }

    setIsSubmitting(true);
    // Slight delay for premium feel
    setTimeout(() => {
      onSubmit(formData);
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-10 w-full max-w-md mx-auto px-6 py-12 flex flex-col justify-center min-h-screen"
    >
      <div className="text-center mb-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "#C9A86C",
            fontSize: 10,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif",
            display: "block",
            marginBottom: 12,
          }}
        >
          Fast geschafft
        </motion.span>
        <h2
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.8rem, 5vw, 2.4rem)",
            color: "#F0EAE0",
            lineHeight: 1.2,
            fontWeight: 400,
          }}
        >
          Wohin dürfen wir Deine Übung senden?
        </h2>
        <p style={{
          color: "rgba(240,234,224,0.45)",
          fontSize: "0.9rem",
          marginTop: 12,
          fontFamily: "'DM Sans', sans-serif"
        }}>
          Gib Deine Daten an, um direkt zu Deiner personalisierten Audio-Übung zu gelangen.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label style={{
              display: "block",
              color: "rgba(240,234,224,0.4)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Vorname
            </label>
            <input
              type="text"
              value={formData.firstname}
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              placeholder="Maria"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,108,0.15)",
                borderRadius: 8,
                padding: "14px 16px",
                color: "#F0EAE0",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#C9A86C")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,108,0.15)")}
            />
          </div>
          <div>
            <label style={{
              display: "block",
              color: "rgba(240,234,224,0.4)",
              fontSize: 10,
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: 8,
              fontFamily: "'DM Sans', sans-serif"
            }}>
              Nachname
            </label>
            <input
              type="text"
              value={formData.lastname}
              onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              placeholder="Müller"
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(201,168,108,0.15)",
                borderRadius: 8,
                padding: "14px 16px",
                color: "#F0EAE0",
                fontFamily: "'DM Sans', sans-serif",
                outline: "none",
                transition: "border-color 0.3s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#C9A86C")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,108,0.15)")}
            />
          </div>
        </div>

        <div>
          <label style={{
            display: "block",
            color: "rgba(240,234,224,0.4)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: 8,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Deine E-Mail
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="maria@beispiel.de"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(201,168,108,0.15)",
              borderRadius: 8,
              padding: "14px 16px",
              color: "#F0EAE0",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#C9A86C")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(201,168,108,0.15)")}
          />
          <div style={{
            marginTop: 12,
            padding: "12px 14px",
            background: "rgba(201, 168, 108, 0.05)",
            border: "1px solid rgba(201, 168, 108, 0.25)",
            borderRadius: 6,
            fontFamily: "'DM Sans', sans-serif",
            lineHeight: 1.45,
          }}>
            <p style={{
              fontSize: "0.78rem",
              color: "#F0EAE0",
              margin: 0,
            }}>
              <strong style={{ color: "#C9A86C", letterSpacing: "0.05em", textTransform: "uppercase", fontSize: "0.7rem", display: "block", marginBottom: 4 }}>
                ⚠️ Wichtig vor dem Absenden:
              </strong>
              Da E-Mails häufig im Spam-Filter hängen bleiben, prüfe bitte unbedingt deinen <strong>Spam- und Werbung-Ordner</strong> direkt nach dem Absenden. Markiere die E-Mail als „Kein Spam“, um deine tägliche Übung zuverlässig zu erhalten.
            </p>
          </div>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                color: "#C9A86C",
                fontSize: 12,
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "center",
              }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
          style={{
            width: "100%",
            background: "#C9A86C",
            color: "#0A0907",
            padding: "16px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            fontFamily: "'DM Sans', sans-serif",
            cursor: isSubmitting ? "wait" : "pointer",
            marginTop: 10,
            border: "none",
          }}
        >
          {isSubmitting ? "Wird verarbeitet..." : "Übung erhalten"}
        </motion.button>

        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
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
              padding: "16px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              border: "none",
              textDecoration: "none",
              boxShadow: "0 4px 12px rgba(37, 211, 102, 0.2)",
            }}
          >
            <span>Gruppe beitreten</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.863-9.847.002-2.634-1.018-5.11-2.873-6.969-1.854-1.859-4.324-2.883-6.96-2.885-5.433 0-9.858 4.413-9.861 9.848-.001 1.761.47 3.483 1.365 5.018L1.97 21.925l5.228-1.912zm11.385-6.705c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.668.149-.198.297-.766.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.174.2-.298.3-.496.099-.198.05-.372-.025-.521-.075-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
            </svg>
          </motion.a>
        </div>
      </form>

      <p style={{
        textAlign: "center",
        fontSize: 9,
        color: "rgba(240,234,224,0.25)",
        marginTop: 24,
        fontFamily: "'DM Sans', sans-serif",
        lineHeight: 1.5,
      }}>
        Durch Deine Anmeldung erhältst Du Zugang zur Übung und stimmst unseren Datenschutzbestimmungen zu.
      </p>
    </motion.div>
  );
};

export default LeadForm;
