// src/components/Header.jsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <Link to="/" className="flex items-center space-x-2">
        <img src="/Logo.png" alt="FinderRight Logo" className="h-10" />
        <span className="text-xl font-bold text-blue-600">FinderRight</span>
      </Link>
    </header>
  );
}
