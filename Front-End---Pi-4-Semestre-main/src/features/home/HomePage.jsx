import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import "./home.css";

export default function HomePage() {
    return (
        <div className="home-container">
            <Navbar />
            <main className="home-main">
                <section className="home-hero">
                    <div className="home-hero-content">
                        <h2>SUA AVENTURA COMEÇA AQUI</h2>
                        <p>ROLL & PLAY É UMA PLATAFORMA GRATUITA PARA JOGADORES DE RPG DE MESA. CRIE PERSONAGENS, ORGANIZE SESSÕES E ROLE DADOS - TUDO EM UM SÓ LUGAR.</p>
                        <div className="home-hero-buttons">
                            <a href="/registrar" className="home-btn-primary">Começar agora</a>
                            <a href="/entrar" className="home-btn-secondary">Fazer Login</a>
                        </div>
                    </div>
                    <div className="home-hero-image">
                        {/* Imagem do mago com a lua */}
                    </div>
                </section>
                <section className="home-features">
                    <h2>TUDO QUE VOCÊ PRECISA PARA SUAS AVENTURAS</h2>
                    <p className="home-features-subtitle">A roll & play é um sistema que se propõe a facilitar a criação e a administração de campanhas de rpg, oferecendo diversas ferramentas para auxiliar a vida de players e mestres.</p>

                    <div className="home-features-grid">
                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📝</span>
                            </div>
                            <h3>FICHAS DE PERSONAGENS</h3>
                            <p>Crie e gerencie fichas de personagem para seus jogos de rpg, com atualização em tempo real e compartilhamento fácil.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📅</span>
                            </div>
                            <h3>CRIAÇÃO DE SESSÕES</h3>
                            <p>Organize suas sessões de jogo criando salas virtuais e definindo agendamento de aventuras para seu grupo.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">💬</span>
                            </div>
                            <h3>CHAT INTEGRADO</h3>
                            <p>Comunique-se com outros através de nosso chat integrado, tudo reunido na mesma plataforma.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">🎲</span>
                            </div>
                            <h3>ROLAGEM DE DADOS</h3>
                            <p>Sistema avançado de rolagem de dados com suporte para fórmulas complexas e histórico de rolagens.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📊</span>
                            </div>
                            <h3>AGENDAMENTO DE SESSÕES</h3>
                            <p>Agende sessões de jogo e envie lembretes automáticos para todos os participantes.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">🤓</span>
                            </div>
                            <h3>APOIO À EDUCAÇÃO</h3>
                            <p>Utilize o roll & play como uma ferramenta pedagógica para ensinar narrativa, trabalho em equipe, resolução de problemas e criatividade de forma divertida e engajadora.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">🎮</span>
                            </div>
                            <h3>PLANEJAMENTO DE AULAS GAMIFICADAS</h3>
                            <p>Crie sessões adaptadas para o ambiente educacional, com recursos interativos, atividades personalizadas e acompanhamento do desempenho dos alunos por meio de rpgs temáticos.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📚</span>
                            </div>
                            <h3>BIBLIOTECA DE RECURSOS</h3>
                            <p>Acesse uma vasta biblioteca de recursos, incluindo regras, materiais e aventuras prontas para jogar.</p>
                        </div>
                    </div>
                </section>

                <section className="home-about">
                    <div className="home-about-content">
                        <h2>SOBRE O ROLL & PLAY</h2>
                        <p>
                            O Roll & Play é muito mais do que uma plataforma para gerenciar campanhas de RPG — é um ecossistema completo, gratuito e acessível, pensado para atender tanto jogadores apaixonados quanto educadores inovadores. Nascemos do desejo de unir a imaginação dos mundos fantásticos com a realidade das salas de aula, promovendo experiências significativas e colaborativas.
                        </p>
                        <p>
                            Nossa missão é democratizar o acesso ao RPG de mesa, transformando-o em uma ferramenta poderosa para desenvolvimento de habilidades sociais, criativas e cognitivas. Com uma interface intuitiva e funcionalidades robustas, o Roll & Play facilita a criação de personagens, o agendamento de sessões, a comunicação entre participantes e muito mais — tudo em um só lugar.
                        </p>
                        <p>
                            Acreditamos no poder da narrativa para educar, engajar e conectar pessoas. Por isso, além de atender mestres e jogadores, nos dedicamos também a apoiar professores e instituições de ensino, oferecendo recursos que permitem transformar aulas em verdadeiras aventuras de aprendizado. No Roll & Play, jogamos para aprender e aprendemos jogando.
                        </p>
                    </div>


                    <div className="home-about-features">
                        <div className="home-about-badge">100% Gratuito</div>
                        <h2>SOBRE O ROLL & PLAY</h2>
                        <ul className="home-about-list">
                            <li>PLATAFORMA TOTALMENTE GRATUITA, SEM RECURSOS PREMIUM ESCONDIDOS</li>
                            <li>SUPORTE PARA MÚLTIPLOS SISTEMAS DE RPG, INCLUSIVE EDUCACIONAIS</li>
                            <li>INTERFACE INTUITIVA E FÁCIL DE USAR</li>
                            <li>COMUNIDADE ATIVA E EM CRESCIMENTO</li>
                            <li>ATUALIZAÇÕES REGULARES COM NOVAS FUNCIONALIDADES</li>
                            <li>FERRAMENTAS IDEAIS PARA USO EM AMBIENTES ESCOLARES E UNIVERSITÁRIOS</li>
                            <li>AUXILIA NO DESENVOLVIMENTO DE HABILIDADES SOCIOEMOCIONAIS E COGNITIVAS</li>
                            <li>ESTIMULA LEITURA, ESCRITA, ARGUMENTAÇÃO E PENSAMENTO ESTRATÉGICO EM SALA DE AULA</li>
                        </ul>
                        <a href="#" className="home-btn-primary">Junte-se a nós</a>
                    </div>
                </section>

                <section className="home-faq">
                    <h2>PERGUNTAS FREQUENTES</h2>

                    <div className="home-faq-grid">
                        <div className="home-faq-item">
                            <h3>O ROLL & PLAY É REALMENTE GRATUITO?</h3>
                            <p>Sim, o roll & play é 100% gratuito. Não há recursos premium ou conteúdos para usuários pagantes. Nosso objetivo é tornar o rpg acessível a todos.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>POSSO USAR O ROLL & PLAY NO CELULAR?</h3>
                            <p>Sim, o roll & play é totalmente responsivo e funciona em qualquer dispositivo: desktop, móveis, tablets e consoles. Você pode acessar suas fichas e sessões de qualquer lugar.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>QUAIS SISTEMAS DE RPG SÃO SUPORTADOS?</h3>
                            <p>Atualmente, o roll & play oferece suporte exclusivo ao sistemas d&d 5e (e 5.5e). No entanto, nosso objetivo é expandir para outros sistemas populares, além de permitir a criação de fichas personalizadas para tais sistemas.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>COMO FAÇO PARA CONVIDAR MEUS AMIGOS PARA UMA SESSÃO?</h3>
                            <p>Ao criar uma sessão, você receberá um link de convite que pode ser compartilhado com seus amigos. Eles precisarão ter uma conta no roll & play para participar.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>PRECISO CRIAR UMA CONTA PARA USAR?</h3>
                            <p>Sim, é necessário criar uma conta para acessar as funcionalidades do roll & play. O registro é rápido e gratuito, e só pedimos informações essenciais.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>VOCÊS TÊM PLANOS PARA ADICIONAR NOVAS FUNCIONALIDADES?</h3>
                            <p>Absolutamente! Estamos constantemente trabalhando em novas funcionalidades e melhorias com base no feedback da comunidade. Fique atento às atualizações!</p>
                        </div>
                    </div>
                </section>

                <section className="home-cta">
                    <h2>PRONTO PARA COMEÇAR SUA AVENTURA?</h2>
                    <p>JUNTE-SE A CENTENAS DE JOGADORES DE RPG QUE JÁ ESTÃO USANDO O ROLL & PLAY PARA SUAS CAMPANHAS.</p>
                    <div className="home-cta-buttons">
                        <a href="/registrar" className="home-btn-primary">Criar conta gratuita</a>
                        <a href="#" className="home-btn-secondary">Saiba mais</a>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
