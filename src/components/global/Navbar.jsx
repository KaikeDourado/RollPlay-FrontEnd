import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";
import SessionModal from "../forms/sessionModal";
import EnterSessionModal from "../forms/EnterSessionModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);

  // Verifica se o usuário está logado (ajuste conforme sua lógica real)
  const isLoggedIn = !!localStorage.getItem('token');

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

        {/* Botões só aparecem se estiver logado */}
        {isLoggedIn && (
          <>
            <button
              onClick={() => {
                openModal();
              }}
            >
              Criar Sessão
            </button>
            <SessionModal isOpen={isModalOpen} onClose={closeModal} />

            <button onClick={() => setIsEnterModalOpen(true)}>
              Entrar na Sessão
            </button>
            <EnterSessionModal
              isOpen={isEnterModalOpen}
              onClose={() => setIsEnterModalOpen(false)}
              onSubmit={(code) => {
                console.log("código da sessão:", code);
                setIsEnterModalOpen(false);
              }}
            />
          </>
        )}

        {/* Botões de autenticação só aparecem se NÃO estiver logado */}
        {!isLoggedIn && (
          <>
            <Link to="/entrar" className="btn-outline" onClick={() => setMenuOpen(false)}>Entrar</Link>
            <Link to="/registrar" className="btn-primary" onClick={() => setMenuOpen(false)}>Registrar</Link>
          </>
        )}
      </nav>
    </header>
  );
}