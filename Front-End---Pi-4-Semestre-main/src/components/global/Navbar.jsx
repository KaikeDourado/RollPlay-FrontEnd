import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo">Roll & Play</Link>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/perfil" onClick={() => setMenuOpen(false)}>Perfil</Link>
        <Link to="/entrar" className="btn-outline" onClick={() => setMenuOpen(false)}>Entrar</Link>
        <Link to="/registrar" className="btn-primary" onClick={() => setMenuOpen(false)}>Registrar</Link>
      </nav>
    </header>
  );
}
