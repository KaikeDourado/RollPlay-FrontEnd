import { Link } from "react-router-dom";
import "./styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="nav-logo">Roll & Play</Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/perfil">Perfil</Link>
        <Link to="/entrar" className="btn-outline">Entrar</Link>
        <Link to="/registrar" className="btn-primary">Registrar</Link>
      </nav>
    </header>
  );
}
