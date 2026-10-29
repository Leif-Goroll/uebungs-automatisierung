import React from "react";
import { motion } from "framer-motion";

const LoadingMatch = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6"
    >
      <div className="relative w-24 h-24 mb-12">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute inset-0 border-2 border-gold/10 border-t-gold rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          className="absolute inset-4 border border-gold/5 border-b-gold/40 rounded-full"
        />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-primary/80 font-serif text-2xl tracking-wide italic"
      >
        Dein Raum wird erkannt …
      </motion.p>
    </motion.div>
  );
};

export default LoadingMatch;
