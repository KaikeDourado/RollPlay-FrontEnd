import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import LoginForm from "@/components/auth/LoginForm";
import "../styles/login.css";

export default function LoginPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user) {
            navigate("/perfil");
        }
    }, [loading, user, navigate]);

    if (loading) {
      return <div className="login-loading"><div className="spinner"></div></div>;
    }

    return (
        <div className="login-container">
            <Navbar />

            <main className="login-main">
                <div className="login-box">
                    <div className="login-left">
                        <div className="login-gradient-overlay"></div>
                        <img src="/imagens/maga_estudando_background.png" alt="background de uma maga estudando" className="login-hero-image" />
                        <div className="login-image-text">
                            <h2>SUA AVENTURA COMEÇA AQUI</h2>
                            <p>
                                ROLL & PLAY É UMA PLATAFORMA GRATUITA PARA JOGADORES DE RPG DE MESA.
                                CRIE PERSONAGENS, ORGANIZE SESSÕES E ROLE DADOS - TUDO EM UM SÓ LUGAR.
                            </p>
                        </div>
                    </div>
                    <div className="login-right">
                        <LoginForm />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
