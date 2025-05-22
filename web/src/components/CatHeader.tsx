import React from "react";

const CatHeader: React.FC = () => (
  <header className="text-center mt-6 mb-4">
    <img src="/cat-math.svg" alt="Cat with Abacus" className="mx-auto w-32" />
    <h1 className="text-3xl font-extrabold text-pink-600 drop-shadow-lg">Abacus Cat Practice</h1>
    <p className="text-md font-medium text-yellow-700">Fun Math for Smart Kids!</p>
  </header>
);

export default CatHeader;