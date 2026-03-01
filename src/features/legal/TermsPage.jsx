import { useNavigate } from 'react-router-dom';
import './styles/legal.css';

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="legal-page">
      <div className="legal-container">
        <button className="legal-back-btn" onClick={() => navigate(-1)}>
          ← Voltar
        </button>

        <div className="legal-content">
          <h1>Termos de Serviço</h1>
          <p className="legal-updated">Última atualização: Fevereiro 2026</p>

          <section className="legal-section">
            <h2>1. Aceitação dos Termos</h2>
            <p>
              Bem-vindo ao RollPlay, sua plataforma de RPG de mesa online. Ao acessar e usar este serviço, você aceita estar vinculado a estes Termos de Serviço. Se você não concorda com qualquer parte destes termos, você não poderá usar o RollPlay.
            </p>
          </section>

          <section className="legal-section">
            <h2>2. Direitos de Uso</h2>
            <p>
              Você recebe uma licença limitada, não exclusiva e não transferível para usar o RollPlay para fins pessoais. Você não pode reproduzir, distribuir, transmitir, exibir, executar, publicar, licenciar, criar trabalhos derivados ou vender informações, software, produtos ou serviços obtidos do RollPlay.
            </p>
          </section>

          <section className="legal-section">
            <h2>3. Contas de Usuário</h2>
            <p>
              Você é responsável por manter a confidencialidade de sua senha e é totalmente responsável por todas as atividades que ocorrem em sua conta. Você concorda em notificar o RollPlay imediatamente sobre qualquer uso não autorizado de sua conta.
            </p>
          </section>

          <section className="legal-section">
            <h2>4. Conteúdo Gerado pelo Usuário</h2>
            <p>
              Todo conteúdo que você cria, envia ou exibe (campanhas, personagens, anotações, etc.) permanece sua propriedade. No entanto, você nos concede uma licença mundial, royalty-free para usar, copiar, modificar e exibir esse conteúdo para melhorar o RollPlay.
            </p>
          </section>

          <section className="legal-section">
            <h2>5. Comportamento do Usuário</h2>
            <p>
              Você concorda em não:</p>
            <ul>
              <li>Usar linguagem ofensiva, discriminatória ou assediadora</li>
              <li>Tentar acessar partes não autorizadas do RollPlay</li>
              <li>Interferir com o funcionamento normal do serviço</li>
              <li>Violar leis aplicáveis ou direitos de terceiros</li>
              <li>Compartilhar contas ou credenciais com outros usuários</li>
            </ul>
          </section>

          <section className="legal-section">
            <h2>6. Disclaimer de Garantias</h2>
            <p>
              O RollPlay é fornecido "como está" sem garantias de qualquer tipo. Não garantimos que o serviço será ininterrupto ou sem erros. O RollPlay não se responsabiliza por qualquer dano indireto, incidental ou consequencial.
            </p>
          </section>

          <section className="legal-section">
            <h2>7. Limitação de Responsabilidade</h2>
            <p>
              Em nenhum caso o RollPlay será responsável por qualquer dano especial, indireto, incidental ou consequencial, incluindo lucros perdidos, dados perdidos ou perda de uso, mesmo que tenhamos sido avisados da possibilidade de tais danos.
            </p>
          </section>

          <section className="legal-section">
            <h2>8. Modificação de Termos</h2>
            <p>
              Reservamos o direito de modificar estes Termos de Serviço a qualquer momento. As alterações serão efetivas imediatamente após serem postadas. Seu uso contínuo do RollPlay após tais modificações constitui sua aceitação dos novos Termos de Serviço.
            </p>
          </section>

          <section className="legal-section">
            <h2>9. Encerramento</h2>
            <p>
              Qualquer uma das partes pode encerrar seu uso do RollPlay a qualquer momento, por qualquer motivo, com ou sem aviso prévio. Ao encerrar, suas campanhas e personagens serão mantidos por 30 dias antes da exclusão permanente.
            </p>
          </section>

          <section className="legal-section">
            <h2>10. Contato</h2>
            <p>
              Se você tiver dúvidas sobre estes Termos de Serviço, entre em contato conosco através do nosso formulário de suporte no site.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
