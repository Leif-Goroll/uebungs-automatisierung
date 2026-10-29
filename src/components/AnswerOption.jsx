import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const AnswerOption = ({ label, description, isSelected, onClick, delay = 0 }) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-between w-full py-3 px-4.5 rounded-sm border transition-all duration-500 text-left font-sans",
        isSelected
          ? "border-gold bg-gold/5 gold-glow"
          : "border-gold/20 bg-surface hover:border-gold/50"
      )}
    >
      <div className="flex flex-col gap-0.5 pr-4">
        <span className={cn(
          "text-base transition-colors duration-300",
          isSelected ? "text-gold font-medium" : "text-primary group-hover:text-gold/80"
        )}>
          {label}
        </span>
        {description && (
          <span className={cn(
            "text-xs transition-colors duration-300 leading-relaxed opacity-80",
            isSelected ? "text-gold/70" : "text-muted group-hover:text-primary/70"
          )}>
            {description}
          </span>
        )}
      </div>

      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-gold flex-shrink-0"
        >
          <Check size={20} strokeWidth={2.5} />
        </motion.div>
      )}
    </motion.button>
  );
};

export default AnswerOption;
