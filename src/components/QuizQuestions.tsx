import { useState } from "react";
import { quizQuestions } from "@/data/quizData";

interface QuizQuestionsProps {
  onComplete: (answers: number[]) => void;
}

const QuizQuestions = ({ onComplete }: QuizQuestionsProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const question = quizQuestions[currentQuestion];
  const totalQuestions = quizQuestions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;
  const letters = ["A", "B", "C", "D"];

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    if (currentQuestion < totalQuestions - 1) {
      setAnswers(newAnswers);
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      onComplete(newAnswers);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="bg-card rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Pregunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
        </div>

        <div className="w-full bg-muted rounded-full h-2 mb-6">
          <div className="bg-primary h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex justify-center mb-4">
          <img
            src={question.image}
            alt={question.question}
            className="w-28 h-28 object-cover rounded-xl border-2 border-primary/30"
            loading="lazy"
          />
        </div>

        <h2 className="text-lg md:text-xl font-bold text-foreground text-center mb-6">{question.question}</h2>

        <div className="space-y-3 mb-5">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3 ${
                selectedOption === index
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
                  selectedOption === index ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {letters[index]}
              </span>
              <span className="text-foreground">{option}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className="w-full text-lg font-semibold py-4 px-6 rounded-xl bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-110 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {currentQuestion === totalQuestions - 1 ? "Ver Resultado" : "Siguiente"}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestions;
