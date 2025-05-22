import React from "react";

const Confetti: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
    {/* Simple confetti effect (can use react-confetti for real confetti) */}
    <div className="animate-bounce text-6xl text-yellow-300 text-center mt-20">🎉</div>
    <div className="animate-bounce text-6xl text-pink-400 text-center">🐾</div>
  </div>
);

export default Confetti;