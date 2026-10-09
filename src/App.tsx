import { useEffect, useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  Camera,
  Download,
  FileText,
  MapPin,
  MessageCircle,
  MoveUpRight,
  Sparkles,
} from 'lucide-react'
import { clinic, faqs, galleryConcepts, instagramUrl, journey, mapsUrl, privacySections, treatmentAreas, whatsappUrl } from './content'
import { mountAnimations } from './animations'

const COOKIE_CONSENT_KEY = 'vida-beleza-cookie-consent-v1'

function Logo({ compact = false }: { compact?: boolean }) {
  return <a className={compact ? 'brand brand-compact' : 'brand'} href={compact ? '/' : '#top'} aria-label="Clínica Vida e Beleza · início">
    <span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 64 64" role="presentation"><defs><linearGradient id="brand-ring" x1="8" y1="56" x2="56" y2="8" gradientUnits="userSpaceOnUse"><stop stopColor="#f2bd3e" /><stop offset=".55" stopColor="#ef8d31" /><stop offset="1" stopColor="#c71c86" /></linearGradient><linearGradient id="brand-gold" x1="22" y1="48" x2="45" y2="16" gradientUnits="userSpaceOnUse"><stop stopColor="#c98321" /><stop offset=".58" stopColor="#f7d36b" /><stop offset="1" stopColor="#fff0a7" /></linearGradient></defs><circle cx="32" cy="32" r="28" fill="#050505" stroke="url(#brand-ring)" strokeWidth="2.4" /><path d="M32 47c-1.8-8.2-9.4-10.8-15-11.2 3.8 6.4 8.6 9.9 15 11.2Zm0 0c1.8-8.2 9.4-10.8 15-11.2-3.8 6.4-8.6 9.9-15 11.2Zm0-4.2c-1.1-11.4-6.5-16.2-11.7-18.8 0 9.1 4.4 15.9 11.7 18.8Zm0 0c1.1-11.4 6.5-16.2 11.7-18.8 0 9.1-4.4 15.9-11.7 18.8Zm0-3.8c-1.3-11.6-1.2-17.6 0-22.1 1.2 4.5 1.3 10.5 0 22.1Z" fill="none" stroke="url(#brand-gold)" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
    <span className="brand-lockup"><strong>VIDA<br className="compact-break" /> E BELEZA</strong>{!compact && <small>CLÍNICA DE ESTÉTICA</small>}</span>
  </a>
}

function App() {
  const pathname = typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '') || '/'
  const surface = pathname === '/links' ? <LinkPortal /> : pathname === '/privacidade' ? <PrivacyPage /> : pathname === '/proposta' ? <ProposalPage /> : <LandingPage />
  return <>{surface}<CookieBanner /></>
}

function Cta({ children = 'Solicitar avaliação', light = false, className = '' }: { children?: React.ReactNode; light?: boolean; className?: string }) {
  return <a className={`button ${light ? 'button-light' : 'button-primary'} ${className}`} href={whatsappUrl} target="_blank" rel="noreferrer">
    <MessageCircle size={17} aria-hidden="true" /><span>{children}</span><ArrowUpRight size={16} aria-hidden="true" />
  </a>
}

function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(COOKIE_CONSENT_KEY) === null)
    } catch {
      setVisible(true)
    }
  }, [])

  const saveChoice = (choice: 'necessary' | 'accepted') => {
    try { window.localStorage.setItem(COOKIE_CONSENT_KEY, choice) } catch { /* storage can be unavailable */ }
    setVisible(false)
  }

  if (!visible) return null

  return <aside className="cookie-banner" aria-labelledby="cookie-title" role="region">
    <div className="cookie-copy"><span className="cookie-kicker">PRIVACIDADE E LGPD</span><h2 id="cookie-title">Você escolhe como continuar.</h2><p>Usamos somente o armazenamento necessário para lembrar sua escolha. Não há analytics ou publicidade comportamental nesta demonstração. <a href="/privacidade#cookies">Leia a política de privacidade e cookies.</a></p></div>
    <div className="cookie-actions"><button className="cookie-button cookie-button-quiet" type="button" onClick={() => saveChoice('necessary')}>Somente necessários</button><button className="cookie-button cookie-button-primary" type="button" onClick={() => saveChoice('accepted')}>Concordar</button></div>
  </aside>
}

function Rail({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`rail-label ${light ? 'rail-label-light' : ''}`}><i />{children}</div>
}

function LandingPage() {
  const appRef = useRef<HTMLDivElement>(null)
  const galleryTrackRef = useRef<HTMLDivElement>(null)
  const [openFaq, setOpenFaq] = useState(0)
  const [showTop, setShowTop] = useState(false)

  const scrollGallery = (direction: number) => {
    const track = galleryTrackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-gallery-card]')
    track.scrollBy({ left: direction * (card ? card.getBoundingClientRect().width + 24 : track.clientWidth * .86), behavior: 'smooth' })
  }

  useEffect(() => {
    if (!appRef.current) return
    return mountAnimations(appRef.current)
  }, [])

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="site-shell" ref={appRef}>
    <div className="demo-bar"><span className="status-dot" /> Demonstração comercial não oficial <a href="#about">entenda a proposta <ArrowUpRight size={12} /></a></div>
    <header className="site-header">
      <Logo />
      <nav aria-label="Navegação principal">
        <a href="#proposta">A proposta</a><a href="#jornada">Como funciona</a><a href="#tratamentos">Tratamentos</a><a href="#referencias">Referências</a><a href="#endereco">A clínica</a><a href="#duvidas">Dúvidas</a>
      </nav>
      <Cta className="header-cta" />
    </header>

    <main id="top">
      <section className="hero layout-frame" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="location-chip"><MapPin size={14} /> {clinic.neighborhood}</div>
          <div className="hero-bio" data-hero-copy><span>{clinic.experience}</span><span>facial · corporal · capilar</span><span>criolipólise</span></div>
          <h1 id="hero-title" className="hero-title" aria-label="Sua melhor versão começa aqui.">
            <span className="hero-line"><span className="word-mask"><span data-hero-word>Sua melhor</span></span></span>
            <span className="hero-line hero-line-offset"><span className="word-mask"><span data-hero-word>versão</span></span></span>
            <span className="hero-line hero-line-accent"><span className="word-mask"><span data-hero-word>começa aqui.</span></span></span>
          </h1>
          <p className="hero-intro" data-hero-copy>Tratamentos faciais, corporais e capilares para cuidar da sua melhor versão, com avaliação antes de escolher o próximo passo.</p>
          <div className="hero-actions" data-hero-copy><Cta /><a className="inline-link" href="#proposta">Conhecer a proposta <ArrowDownRight size={17} /></a></div>
          <p className="hero-note" data-hero-copy><Sparkles size={15} /> Uma proposta inspirada na presença pública da Vida e Beleza.</p>
        </div>
        <div className="hero-visual-wrap">
          <div className="hero-visual" data-hero-image>
            <img src="/assets/vida-beleza-corporal.png" alt="Sala de atendimento demonstrativa em preto e dourado com poltrona de estética" />
            <div className="image-wash" />
            <div className="image-caption" data-hero-detail><span>Imagem demonstrativa</span><i /><span>não é foto da clínica</span></div>
            <div className="hero-seal" data-hero-detail><span>VB</span><small>presença<br />com intenção</small></div>
          </div>
          <div className="vertical-note">VIDA E BELEZA <b>·</b> PITUBA, SSA</div>
        </div>
      </section>

      <section className="manifesto layout-frame" id="proposta" aria-labelledby="proposta-title">
        <Rail>UMA OUTRA FORMA DE COMEÇAR</Rail>
        <div className="manifesto-content">
          <h2 id="proposta-title" className="display-heading" data-reveal>Um cuidado que valoriza a sua beleza <em>natural.</em></h2>
          <div className="manifesto-aside" data-reveal><p>Na comunicação pública da Vida e Beleza, tecnologia avançada e tratamentos personalizados caminham junto com a autoestima. A proposta digital traduz esse tom para o primeiro contato.</p><a className="inline-link inline-link-dark" href={instagramUrl} target="_blank" rel="noreferrer">Conhecer o Instagram <ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="journey layout-frame" id="jornada" aria-labelledby="jornada-title" data-journey>
        <div className="journey-intro"><Rail>FLUXO SUGERIDO</Rail><h2 id="jornada-title" className="display-heading display-heading-medium" data-reveal>O seu caminho pode ser <em>simples.</em></h2><p data-reveal>Um primeiro contato com contexto, sem catálogo genérico e sem prometer o que ainda precisa ser confirmado com a clínica.</p></div>
        <div className="journey-list">
          <div className="glaze-line" data-glaze-line aria-hidden="true" />
          {journey.map((step) => <article className="journey-item" key={step.number} data-reveal><div className="journey-index">{step.number}</div><div><h3>{step.title}</h3><p>{step.body}</p></div></article>)}
        </div>
      </section>

      <section className="treatments layout-frame" id="tratamentos" aria-labelledby="tratamentos-title">
        <div className="treatments-heading"><Rail>ÁREAS DE CUIDADO</Rail><h2 id="tratamentos-title" className="display-heading display-heading-medium" data-reveal>Qual parte de você pede mais <em>atenção?</em></h2><p data-reveal>As áreas abaixo aparecem na comunicação pública da Vida e Beleza. Procedimentos, indicações e condições entram somente depois da avaliação.</p></div>
        <div className="treatment-list" data-reveal>{treatmentAreas.map((area, index) => <a className="treatment-row" href={whatsappUrl} target="_blank" rel="noreferrer" key={area.title}><span className="treatment-index">0{index + 1}</span><span className="treatment-main"><strong>{area.title}</strong><small>{area.text}</small></span><span className="treatment-cue">{area.cue}</span><span className="treatment-icon"><ArrowUpRight size={20} /></span></a>)}</div>
      </section>

      <section className="gallery layout-frame" id="referencias" aria-labelledby="referencias-title">
        <div className="gallery-heading"><Rail>REFERÊNCIAS VISUAIS</Rail><h2 id="referencias-title" className="display-heading display-heading-medium" data-reveal>Um olhar mais próximo para cada <em>cuidado.</em></h2><p data-reveal>Uma galeria demonstrativa inspirada nas frentes que o perfil apresenta. Não representa clientes, equipe ou resultados reais.</p></div>
        <div className="gallery-carousel-shell"><div className="gallery-viewport" ref={galleryTrackRef} role="region" aria-labelledby="referencias-title" aria-label="Referências visuais demonstrativas"><div className="gallery-grid">{galleryConcepts.map((concept, index) => <article className="gallery-card" data-gallery-card data-reveal key={concept.id}><div className="gallery-media"><img src={concept.image} alt={concept.alt} loading="eager" /><span className="gallery-index">0{index + 1} / 04</span><span className="gallery-ribbon">imagem demonstrativa · não é caso real</span></div><div className="gallery-card-copy"><span className="gallery-meta">{concept.meta}</span><h3>{concept.title}</h3><p>{concept.text}</p><a className="inline-link inline-link-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Conversar sobre esta área <ArrowUpRight size={16} /></a></div></article>)}</div></div><div className="gallery-controls" aria-label="Controles das referências visuais"><button className="gallery-control" type="button" aria-label="Referência anterior" onClick={() => scrollGallery(-1)}><ArrowLeft size={17} /></button><button className="gallery-control" type="button" aria-label="Próxima referência" onClick={() => scrollGallery(1)}><ArrowRight size={17} /></button></div></div>
      </section>

      <section className="conversation layout-frame" aria-labelledby="conversation-title">
        <div className="conversation-image" data-reveal><img src="/assets/vida-beleza-facial.png" alt="Imagem demonstrativa de uma consulta de cuidado facial" /><span>Material visual demonstrativo</span></div>
        <div className="conversation-copy"><Rail>O PRIMEIRO GESTO</Rail><h2 id="conversation-title" className="display-heading display-heading-medium" data-reveal>A avaliação não precisa começar com <em>pressa.</em></h2><p data-reveal>O conteúdo de procedimentos, protocolos e imagens reais entra aqui somente depois da confirmação da clínica. Até lá, a página faz o essencial: apresenta o lugar e abre a conversa.</p><Cta>Falar pelo WhatsApp</Cta></div>
      </section>

      <section className="clarity layout-frame" aria-labelledby="clarity-title">
        <div className="clarity-head"><Rail>CONTEÚDO A CONFIRMAR</Rail><h2 id="clarity-title" className="display-heading display-heading-medium" data-reveal>Uma página premium também sabe quando <em>não inventar.</em></h2></div>
        <div className="clarity-list" data-reveal>
          <div className="clarity-row"><span>01</span><div><strong>Procedimentos</strong><p>A lista confirmada pode entrar aqui com descrições objetivas e linguagem acessível.</p></div><ArrowRight size={19} /></div>
          <div className="clarity-row"><span>02</span><div><strong>Equipe e credenciais</strong><p>Informações reais podem ocupar este espaço quando aprovadas pela clínica.</p></div><ArrowRight size={19} /></div>
          <div className="clarity-row"><span>03</span><div><strong>Fotos e provas</strong><p>Fotografias da clínica, depoimentos e resultados só entram com autorização e contexto.</p></div><ArrowRight size={19} /></div>
        </div>
      </section>

      <section className="location layout-frame" id="endereco" aria-labelledby="location-title">
        <div className="location-copy"><Rail>ONDE ENCONTRAR</Rail><h2 id="location-title" className="display-heading display-heading-medium" data-reveal>Na Pituba, com um endereço fácil de <em>guardar.</em></h2><p data-reveal>Ed. TK Tower · Av. Prof. Magalhães Neto, 1856 · Sala 1408 · Salvador — BA.</p><div className="location-links"><a className="inline-link inline-link-dark" href={mapsUrl} target="_blank" rel="noreferrer">Abrir no Google Maps <ExternalLink size={15} /></a><a className="inline-link inline-link-dark" href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={15} /> @vidaebelezaesteticaavancada <ExternalLink size={15} /></a></div></div>
        <div className="map-card" data-reveal><div className="map-tag"><MapPin size={14} /> Pituba · Salvador</div><div className="map-visual" role="img" aria-label="Mapa demonstrativo da região da Pituba em Salvador"><span className="map-road map-road-one" /><span className="map-road map-road-two" /><span className="map-road map-road-three" /><span className="map-pin"><MapPin size={21} /></span><span className="map-place">Ed. TK Tower<br /><small>Av. Prof. Magalhães Neto</small></span></div><div className="map-footer"><span>Sala 1408</span><span>40301-155</span></div></div>
      </section>

      <section className="faq layout-frame" id="duvidas" aria-labelledby="faq-title">
        <div><Rail>ANTES DE CLICAR</Rail><h2 id="faq-title" className="display-heading display-heading-medium" data-reveal>Clareza também é uma forma de <em>cuidado.</em></h2></div>
        <div className="faq-list" data-reveal>{faqs.map((faq, index) => <div className={`faq-item ${openFaq === index ? 'is-open' : ''}`} key={faq.question}><button className="faq-trigger" onClick={() => setOpenFaq(openFaq === index ? -1 : index)} aria-expanded={openFaq === index}><span>{faq.question}</span><ChevronDown size={18} /></button><div className="faq-answer"><p>{faq.answer}</p></div></div>)}</div>
      </section>

      <section className="closing layout-frame" id="about" aria-labelledby="closing-title">
        <div className="closing-inner"><div className="closing-copy"><Rail light>O PRÓXIMO PASSO</Rail><h2 id="closing-title" className="closing-title">Comece com o que você quer <em>entender.</em></h2><Cta light>Solicitar uma avaliação</Cta></div><div className="closing-mark" data-beam><span className="beam-orbit beam-orbit-one" /><span className="beam-orbit beam-orbit-two" /><span className="closing-monogram">VB</span></div></div>
      </section>
    </main>

    <footer className="site-footer layout-frame"><Logo compact /><p>Demonstração de presença digital para a Clínica Vida e Beleza. Conteúdo sujeito à confirmação e aprovação da clínica.</p><div className="footer-actions"><a href="/links">Página de links <ArrowUpRight size={14} /></a><a href="/proposta">Proposta comercial <ArrowUpRight size={14} /></a><a href="/privacidade">Privacidade e cookies <ArrowUpRight size={14} /></a><a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={14} /></a></div></footer>
    {showTop && <button className="back-top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })} aria-label="Voltar ao topo"><ArrowUpRight size={17} /></button>}
  </div>
}

function ProposalPage() {
  return <main className="proposal-page"><header className="proposal-header layout-frame"><Logo compact /><span className="proposal-stamp">PROPOSTA COMERCIAL</span><a className="proposal-back" href="/"><ArrowLeft size={16} /> voltar para a apresentação</a></header><article className="proposal-main layout-frame"><section className="proposal-cover"><div className="proposal-cover-copy"><Rail>VIDA E BELEZA · PITUBA · SALVADOR, BA</Rail><h1 className="display-heading">Proposta comercial para a Clínica Vida e <em>Beleza.</em></h1><p>Landing page premium, portal de links e estrutura digital para transformar interesse em conversa.</p><div className="proposal-downloads"><a className="button button-primary" href="/proposta-comercial/proposta-comercial-vida-e-beleza.pdf" download><Download size={17} /><span>Baixar PDF</span><ArrowUpRight size={16} /></a><a className="button button-light" href="/proposta-comercial/proposta-comercial-vida-e-beleza.docx" download><FileText size={17} /><span>Baixar editável</span><ArrowUpRight size={16} /></a></div></div><div className="proposal-cover-media"><img src="/assets/vida-beleza-corporal.png" alt="Imagem demonstrativa de sala de cuidado corporal em preto e dourado" /><span>direção visual demonstrativa · não é foto da clínica</span></div><div className="proposal-meta"><div><small>PÚBLICO</small><strong>Pessoas que buscam estética avançada, autocuidado e uma conversa clara em Salvador.</strong></div><div><small>STATUS</small><strong>Demonstração comercial não oficial</strong></div></div></section><section className="proposal-section proposal-split"><Rail>VISÃO COMERCIAL</Rail><div><h2 className="display-heading display-heading-medium">Uma primeira conversa começa antes do <em>WhatsApp.</em></h2><p>Quando alguém encontra uma clínica pelo Instagram, por indicação ou por busca, precisa entender rapidamente quem é a empresa, como pode começar e qual é o próximo passo.</p><p>A proposta organiza esse interesse em uma experiência mais simples, clara e profissional, com informação essencial, transparência e chamadas para ação distribuídas ao longo da jornada.</p></div></section><section className="proposal-section proposal-split"><Rail>ESTRUTURA ENTREGUE</Rail><div><h2 className="display-heading display-heading-medium">O que está sendo <em>proposto.</em></h2><p>Uma experiência digital integrada para apresentar a clínica, organizar a atenção do visitante e tornar o próximo passo mais natural.</p><ul className="proposal-list"><li>Landing page premium com proposta, jornada, áreas de cuidado, referências visuais, localização, FAQ e WhatsApp.</li><li>Portal de links alinhado ao Instagram, com acesso para avaliação, tratamentos, rota, Instagram e proposta.</li><li>Privacidade, cookies e transparência LGPD como parte do escopo mínimo.</li><li>Estrutura preparada para conteúdo oficial, imagens autorizadas e evolução futura.</li></ul></div></section><section className="proposal-section proposal-dark"><Rail light>EXPERIÊNCIA E EVOLUÇÃO</Rail><div><h2 className="display-heading display-heading-medium">Uma estrutura preparada para <em>crescer.</em></h2><p>O projeto combina direção visual premium, clareza comercial, conversão pelo WhatsApp, presença local em Salvador e uma base técnica preparada para evolução.</p><div className="proposal-dark-grid"><span>Vite · React · TypeScript</span><span>GSAP e movimento reduzido</span><span>Playwright desktop e mobile</span><span>GitHub e publicação na Vercel</span></div></div></section><section className="proposal-section"><Rail>APROVAÇÃO E CONTRATAÇÃO</Rail><div><h2 className="display-heading display-heading-medium">O que a clínica precisará <em>aprovar.</em></h2><p>A demonstração apresenta uma direção comercial e visual. Para a publicação oficial, o conteúdo precisa ser validado pela Clínica Vida e Beleza.</p><div className="proposal-commercial-table"><div><strong>Implementação inicial</strong><span>Personalização, textos aprovados, imagens, publicação e validação final.</span><b>A definir</b></div><div><strong>Manutenção sob demanda</strong><span>Ajustes de conteúdo, campanhas e novas referências visuais.</span><b>A combinar</b></div><div><strong>Prazo estimado</strong><span>Após materiais oficiais e aprovação da direção.</span><b>A confirmar</b></div><div><strong>Pagamento</strong><span>Condição comercial a ser combinada entre as partes.</span><b>A combinar</b></div></div><p className="proposal-legal-note"><strong>Proteção de dados e LGPD.</strong> Transparência sobre cookies e serviços de terceiros, minimização de dados e ausência de captação desnecessária. A adequação definitiva depende da validação da clínica e da definição dos tratamentos efetivamente utilizados.</p></div></section><section className="proposal-next"><Rail light>PRÓXIMO PASSO</Rail><div><h2 className="closing-title">Uma presença digital que começa a <em>conversa.</em></h2><p>Para avançar, a clínica aprova a direção e envia os materiais oficiais. Em seguida, fazemos a personalização final, a revisão da política de privacidade e a publicação.</p><Cta light>Solicitar uma avaliação</Cta></div></section></article><footer className="proposal-footer layout-frame"><span>Clínica Vida e Beleza · demonstração comercial não oficial</span><a href="/">Voltar ao site <ArrowUpRight size={14} /></a></footer></main>
}

function PrivacyPage() {
  return <main className="privacy-page"><header className="privacy-header layout-frame"><Logo compact /><a className="privacy-back" href="/"><ArrowLeft size={16} /> voltar para a apresentação</a></header><article className="privacy-main layout-frame"><div className="privacy-intro"><Rail>TRANSPARÊNCIA DESDE O PRIMEIRO CLIQUE</Rail><h1 className="display-heading">Privacidade e <em>cookies.</em></h1><p>Uma política-base para a demonstração da Clínica Vida e Beleza, escrita para ser revisada e aprovada antes de qualquer publicação.</p></div><div className="privacy-notice"><span className="cookie-kicker">MODELO PARA APROVAÇÃO</span><strong>O texto final depende das ferramentas e dos canais que a clínica realmente utilizar.</strong><p>Se forem adicionados formulários, pixels, métricas, campanhas ou integrações, esta política deve ser atualizada antes do uso.</p></div><div className="privacy-sections">{privacySections.map((section, index) => <section className="privacy-section" id={index === 2 ? 'cookies' : undefined} key={section.title}><span className="privacy-index">0{index + 1}</span><div><h2>{section.title}</h2><p>{section.body}</p></div></section>)}</div><div className="privacy-contact"><span className="cookie-kicker">CANAL INDICADO NA DEMONSTRAÇÃO</span><strong>{clinic.phoneDisplay}</strong><p>Ed. TK Tower · Av. Prof. Magalhães Neto, 1856 · Sala 1408 · Pituba, Salvador — BA.</p><a className="inline-link inline-link-dark" href={whatsappUrl} target="_blank" rel="noreferrer">Falar com a clínica pelo WhatsApp <ArrowUpRight size={16} /></a></div></article><footer className="privacy-footer layout-frame"><span>Clínica Vida e Beleza · demonstração não oficial</span><a href="/">Voltar ao site <ArrowUpRight size={14} /></a></footer></main>
}

function LinkPortal() {
  return <main className="link-page"><div className="link-card"><div className="link-top"><a className="link-back" href="/" aria-label="Voltar para a apresentação"><ArrowLeft size={16} /> voltar para o site</a><span className="link-status"><i /> demonstração</span></div><div className="link-brand"><Logo compact /><p>{clinic.neighborhood}</p></div><div className="link-intro"><h1>Vida e Beleza.</h1><p>Clínica de estética em Salvador, com 12 anos de experiência e um cuidado que começa pela avaliação.</p></div><div className="link-actions"><a className="link-button link-button-primary" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle size={18} /><span>Solicitar avaliação pelo WhatsApp</span><MoveUpRight size={16} /></a><a className="link-button" href={mapsUrl} target="_blank" rel="noreferrer"><MapPin size={18} /><span>Como chegar · Ed. TK Tower</span><ExternalLink size={16} /></a><a className="link-button" href="/#tratamentos"><Sparkles size={18} /><span>Conhecer tratamentos</span><ArrowRight size={16} /></a><a className="link-button" href="/proposta"><FileText size={18} /><span>Ver proposta comercial</span><ArrowRight size={16} /></a><a className="link-button link-button-muted" href={instagramUrl} target="_blank" rel="noreferrer"><Camera size={18} /><span>@vidaebelezaesteticaavancada</span><ExternalLink size={16} /></a></div><div className="link-visual"><div className="link-glaze" /><span>cuidado<br />com intenção</span></div><p className="link-footnote">Endereço: {clinic.address}</p><a className="link-privacy-link" href="/privacidade">Privacidade e cookies <ArrowUpRight size={13} /></a></div></main>
}

export default App
