import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnswerOption from "./AnswerOption";

const QuestionFlow = ({ step, totalSteps, question, answers, onSelect }) => {
  const progress = ((step + 1) / totalSteps) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      className="relative z-10 w-full max-w-xl mx-auto px-6 flex flex-col min-h-screen py-6"
    >
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <span style={{ color: "rgba(240,234,224,0.4)", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            Frage {step + 1} von {totalSteps}
          </span>
          <span style={{ color: "rgba(201,168,108,0.45)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>
            Innere Stimme
          </span>
        </div>
        <div style={{ height: 1, background: "rgba(201,168,108,0.1)", overflow: "hidden" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: "circOut" }}
            style={{ height: "100%", background: "#C9A86C" }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col justify-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.6 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
            color: "#F0EAE0",
            lineHeight: 1.25,
            textAlign: "center",
            marginBottom: "1rem",
            fontWeight: 400,
          }}
        >
          {question.question}
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {question.options.map((option, index) => (
            <AnswerOption
              key={option.value}
              label={option.label}
              description={option.description}
              isSelected={answers[question.key] === option.value}
              onClick={() => onSelect(question.key, option.value)}
              delay={0.08 + index * 0.055}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionFlow;
