import { useNavigate } from 'react-router-dom';
import './styles/legal.css';

export default function PrivacyPage() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button className="legal-back-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div className="legal-content">
          <h1>Política de Privacidade</h1>
          <p className="legal-updated">Última atualização: Fevereiro 2026</p>

          <section className="legal-section">
            <h2>1. Introdução</h2>
            <p>
              Bem-vindo ao RollPlay. Sua privacidade é importante para nós. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Informações que Coletamos</h2>
            <p>
              Quando você se registra no RollPlay, coletamos:
            </p>
            <ul>
              <li><strong>Informações de Conta:</strong> Nome de usuário, email, senha criptografada</li>
              <li><strong>Conteúdo da Plataforma:</strong> Campanhas, personagens, anotações, mensagens</li>
              <li><strong>Dados de Uso:</strong> IP, tipo de navegador, páginas visitadas, tempo de uso</li>
              <li><strong>Preferências:</strong> Temas, idioma, configurações de privacidade</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>3. Como Usamos Suas Informações</h2>
            <p>
              Usamos suas informações para:
            </p>
            <ul>
              <li>Fornecer, manter e melhorar o RollPlay</li>
              <li>Responder a suas consultas e solicitações</li>
              <li>Enviar notificações sobre campanhas e atividades</li>
              <li>Prevenir atividades fraudulentas ou abusivas</li>
              <li>Cumprir obrigações legais</li>
              <li>Analisar tendências e o uso do RollPlay</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>4. Compartilhamento de Informações</h2>
            <p>
              Não vendemos suas informações pessoais. Compartilhamos dados apenas:
            </p>
            <ul>
              <li>Com seus companheiros de mesa em campanhas compartilhadas</li>
              <li>Com prestadores de serviços que nos ajudam a operar o RollPlay</li>
              <li>Quando exigido por lei ou para proteger direitos legais</li>
              <li>Com sua permissão explícita</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>5. Segurança de Dados</h2>
            <p>
              Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações contra acesso não autorizado. Sua senha é criptografada e nunca armazenada em texto plano. No entanto, nenhum sistema é 100% seguro, e você usa o RollPlay por sua conta e risco.
            </p>
          </section>

          <section className="legal-section">
            <h2>6. Cookies e Rastreamento</h2>
            <p>
              O RollPlay usa cookies para manter sua sessão, lembrar preferências e analisar o uso. Você pode desabilitar cookies em seu navegador, mas isso pode afetar a funcionalidade do site.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Seus Direitos</h2>
            <p>
              Você tem o direito de:
            </p>
            <ul>
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir informações inexatas ou incompletas</li>
              <li>Solicitar a exclusão de sua conta e dados (com exceções legais)</li>
              <li>Exportar seus dados em formato portável</li>
              <li>Revogar consentimento para processamento</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>8. Retenção de Dados</h2>
            <p>
              Retemos suas informações enquanto sua conta estiver ativa. Após encerrar sua conta, mantemos alguns dados por 30 dias para recuperação, depois os excluímos permanentemente, exceto quando retido por lei.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Contato para Privacidade</h2>
            <p>
              Se você tiver perguntas sobre esta Política de Privacidade ou como tratamos seus dados, entre em contato através do nosso formulário de suporte. Responderemos em até 30 dias.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Atualizações da Política</h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre mudanças significativas por email ou através de um aviso em nossa página.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
