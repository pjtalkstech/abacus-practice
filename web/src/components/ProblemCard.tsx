import React from "react";

const ProblemCard: React.FC<{ problem: string }> = ({ problem }) => (
  <div className="bg-white border-4 border-pink-300 rounded-xl shadow-lg p-8 text-3xl font-mono text-pink-700 mb-2">
    {problem}
  </div>
);

export default ProblemCard;