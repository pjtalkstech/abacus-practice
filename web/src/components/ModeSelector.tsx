import React from "react";

interface Props {
  setMode: (mode: "learning" | "exam") => void;
}

const ModeSelector: React.FC<Props> = ({ setMode }) => (
  <div className="my-6">
    <h2 className="text-lg font-bold mb-2">Choose a Mode:</h2>
    <button
      className="bg-pink-400 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-l-lg"
      onClick={() => setMode("learning")}
    >
      Learning Mode
    </button>
    <button
      className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-r-lg ml-2"
      onClick={() => setMode("exam")}
    >
      Exam Mode
    </button>
  </div>
);

export default ModeSelector;