import { useState } from 'react';
import { FaDiceD20 } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../../lib/auth';
import './styles/loginForm.css';

//TODO: O usuário só faz login com email verificado, fazer um alert para avisar caso 
//back end retorne o erro de email

export default function LoginForm() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    if (!identifier || !password) {
      setLoading(false);
      return setError('Preencha email e senha');
    }

    try {
      const result = await authApi.signInEmail(identifier, password);
      console.log('signIn result:', result);
    } catch (err) {
      console.error('Login error:', err);
      setError(err?.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <div className="login-form-header">
        <div className="login-form-icon">
          <FaDiceD20 size={48} color="#3b82f6" />
        </div>
        <h1>Bem-vindo de volta!</h1>
        <p>Entre para continuar sua aventura</p>
      </div>

      <form className="login-form-body" onSubmit={handleSubmit}>
        <label htmlFor="identifier">Email</label>
        <input
          id="identifier"
          name="identifier"
          type="text"
          placeholder="seu.email@exemplo.com"
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
        />

        <label className="login-label-senha" htmlFor="password">
          Senha
          <Link to="/recuperar-senha">Esqueceu a senha?</Link>
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="remember-me">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          <label htmlFor="remember">Lembrar de mim</label>
        </div>

        {error && <p className="login-form-error">{error}</p>}

        <button className="login-btn-entrar" disabled={loading} type="submit" onClick={handleSubmit}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="register-text">
        Não tem uma conta? <Link to="/registrar">Registre-se</Link>
      </p>
    </div>
  );
}
