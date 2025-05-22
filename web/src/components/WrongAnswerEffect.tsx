import React from "react";

const WrongAnswerEffect: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50 flex flex-col items-center">
    <div className="animate-shake text-4xl text-red-600 mt-24">🙀 Meow! Try again!</div>
    <img src="/cat-surprised.svg" alt="Surprised Cat" className="w-24 mt-2" />
  </div>
);

export default WrongAnswerEffect;