import RegisterForm from "@/components/auth/RegisterForm";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import { Check } from "lucide-react";
import "../styles/register.css";

export default function RegisterPage() {
    return (
        <div className="register-container">
            <Navbar />

            <main className="register-main">
                <div className="register-box">
                    <div className="register-left">
                        <div className="register-gradient-overlay"></div>
                        <img src="/imagens/group_image_background.webp" alt="background grupo de aventureiros" className="register-hero-image" />
                        <div className="register-left-text">
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

            <Footer />
        </div>
    );
}
