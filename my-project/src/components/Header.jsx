import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">
          <Link to="/">Doğan Emlak</Link>
        </h1>
        <nav className="space-x-4">


        </nav>
      </div>
    </header>
  );
};

export default Header;
