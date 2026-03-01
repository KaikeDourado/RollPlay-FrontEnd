import { useState } from 'react';
import { FaDiceD20 } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/registerForm.css';

//TODO: Criar um alert para o usuário verificar o email

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
    
    return Math.min(strength, 5);
  }

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('As senhas não conferem');
      return;
    }

    const payload = {
      displayName: form.username,
      email: form.email,
      password: form.password
    };

    try {
      const response = await axios.post(
        'http://localhost:5000/users/',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        alert('Conta criada com sucesso! Por favor, verifique seu e-mail para ativar sua conta.');
        navigate('/entrar');
      } else {
        setError(response.data.message || 'Erro ao criar conta');
      }
    } catch (err) {
      const msg = err.response?.data?.message ||
        'Não foi possível criar a conta. Tente novamente.';
      setError(msg);
    }
  }

  return (
    <div className="register-form">
      <div className="register-form-header">
        <div className="register-form-icon">
          <FaDiceD20 size={48} color="#3b82f6" />
        </div>
        <h1>Crie sua conta</h1>
        <p className="register-subtitle">Junte-se a milhares de jogadores de RPG</p>
      </div>

      <form className="register-form-body" onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label htmlFor="username">Nome de usuário</label>
          <input
            id="username"
            name="username"
            type="text"
            required
            placeholder="Seu nome de usuário"
            value={form.username}
            onChange={handleChange}
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
            value={form.email}
            onChange={handleChange}
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
            value={form.password}
            onChange={handleChange}
          />
          {form.password && (
            <div className="password-strength-container">
              <div className="password-strength-bar">
                <div 
                  className={`password-strength-fill strength-${passwordStrength}`}
                  style={{ width: `${(passwordStrength / 5) * 100}%` }}
                ></div>
              </div>
              <p className={`password-strength-text strength-${passwordStrength}`}>
                {passwordStrength === 0 && 'Muito fraca'}
                {passwordStrength === 1 && 'Fraca'}
                {passwordStrength === 2 && 'Média'}
                {passwordStrength === 3 && 'Boa'}
                {passwordStrength === 4 && 'Forte'}
                {passwordStrength === 5 && 'Muito forte'}
              </p>
            </div>
          )}
          <p className="register-form-note">
            ✓ Mínimo 8 caracteres {form.password.length >= 8 ? '✓' : ''}<br/>
            ✓ Maiúscula {/[A-Z]/.test(form.password) ? '✓' : ''}<br/>
            ✓ Minúscula {/[a-z]/.test(form.password) ? '✓' : ''}<br/>
            ✓ Número {/[0-9]/.test(form.password) ? '✓' : ''}<br/>
            ✓ Caractere especial {/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password) ? '✓' : ''}
          </p>
        </div>

        <div className="register-form-group">
          <label htmlFor="confirmPassword">Confirmar senha</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            placeholder="••••••••"
            value={form.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <div className="register-form-checkbox">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            checked={form.terms}
            onChange={handleChange}
          />
          <label htmlFor="terms">
            Eu concordo com os <Link to="/termos">Termos de Serviço</Link> e{' '}
            <Link to="/privacidade">Política de Privacidade</Link>
          </label>
        </div>

        {error && <p className="register-form-error">{error}</p>}

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
