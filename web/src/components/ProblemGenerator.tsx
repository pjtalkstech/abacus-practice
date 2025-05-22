import React, { useState, useEffect } from "react";
import ProblemCard from "./ProblemCard";
import Confetti from "./Confetti";
import WrongAnswerEffect from "./WrongAnswerEffect";
import { generateProblems } from "../utils/generateProblem";

interface Props {
  mode: "learning" | "exam";
}

const NUM_PROBLEMS = 25;

const sampleProblems = [
  "25+30-25",
  "23*3"

];

const ProblemGenerator: React.FC<Props> = ({ mode }) => {
  const [problems, setProblems] = useState<string[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const {problems: generated, answers: answerKey} = generateProblems(sampleProblems, NUM_PROBLEMS);
    setProblems(generated);
    setAnswers(answerKey);
    setCurrent(0);
    setScore(0);
    setInput("");
  }, [mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correct = Math.abs(Number(input) - answers[current]) < 1e-6;
    if (correct) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 1500);
      setScore((s) => s + 1);
    } else {
      if (mode !== "exam") {
        setWrong(true);
        setTimeout(() => setWrong(false), 1000);
      }
    }
    setCurrent((c) => c + 1);
    setInput("");
  };

  if (current >= NUM_PROBLEMS) {
    return (
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-green-700">All Done!</h2>
        {mode === "exam" && (
          <p className="text-xl mt-2">Score: {score} / {NUM_PROBLEMS}</p>
        )}
        <img src="/cat-happy.svg" className="mx-auto w-28 mt-4" alt="Happy Cat" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mt-8">
      <ProblemCard problem={problems[current]} />
      <form onSubmit={handleSubmit} className="mt-4 flex flex-row items-center">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="border-2 border-pink-400 rounded-lg px-4 py-2 text-xl focus:outline-none"
          autoFocus
        />
        <button className="ml-3 bg-green-400 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold">Check</button>
      </form>
      {showConfetti && <Confetti />}
      {wrong && mode !== "exam" && <WrongAnswerEffect />}
      <div className="mt-3 text-gray-600">
        Problem {current + 1} / {NUM_PROBLEMS}
      </div>
      {mode === "exam" && (
        <div className="mt-2 text-blue-600">Score: {score}</div>
      )}
    </div>
  );
};

export default ProblemGenerator;