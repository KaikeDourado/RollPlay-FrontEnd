import { GiDiceTwentyFacesTwenty } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./styles/registerForm.css";

export default function RegisterForm() {
  return (
    <div className="register-form">
      <div className="register-form-header">
        <div className="register-form-icon">
          <GiDiceTwentyFacesTwenty size={48} color="#3b82f6" />
        </div>
        <h1>Crie sua conta</h1>
        <p className="register-subtitle">Junte-se a milhares de jogadores de RPG</p>
      </div>

      <form className="register-form-body">
        <div className="register-form-group">
          <label htmlFor="username">Nome de usuário</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            placeholder="Seu nome de usuário"
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="seu.email@exemplo.com"
          />
        </div>

        <div className="register-form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="••••••••"
          />
          <p className="register-form-note">A senha deve ter pelo menos 8 caracteres</p>
        </div>

        <div className="register-form-group">
          <label htmlFor="confirm-password">Confirmar senha</label>
          <input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
            placeholder="••••••••"
          />
        </div>

        <div className="register-form-checkbox">
          <input id="terms" name="terms" type="checkbox" required />
          <label htmlFor="terms">
            Eu concordo com os <Link to="/termos">Termos de Serviço</Link> e{" "}
            <Link to="/privacidade">Política de Privacidade</Link>
          </label>
        </div>

        <button type="submit" className="register-form-submit">
          Criar conta gratuita
        </button>
      </form>

      <div className="register-form-footer">
        Já tem uma conta? <Link to="/entrar">Entrar</Link>
      </div>
    </div>
  );
}
