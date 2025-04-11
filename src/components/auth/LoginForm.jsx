import { FaDiceD20 } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./styles/loginForm.css";

export default function LoginForm() {
    return (
        <div className="login-form">
            <div className="login-form-header">
                <div className="login-form-icon">
                    <FaDiceD20 size={48} color="#3b82f6" />
                </div>
                <h1>Bem-vindo de volta!</h1>
                <p>Entre para continuar sua aventura</p>
            </div>

            <form className="login-form-body">
                <label>Email ou nome de usuário</label>
                <input type="text" placeholder="seu.email@exemplo.com" required />

                <label className="login-label-senha">
                    Senha
                    <Link to="/recuperar-senha">Esqueceu a senha?</Link>
                </label>
                <input type="password" placeholder="••••••••" required />

                <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Lembrar de mim</label>
                </div>

                <button className="login-btn-entrar" type="submit">Entrar</button>
            </form>

            <p className="register-text">
                Não tem uma conta? <Link to="/registrar">Registre-se</Link>
            </p>
        </div>
    );
}
