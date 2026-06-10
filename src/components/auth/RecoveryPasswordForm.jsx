import { useState } from 'react';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { authApi } from '../../lib/auth';
import './styles/recoveryForm.css';

export default function RecoveryPasswordForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('');
    setError('');

    if (!email) {
      return setError('Digite um email válido para recuperar a senha.');
    }

    try {
      setLoading(true);
      await authApi.resetPassword(email);
      setStatus(
        'Enviamos um link de redefinição de senha para o seu email. Verifique a caixa de entrada e siga as instruções.'
      );
      setEmail('');
    } catch (err) {
      const message = err.code || err.message || 'Erro ao enviar o link de recuperação.';
      setError(
        message === 'auth/user-not-found'
          ? 'Email não cadastrado.'
          : message === 'auth/invalid-email'
          ? 'Informe um email válido.'
          : 'Não foi possível enviar o link. Tente novamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="recovery-form">
      <div className="recovery-form-header">
        <div className="recovery-form-icon">
          <FaEnvelopeOpenText size={42} color="#3b82f6" />
        </div>
        <h1>Recuperar senha</h1>
        <p>Digite o email cadastrado para receber o link de redefinição.</p>
      </div>

      <form className="recovery-form-body" onSubmit={handleSubmit}>
        <label htmlFor="recoveryEmail">Email</label>
        <input
          id="recoveryEmail"
          name="email"
          type="email"
          placeholder="seu.email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {error && <p className="recovery-form-error">{error}</p>}
        {status && <p className="recovery-form-success">{status}</p>}

        <button className="recovery-btn-submit" disabled={loading} type="submit">
          {loading ? 'Enviando...' : 'Enviar link de recuperação'}
        </button>
      </form>

      <p className="recovery-form-note">
        Lembrou a senha? <Link to="/entrar">Voltar ao login</Link>
      </p>
    </div>
  );
}
