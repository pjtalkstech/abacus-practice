import React, { useState } from "react";
import CatHeader from "./components/CatHeader";
import ModeSelector from "./components/ModeSelector";
import ProblemGenerator from "./components/ProblemGenerator";

const App: React.FC = () => {
  const [mode, setMode] = useState<"learning" | "exam" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-yellow-100 flex flex-col items-center relative">
      <CatHeader />
      <ModeSelector setMode={setMode} />
      {mode && <ProblemGenerator mode={mode} />}
      <footer className="mt-auto text-gray-500 text-xs pb-4">
        Made with 🐾 for Abacus Learners!
      </footer>
    </div>
  );
};

export default App;