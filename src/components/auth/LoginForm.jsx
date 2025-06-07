import { useState } from 'react';
import { FaDiceD20 } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/loginForm.css';

//TODO: O usuário só faz login com email verificado, fazer um alert para avisar caso 
//back end retorne o erro de email

export default function LoginForm() {
  const [form, setForm] = useState({
    identifier: '',   // email ou nome de usuário
    password: '',
    remember: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        email: form.identifier,    // backend espera "email", mas você pode ajustar para "username" se for o caso
        password: form.password
      };

      const res = await axios.post(
        'http://localhost:5000/api/auth/signin',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log(res)
      // Exemplo: armazenar token retornado e respeitar "remember me"
      const token  = res.data.response?.userData?.token;
      if (!token) throw new Error('Token não encontrado na resposta.');
      if (form.remember) {
        localStorage.setItem('authToken', token);
      } else {
        sessionStorage.setItem('authToken', token);
      }

      // redireciona para dashboard ou página inicial
      navigate('/');
    } catch (err) {
      // exibe mensagem de erro do servidor ou genérica
      const msg =
        err.response?.data?.message ||
        'Falha ao entrar. Verifique suas credenciais.';
      setError(msg);
    }
  }

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
          value={form.identifier}
          onChange={handleChange}
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
          value={form.password}
          onChange={handleChange}
        />

        <div className="remember-me">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            checked={form.remember}
            onChange={handleChange}
          />
          <label htmlFor="remember">Lembrar de mim</label>
        </div>

        {error && <p className="login-form-error">{error}</p>}

        <button className="login-btn-entrar" type="submit">
          Entrar
        </button>
      </form>

      <p className="register-text">
        Não tem uma conta? <Link to="/registrar">Registre-se</Link>
      </p>
    </div>
  );
}
