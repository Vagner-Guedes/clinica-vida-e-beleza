export const clinic = {
  name: 'Clínica Vida e Beleza',
  shortName: 'Vida e Beleza',
  descriptor: 'Clínica de estética · Pituba, Salvador',
  neighborhood: 'Pituba · Salvador, BA',
  address: 'Ed. TK Tower · Av. Prof. Magalhães Neto, 1856 · Sala 1408 · Pituba, Salvador — BA · 40301-155',
  phoneDisplay: '+55 71 99943-1212',
  phone: '5571999431212',
  experience: '12 anos de experiência',
}

export const whatsappUrl = `https://wa.me/${clinic.phone}?text=${encodeURIComponent('Olá! Vim pelo Instagram da Vida e Beleza e gostaria de solicitar uma avaliação.')}`
export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Ed.+TK+Tower,+Av.+Prof.+Magalh%C3%A3es+Neto,+1856,+Pituba,+Salvador+-+BA'
export const instagramUrl = 'https://www.instagram.com/vidaebelezaesteticaavancada/'

export const journey = [
  { number: '01', title: 'Conhecer', body: 'Veja as áreas apresentadas pela clínica e encontre o cuidado que mais conversa com o que você busca.' },
  { number: '02', title: 'Avaliar', body: 'Conte pelo WhatsApp o que você procura e tire suas primeiras dúvidas antes de falar em protocolo.' },
  { number: '03', title: 'Começar', body: 'Combine uma avaliação e descubra, com a equipe, quais possibilidades fazem sentido para você.' },
]

export const treatmentAreas = [
  { title: 'Facial', text: 'Tratamentos faciais e protocolos personalizados aparecem como parte central da comunicação da clínica.', cue: 'Cuidado para a pele', image: '/assets/vida-beleza-facial.png' },
  { title: 'Corporal', text: 'Uma frente de cuidado corporal para conversar sobre contorno, firmeza e autoestima com contexto.', cue: 'Seu corpo, sua escolha', image: '/assets/vida-beleza-corporal.png' },
  { title: 'Capilar', text: 'A área capilar também está presente na apresentação pública da Vida e Beleza.', cue: 'Cuidado em cada detalhe', image: '/assets/vida-beleza-capilar.png' },
  { title: 'Criolipólise', text: 'Especialidade citada na bio do Instagram; indicação e protocolo devem ser confirmados na avaliação.', cue: 'Especialidade do perfil', image: '/assets/vida-beleza-corporal.png' },
]

export const galleryConcepts = [
  { id: 'facial', title: 'Cuidado facial', meta: 'Imagem demonstrativa · facial', text: 'Uma referência visual para apresentar tratamentos faciais com linguagem elegante e natural.', image: '/assets/vida-beleza-facial.png', alt: 'Imagem demonstrativa de uma consulta de cuidado facial' },
  { id: 'corporal', title: 'Cuidado corporal', meta: 'Imagem demonstrativa · corporal', text: 'Uma composição para falar de cuidado corporal sem transformar estética em promessa de resultado.', image: '/assets/vida-beleza-corporal.png', alt: 'Imagem demonstrativa de uma sala de cuidado corporal' },
  { id: 'capilar', title: 'Cuidado capilar', meta: 'Imagem demonstrativa · capilar', text: 'Uma direção visual para a frente capilar apresentada no perfil público da clínica.', image: '/assets/vida-beleza-capilar.png', alt: 'Imagem demonstrativa de uma conversa sobre cuidado capilar' },
  { id: 'conversation', title: 'A sua avaliação', meta: 'Imagem demonstrativa · conversa', text: 'O primeiro contato aparece como um espaço de escuta, não como um catálogo pronto.', image: '/assets/vida-beleza-consultation.png', alt: 'Imagem demonstrativa de uma conversa com caderno e cerâmica' },
]

export const faqs = [
  { question: 'Como faço para agendar uma avaliação?', answer: 'Clique em qualquer botão de WhatsApp e fale diretamente com a equipe. A mensagem já leva o contexto da página.' },
  { question: 'Quais áreas a clínica apresenta?', answer: 'O perfil público destaca tratamentos faciais, corporais e capilares, além de citar a criolipólise. Protocolos, indicações e condições devem ser confirmados diretamente com a clínica.' },
  { question: 'Onde fica a Vida e Beleza?', answer: 'No Ed. TK Tower, na Av. Prof. Magalhães Neto, 1856, sala 1408, Pituba, Salvador — BA, 40301-155.' },
  { question: 'Esta página é o site oficial da clínica?', answer: 'Não. Esta é uma demonstração comercial não oficial criada a partir da presença pública da Vida e Beleza no Instagram.' },
]

export const privacySections = [
  { title: 'Sobre esta demonstração', body: 'Esta página é uma demonstração comercial não oficial. Antes de qualquer publicação, a clínica deve confirmar quem será o controlador dos dados, os canais oficiais de atendimento e o texto jurídico final.' },
  { title: 'Quais dados são tratados', body: 'A demonstração não possui formulário próprio nem banco de leads. Quando você escolhe falar pelo WhatsApp, os dados são enviados diretamente ao canal da clínica e passam a ser tratados conforme as políticas do WhatsApp e da própria clínica.' },
  { title: 'Cookies e armazenamento local', body: 'Usamos apenas o armazenamento local do navegador para lembrar a escolha do aviso de cookies. Não há ferramenta de analytics, publicidade comportamental ou rastreamento de terceiros instalada nesta demonstração.' },
  { title: 'Seus direitos', body: 'Quando houver uma operação real de tratamento, você poderá solicitar confirmação, acesso, correção, eliminação, informação sobre compartilhamentos e revogação de consentimentos, conforme aplicável pela LGPD. O canal responsável deve ser confirmado pela clínica antes da publicação.' },
  { title: 'Contato e atualização', body: 'Para esta demonstração, o contato indicado é o WhatsApp da Vida e Beleza. A política deve ser revisada sempre que entrarem novos formulários, pixels, ferramentas de métricas, campanhas ou integrações.' },
]
