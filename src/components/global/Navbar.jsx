import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/navbar.css";
import SessionModal from "../forms/sessionModal";
import EnterSessionModal from "../forms/EnterSessionModal";
import { authApi } from "../../lib/auth";
import { useAuth } from "../../contexts/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEnterModalOpen, setIsEnterModalOpen] = useState(false);

  // Usar o contexto para verificar autenticação em tempo real
  const { user, loading } = useAuth();
  const isLoggedIn = !!user;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = async () => {
    try {
      await authApi.signOut();
      navigate("/");
      setMenuOpen(false);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Enquanto está carregando, não renderizar nada ou renderizar um placeholder
  if (loading) {
    return <header className="navbar"><Link to="/" className="nav-logo">Roll & Play</Link></header>;
  }

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

        {/* Se estiver logado */}
        {isLoggedIn ? (
          <>
            <button
              className="btn-primary"
              onClick={() => {
                setMenuOpen(false);
                navigate("/perfil");
              }}
            >
              Perfil
            </button>

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
            />

            {/* TODO: Talvez colocar o nome do usuário ou algo assim */}
            {/* <span className="user-email">{user?.email}</span> */}
            
            <button className="btn-logout" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <>
            {/* Se NÃO estiver logado */}
            <Link to="/entrar" className="btn-outline" onClick={() => setMenuOpen(false)}>
              Entrar
            </Link>
            <Link to="/registrar" className="btn-primary" onClick={() => setMenuOpen(false)}>
              Registrar
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}