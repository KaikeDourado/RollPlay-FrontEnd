import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import "./home.css";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
    const { user } = useAuth();

    return (
        <div className="home-container">
            <Navbar />
            <main className="home-main">
                <section className="home-hero">
                    <div className="home-hero-content">
                        <h2>SUA AVENTURA COMEÇA AQUI</h2>
                        <p>ROLL & PLAY É UMA PLATAFORMA PARA JOGADORES E MESTRES DE RPG DE MESA. CRIE PERSONAGENS, ORGANIZE SESSÕES E ROLE DADOS - TUDO EM UM SÓ LUGAR.</p>
                        <div className="home-hero-buttons">
                            {!user && (
                                <>
                                    <a href="/registrar" className="home-btn-primary">Começar agora</a>
                                    <a href="/entrar" className="home-btn-secondary">Fazer Login</a>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="home-hero-image">
                        {/* Imagem do mago com a lua */}
                    </div>
                </section>
                <section className="home-features">
                    <h2>TUDO QUE VOCÊ PRECISA PARA SUAS AVENTURAS</h2>
                    <p className="home-features-subtitle">A Roll & Play é um sistema que se propõe a facilitar a criação e a administração de campanhas de rpg, oferecendo diversas ferramentas para auxiliar a vida de players e mestres.</p>

                    <div className="home-features-grid">

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">⚔️</span>
                            </div>
                            <h3>SUPORTE A SISTEMAS</h3>
                            <p>Utilize fichas e recursos pensados para diferentes sistemas de RPG, com expansão contínua para novas regras e estilos de jogo.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📝</span>
                            </div>
                            <h3>FICHAS DE PERSONAGENS</h3>
                            <p>Crie e gerencie fichas de personagem para seus jogos de rpg, com atualização em tempo real e compartilhamento fácil.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">📚</span>
                            </div>
                            <h3>GESTÃO DE CAMPANHAS</h3>
                            <p>Organize campanhas, acompanhe aventuras em andamento e mantenha informações importantes da mesa reunidas em um só lugar.</p>
                        </div>

                        <div className="home-feature-card">
                            <div className="home-feature-icon home-blue-icon">
                                <span className="home-icon">👥</span>
                            </div>
                            <h3>GERENCIAMENTO DE GRUPOS</h3>
                            <p>Controle participantes, convites e permissões da mesa, facilitando a organização entre mestres e jogadores.</p>
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

                    </div>
                </section>

                <section className="home-about">
                    <div className="home-about-content">
                        <h2>SOBRE O ROLL & PLAY</h2>
                        <p>
                            O Roll & Play é uma plataforma criada para tornar a experiência de jogar RPG de mesa mais prática, organizada e acessível. Nosso objetivo é reunir em um único lugar as ferramentas que mestres e jogadores realmente utilizam no dia a dia, simplificando a gestão de campanhas, personagens, sessões e grupos de jogo.
                        </p>

                        <p>
                            Desenvolvido por apaixonados por RPG, o Roll & Play busca oferecer uma experiência moderna e intuitiva, permitindo que os participantes foquem no que realmente importa: criar histórias memoráveis e viver grandes aventuras. Com recursos voltados para gerenciamento de mesas, fichas digitais, organização de campanhas e interação entre jogadores, a plataforma foi pensada para acompanhar a evolução do hobby e suas necessidades atuais.
                        </p>

                        <p>
                            Acreditamos que o RPG é uma das formas mais poderosas de reunir pessoas, estimular a criatividade e construir experiências compartilhadas. Por isso, trabalhamos constantemente para expandir o suporte a diferentes sistemas, melhorar as ferramentas disponíveis e criar um ambiente que atenda tanto grupos iniciantes quanto veteranos. No Roll & Play, a tecnologia existe para fortalecer a narrativa, não para substituí-la.
                        </p>

                    </div>


                    <div className="home-about-features">
                        <h2>SOBRE O ROLL & PLAY</h2>
                        <ul className="home-about-list">
                            <li>PLATAFORMA ACESSÍVEL COM RECURSOS MODERNOS</li>
                            <li>SUPORTE PARA MÚLTIPLOS SISTEMAS DE RPG</li>
                            <li>INTERFACE INTUITIVA E FÁCIL DE USAR</li>
                            <li>COMUNIDADE ATIVA E EM CRESCIMENTO</li>
                            <li>ATUALIZAÇÕES REGULARES COM NOVAS FUNCIONALIDADES</li>
                            <li>AUXILIA NO DESENVOLVIMENTO DE HABILIDADES SOCIOEMOCIONAIS E COGNITIVAS</li>
                        </ul>
                        <a href="#" className="home-btn-primary">Junte-se a nós</a>
                    </div>
                </section>

                <section className="home-faq">
                    <h2>PERGUNTAS FREQUENTES</h2>

                    <div className="home-faq-grid">
                        <div className="home-faq-item">
                            <h3>POSSO USAR O ROLL & PLAY NO CELULAR?</h3>
                            <p>Sim, o Roll & Play é totalmente responsivo e funciona em qualquer dispositivo: desktop, móveis, tablets e consoles. Você pode acessar suas fichas e sessões de qualquer lugar.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>QUAIS SISTEMAS DE RPG SÃO SUPORTADOS?</h3>
                            <p>Atualmente, o Roll & Play oferece suporte exclusivo ao sistemas d&d 5e (e 5.5e). No entanto, nosso objetivo é expandir para outros sistemas populares, além de permitir a criação de fichas personalizadas para tais sistemas.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>COMO FAÇO PARA CONVIDAR MEUS AMIGOS PARA UMA SESSÃO?</h3>
                            <p>Ao criar uma sessão, você receberá um link de convite que pode ser compartilhado com seus amigos. Eles precisarão ter uma conta no Roll & Play para participar.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>PRECISO CRIAR UMA CONTA PARA USAR?</h3>
                            <p>Sim, é necessário criar uma conta para acessar as funcionalidades do Roll & Play. O registro é rápido e gratuito, e só pedimos informações essenciais.</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>VOCÊS TÊM PLANOS PARA ADICIONAR NOVAS FUNCIONALIDADES?</h3>
                            <p>Absolutamente! Estamos constantemente trabalhando em novas funcionalidades e melhorias com base no feedback da comunidade. Fique atento às atualizações!</p>
                        </div>

                        <div className="home-faq-item">
                            <h3>O ROLL & PLAY É UM VTT COMPLETO?</h3>
                            <p>Não. O Roll & Play não busca substituir plataformas com grid, mapas e movimentação tática. Nosso foco é a gestão de mesas, campanhas, sessões, fichas de personagem e organização dos grupos de RPG.</p>
                        </div>
                    </div>
                </section>

                <section className="home-cta">
                    <h2>PRONTO PARA COMEÇAR SUA AVENTURA?</h2>
                    <p>JUNTE-SE A CENTENAS DE JOGADORES DE RPG QUE JÁ ESTÃO USANDO O ROLL & PLAY PARA SUAS CAMPANHAS.</p>
                    <div className="home-cta-buttons">
                        {!user && <a href="/registrar" className="home-btn-primary">Criar conta gratuita</a>}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
