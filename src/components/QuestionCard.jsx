import React from "react";
import { motion } from "framer-motion";
import AnswerOption from "./AnswerOption";

const QuestionCard = ({ question, options, selectedValue, onSelect }) => {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-serif text-primary leading-tight text-center mb-4"
      >
        {question}
      </motion.h2>

      <div className="grid grid-cols-1 gap-3">
        {options.map((option, index) => (
          <AnswerOption
            key={option.value}
            label={option.label}
            isSelected={selectedValue === option.value}
            onClick={() => onSelect(option.value)}
            delay={0.1 + index * 0.06}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
