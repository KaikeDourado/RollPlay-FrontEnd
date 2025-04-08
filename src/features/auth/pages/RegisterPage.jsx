import RegisterForm from "../components/RegisterForm";
import { Check } from "lucide-react";
import "./../styles/register.css";

export default function RegisterPage() {
    return (
        <div className="register-container">
            <header className="register-header">
                <h1 className="logo">Roll & Play</h1>
                <nav className="register-nav">
                    <a href="/">Home</a>
                    <a href="/sobre">Sobre</a>
                    <a href="/perfil">Perfil</a>
                    <a href="/entrar" className="btn-outline">Entrar</a>
                    <a href="/registrar" className="btn-solid">Registrar</a>
                </nav>
            </header>

            <main className="register-main">
                <div className="register-box">
                    <div className="register-left">
                        <div className="gradient-overlay"></div>
                        <img src="/imagens/group_image_background.webp" alt="background grupo de aventureiros" className="hero-image" />
                        <div className="left-text">
                            <h2>SUA AVENTURA COMEÇA AQUI</h2>
                            <p>ROLL & PLAY É UMA PLATAFORMA GRATUITA PARA JOGADORES DE RPG DE MESA. CRIE PERSONAGENS, ORGANIZE SESSÕES E ROLE DADOS - TUDO EM UM SÓ LUGAR.</p>
                            <ul>
                                <li><Check /> PLATAFORMA TOTALMENTE GRATUITA, SEM PREMIUM ESCONDIDO</li>
                                <li><Check /> SUPORTE PARA MÚLTIPLOS SISTEMAS</li>
                                <li><Check /> INTERFACE INTUITIVA</li>
                                <li><Check /> COMUNIDADE ATIVA E EM CRESCIMENTO</li>
                            </ul>
                        </div>
                    </div>
                    <div className="register-right">
                        <RegisterForm />
                    </div>
                </div>
            </main>

            <footer className="register-footer">
                <p>© 2025 Roll & Play. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
