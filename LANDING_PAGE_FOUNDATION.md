# Landing Page Foundation

Base operacional para criar landing pages comerciais com identidade forte, motion de alto nível e validação objetiva.

## 1. Padrão tecnológico

Este é o ponto de partida padrão. Qualquer mudança deve ser justificada pelo produto, pelo deploy ou por uma restrição real do cliente.

- **Frontend:** Vite + React + TypeScript.
- **Estilos:** CSS organizado por tokens, componentes e seções; sem depender de estilos inline espalhados.
- **Motion:** GSAP como motor principal.
- **Qualidade:** Playwright para comportamento, responsividade e screenshots.
- **Compreensão do projeto:** Graphify para mapear relações entre código, documentação e decisões.
- **Direção de interface:** Impeccable para brief, sistema visual, auditoria e acabamento.
- **Referências de interação:** Magic UI e Aceternity UI para padrões como beam, spotlight, marquee, moving border e text reveal, sempre adaptados à identidade da página.

Quando a landing page for extremamente simples, HTML/CSS/JS estático pode substituir React, mas a decisão deve ser registrada no briefing da página. GSAP, Playwright, Graphify e o processo de qualidade continuam sendo considerados conforme a necessidade real.

## 2. Brief mínimo antes do código

Toda nova landing page deve começar com estas respostas:

```md
# Brief da landing page

## Produto
- Nome:
- O que é:
- Mecanismo ou diferencial que não pode ser genérico:

## Público
- Quem é:
- Em qual situação chega à página:
- Qual objeção precisa ser vencida:

## Conversão
- Ação principal:
- Ação secundária:
- O que acontece depois do clique:

## Conteúdo e prova
- Copy aprovada:
- Benefícios comprováveis:
- Depoimentos, números, logos, imagens ou demonstrações reais:
- Conteúdo que ainda precisa ser produzido:

## Restrições
- Marca, cores, fontes ou assets obrigatórios:
- Requisitos legais:
- Requisitos de acessibilidade:
- Deploy e domínio:
```

Não inventar depoimentos, métricas, clientes, prêmios, logos ou resultados. Quando um dado for ilustrativo, identificá-lo como tal.

## 3. Fluxo padrão de criação

### Fase A — Contexto e arquitetura

1. Rodar o contexto da Impeccable:

   ```powershell
   .agents/skills/impeccable/scripts/impeccable.cmd context
   ```

2. Criar ou atualizar `PRODUCT.md` com público, propósito, posicionamento, restrições e evidências reais.
3. Usar o Graphify depois que existirem arquivos relevantes:

   ```powershell
   python -m graphify update .
   python -m graphify query "quais são as áreas principais e os fluxos de conversão?"
   ```

4. Definir o modo da página: normalmente **Persuade** para uma landing page comercial.
5. Definir a tese do primeiro viewport, a sequência de prova e a ação principal antes de criar componentes.

### Fase B — Direção visual

1. Usar a Impeccable para estruturar a superfície e evitar o template padrão de SaaS.
2. Registrar decisões visuais duráveis em `DESIGN.md`: tipografia, paleta, ritmo, tratamento de mídia, bordas, profundidade, iconografia e regras de motion.
3. A primeira viewport deve provar o mecanismo do produto, não apenas exibir um título sobre um fundo decorativo.
4. Preferir conteúdo e imagens autorais/verificados a gradientes, cards repetitivos, ícones decorativos e efeitos sem função.
5. Construir uma gramática única: o motion, as formas, os pesos tipográficos e os espaçamentos devem parecer parte do mesmo sistema.

### Fase C — Implementação

Organização sugerida:

```text
src/
  components/       # componentes reutilizáveis
  sections/         # blocos da página
  animations/       # timelines GSAP e contratos de motion
  styles/           # tokens, base e estilos globais
  content/          # copy e dados da página
  assets/           # mídia específica quando não estiver em public/
tests/
  e2e/              # cenários Playwright
public/
  assets/           # imagens e arquivos públicos
PRODUCT.md
DESIGN.md
playwright.config.ts
```

Separar a definição da animação do componente quando a timeline ficar complexa. Toda animação deve ter um alvo claro: guiar atenção, explicar uma transformação, mostrar relação entre elementos ou tornar uma interação memorável.

## 4. Padrão de animação GSAP

GSAP é o motor padrão, mas a página não deve ser animada por obrigação. A regra é uma assinatura de motion bem orquestrada, com detalhes subordinados a ela.

Magic UI e Aceternity UI entram como bibliotecas de referência para padrões de interação e composição. Em projetos fora de Tailwind/shadcn, prefira uma adaptação local e leve quando isso preservar o sistema visual e permitir que o GSAP controle timeline, scroll, pointer e limpeza dos eventos. O uso de efeitos deve ter uma função: atenção, continuidade, feedback ou contexto.

### Ferramentas preferenciais

- **Core e timelines:** sequências coordenadas, estados iniciais visíveis e eases consistentes.
- **ScrollTrigger:** entrada em cena, scrub, pinning e narrativas ligadas ao scroll.
- **Flip:** transições entre estados de layout, filtros, expansão e reorganização de conteúdo.
- **Observer:** gestos, wheel, touch e navegação direcional quando a interação pedir isso.
- **MotionPath:** trajetórias que expliquem um percurso ou tenham relação semântica com o produto.
- **Text plugins ou SplitText:** apenas quando a tipografia for parte real da direção, nunca como efeito automático em todo título.

### Regras de motion

- Conteúdo deve continuar legível e útil sem depender da animação.
- Evitar a mesma entrada em todos os blocos da página.
- Não esconder conteúdo essencial com `opacity: 0` aguardando uma animação.
- Respeitar `prefers-reduced-motion`, oferecendo uma versão sem deslocamentos excessivos, scrub ou parallax.
- Usar `gsap.context()` ou limpeza equivalente em componentes desmontáveis.
- Centralizar timelines importantes e matar triggers/listeners no unmount.
- Testar a página em touch, mouse, teclado e viewport estreito.
- Evitar efeitos caros em grandes superfícies; limitar blur, filtros e atualização por frame.
- Preferir easing com sensação de desaceleração natural; não usar bounce/elastic por padrão.

## 5. Validação com Playwright

Playwright é a verificação de que a página funciona como experiência, não apenas como screenshot.

### Matriz mínima

- Desktop: 1440px de largura.
- Mobile: 390px de largura.
- Um viewport adicional quando o ambiente real do cliente exigir.
- Chromium como baseline; WebKit ou Firefox quando a compatibilidade for requisito.

### Cenários mínimos

1. A página carrega sem erros de console.
2. O primeiro viewport comunica produto, valor e ação principal.
3. A ação principal leva ao destino correto ou abre o fluxo esperado.
4. Navegação e controles funcionam por teclado.
5. Foco visível e ordem de tabulação são coerentes.
6. Não existe overflow horizontal em desktop ou mobile.
7. Menus, accordions, formulários e estados de erro funcionam.
8. A página respeita `prefers-reduced-motion`.
9. Screenshots de desktop e mobile não mostram clipping, conteúdo ausente ou layout quebrado.

### Regras de teste

- Preferir locators semânticos (`getByRole`, `getByLabel`, `getByText`) a seletores frágeis.
- Esperar por estados observáveis, não por `sleep` arbitrário.
- Desabilitar ou controlar animações apenas quando necessário para uma asserção determinística; manter ao menos um teste com motion habilitado.
- Registrar screenshots somente após a página estar estável e o conteúdo crítico estar presente.
- Tratar diferenças de fonte, viewport e carregamento de mídia como problemas reais, não como ruído.

## 6. Uso efetivo do Graphify

Graphify serve para reduzir releitura e preservar entendimento estrutural entre sessões.

```powershell
# Atualizar o grafo após alterações relevantes
python -m graphify update .

# Encontrar relações entre conceitos
python -m graphify query "onde estão definidos os fluxos de conversão?"

# Traçar uma relação específica
python -m graphify path "Hero" "Checkout"

# Explicar um conceito ou componente
python -m graphify explain "ScrollTrigger"
```

Usar `query`, `path` e `explain` antes de navegar manualmente por muitos arquivos. Consultar `graphify-out/GRAPH_REPORT.md` para uma visão arquitetural ampla. Arquivos derivados do grafo não devem poluir o pacote final da landing page sem uma razão explícita.

## 7. Gates de qualidade antes da entrega

- `PRODUCT.md` descreve fatos confirmados, sem claims inventados.
- `DESIGN.md` registra o sistema visual adotado.
- A página funciona em desktop, mobile e teclado.
- A conversão principal é clara e testada.
- GSAP não bloqueia leitura, acessibilidade ou carregamento.
- Playwright passou nos cenários críticos e nas screenshots aprovadas.
- Graphify está atualizado para o estado entregue.
- O detector da Impeccable foi executado uma vez nos alvos alterados:

  ```powershell
  .agents/skills/impeccable/scripts/impeccable.cmd detect --json .
  ```

- O resultado foi revisado visualmente em uma rodada batched de desktop e mobile.
- Não existem overflow, estados quebrados, foco invisível, texto de placeholder ou conteúdo genérico não aprovado.

## 8. Checklist de início para cada nova landing page

- [ ] Copiar este arquivo como base do novo projeto ou confirmar que ele está sendo usado.
- [ ] Preencher o brief mínimo.
- [ ] Escolher stack/deploy e registrar a decisão.
- [ ] Rodar `impeccable context` e concluir `PRODUCT.md`.
- [ ] Mapear o projeto com Graphify quando houver código/documentação.
- [ ] Definir a tese do primeiro viewport e a ação principal.
- [ ] Planejar a assinatura de motion GSAP.
- [ ] Implementar a estrutura e os estados sem depender da animação.
- [ ] Configurar Playwright antes do acabamento final.
- [ ] Validar desktop, mobile, teclado e reduced motion.
- [ ] Rodar detector Impeccable e corrigir achados mecânicos.
- [ ] Atualizar Graphify e preparar o pacote final para o cliente.

## 9. LGPD, privacidade e cookies (padrão obrigatório)

Toda landing page deve nascer com uma camada mínima de transparência e consentimento, mesmo quando a primeira versão é apenas demonstrativa. O texto final deve ser revisado pelo cliente e, quando necessário, por assessoria jurídica antes da publicação.

- Incluir uma página ou seção de **privacidade e cookies** acessível pelo rodapé e pela página de links.
- Exibir um aviso de cookies claro, não bloqueante e acessível, com opção de aceitar e de manter somente os cookies necessários.
- Usar armazenamento local apenas para lembrar a escolha de consentimento quando não houver ferramenta de métricas instalada.
- Não instalar analytics, pixels, publicidade comportamental, mapas incorporados ou integrações que coletem dados sem registrar a finalidade, a base e o consentimento aplicáveis.
- Informar quais dados são tratados, por qual finalidade, com quem podem ser compartilhados e como exercer direitos previstos na LGPD.
- Identificar como demonstrativo qualquer política que ainda dependa da confirmação do controlador, canal de atendimento, ferramentas, prazo de retenção ou responsável por privacidade.
- Não criar formulários, listas de leads, depoimentos, claims ou integrações de WhatsApp sem deixar claro o fluxo de dados e sem autorização do cliente.
- Atualizar a política sempre que entrarem formulários, tags, ferramentas de análise, campanhas, remarketing, CRM, pixels ou novos provedores.
- Incluir `prefers-reduced-motion`, foco visível, linguagem simples e controles de consentimento operáveis por teclado.
