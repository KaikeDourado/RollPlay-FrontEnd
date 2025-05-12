import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";
import SessionModal from "../forms/sessionModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para lidar com o envio do formulário
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header className="navbar">
      <Link to="/" className="nav-logo">Roll & Play</Link>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/");
          }}
        >
          Home
        </button>

        <button
          onClick={() => {
            setMenuOpen(false);
            navigate("/perfil");
          }}
        >
          Perfil
        </button>

        {/* Botão para abrir o modal de criação de sessão */}
        <button
          onClick={() => {
            openModal;
            setMenuOpen(false);
          }}
        >
          Criar Sessão
        </button>
        <SessionModal isOpen={isModalOpen} onClose={closeModal} />

        <Link to="/entrar" className="btn-outline" onClick={() => setMenuOpen(false)}>Entrar</Link>
        <Link to="/registrar" className="btn-primary" onClick={() => setMenuOpen(false)}>Registrar</Link>
      </nav>
    </header>
  );
}
