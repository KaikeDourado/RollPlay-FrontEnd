import { useState } from 'react';
import { FaDiceD20, FaCheck, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/registerForm.css';

export default function RegisterForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
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

  function validatePassword(password) {
    return (
      password.length >= 8 &&
      /[a-z]/.test(password) &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    );
  }

  function getPasswordRequirements(password) {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
  }

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    
    if (name === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
    
    setAttemptedSubmit(false);
    
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validatePassword(form.password) || !form.terms) {
      setAttemptedSubmit(true);
      return;
    }

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
        'https://rollplayapi-fbb4e7a9hqa3ehds.eastus-01.azurewebsites.net/users/',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        setSuccess('Usuário criado com sucesso!');
        setForm({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: false
        });
        setPasswordStrength(0);
        setTimeout(() => navigate('/entrar'), 3000);
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
          {form.password && (
            <div className="password-requirements">
              <div className="requirements-title">Requisitos de senha:</div>
              <div className="requirements-list">
                <div className={`requirement ${getPasswordRequirements(form.password).minLength ? 'complete' : 'incomplete'}`}>
                  {getPasswordRequirements(form.password).minLength ? (
                    <FaCheck className="icon-check" />
                  ) : (
                    <FaTimes className="icon-x" />
                  )}
                  <span>Mínimo 8 caracteres</span>
                </div>
                <div className={`requirement ${getPasswordRequirements(form.password).hasUppercase ? 'complete' : 'incomplete'}`}>
                  {getPasswordRequirements(form.password).hasUppercase ? (
                    <FaCheck className="icon-check" />
                  ) : (
                    <FaTimes className="icon-x" />
                  )}
                  <span>Maiúscula</span>
                </div>
                <div className={`requirement ${getPasswordRequirements(form.password).hasLowercase ? 'complete' : 'incomplete'}`}>
                  {getPasswordRequirements(form.password).hasLowercase ? (
                    <FaCheck className="icon-check" />
                  ) : (
                    <FaTimes className="icon-x" />
                  )}
                  <span>Minúscula</span>
                </div>
                <div className={`requirement ${getPasswordRequirements(form.password).hasNumber ? 'complete' : 'incomplete'}`}>
                  {getPasswordRequirements(form.password).hasNumber ? (
                    <FaCheck className="icon-check" />
                  ) : (
                    <FaTimes className="icon-x" />
                  )}
                  <span>Número</span>
                </div>
                <div className={`requirement ${getPasswordRequirements(form.password).hasSpecial ? 'complete' : 'incomplete'}`}>
                  {getPasswordRequirements(form.password).hasSpecial ? (
                    <FaCheck className="icon-check" />
                  ) : (
                    <FaTimes className="icon-x" />
                  )}
                  <span>Caractere especial (!@#$%^&*)</span>
                </div>
              </div>
            </div>
          )}
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
        {success && <p className="register-form-success">{success}</p>}

        {attemptedSubmit && (!form.terms || !validatePassword(form.password)) && (
          <p className="register-form-warning">
            {!validatePassword(form.password) && '⚠️ Complete todos os requisitos de senha'}
            {!form.terms && !validatePassword(form.password) && ' e '}
            {!form.terms && 'aceite os termos'}
          </p>
        )}

        <button 
          type="submit" 
          className="register-form-submit"
          disabled={!form.terms || !validatePassword(form.password)}
        >
          Criar conta de gratuita
        </button>
      </form>

      <div className="register-form-footer">
        Já tem uma conta? <Link to="/entrar">Entrar</Link>
      </div>
    </div>
  );
}
