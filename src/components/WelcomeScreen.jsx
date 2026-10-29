import React from "react";
import { motion } from "framer-motion";

const WelcomeScreen = ({ onStart }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center relative z-10"
    >
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gold text-xs tracking-[0.3em] uppercase mb-4 font-sans font-medium"
      >
        Dein innerer Raum
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="text-5xl md:text-7xl font-serif text-primary leading-tight mb-6"
      >
        Wo verlierst Du Dich<br />gerade?
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="text-muted text-lg max-w-md mb-12 font-sans"
      >
        Deine 7-Tägige Reise beginnt hier - Beantworte vier Fragen und erhalte Deine erste Nervensystem-Übung
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="px-10 py-4 border border-gold/40 text-gold hover:bg-gold hover:text-background transition-all duration-500 font-sans tracking-wider uppercase text-sm gold-glow-hover"
      >
        Ich bin bereit
      </motion.button>
    </motion.div>
  );
};

export default WelcomeScreen;
