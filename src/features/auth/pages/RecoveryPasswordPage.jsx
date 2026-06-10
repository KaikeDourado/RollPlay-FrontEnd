import Navbar from '@/components/global/Navbar';
import Footer from '@/components/global/Footer';
import RecoveryPasswordForm from '@/components/auth/RecoveryPasswordForm';
import '../styles/recovery.css';

export default function RecoveryPasswordPage() {
  return (
    <div className="recovery-container">
      <Navbar />
      <main className="recovery-main">
        <div className="recovery-box">
          <div className="recovery-left">
            <div className="recovery-gradient-overlay"></div>
            <img
              src="/imagens/maga_estudando_background.png"
              alt="mage studying background"
              className="recovery-hero-image"
            />
            <div className="recovery-left-text">
              <h2>Recupere sua senha com segurança</h2>
              <p>
                Insira seu email cadastrado, receberá um link para criar uma nova senha e voltar a jogar mais rápido.
              </p>
            </div>
          </div>

          <div className="recovery-right">
            <RecoveryPasswordForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
