from pathlib import Path

from PIL import Image as PILImage, ImageOps
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "proposta-comercial"
ASSETS = ROOT / "public" / "assets"

BLACK = colors.HexColor("#070707")
INK = colors.HexColor("#1B1717")
CREAM = colors.HexColor("#F5F0E7")
CHALK = colors.HexColor("#FFFBF4")
GOLD = colors.HexColor("#D5A33E")
MUTED = colors.HexColor("#6F655C")
LINE = colors.HexColor("#D8C9AC")
SOFT = colors.HexColor("#EEE5D5")


styles = getSampleStyleSheet()
LABEL = ParagraphStyle("label", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.4, leading=10, textColor=GOLD, spaceAfter=6, uppercase=True)
TITLE = ParagraphStyle("title", parent=styles["Title"], fontName="Times-Bold", fontSize=28, leading=29, textColor=BLACK, spaceAfter=10)
H1 = ParagraphStyle("h1", parent=styles["Heading1"], fontName="Times-Bold", fontSize=20, leading=22, textColor=BLACK, spaceBefore=5, spaceAfter=10)
H2 = ParagraphStyle("h2", parent=styles["Heading2"], fontName="Times-Bold", fontSize=13.2, leading=15, textColor=BLACK, spaceBefore=9, spaceAfter=5)
BODY = ParagraphStyle("body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.1, leading=13.2, textColor=INK, spaceAfter=8)
BODY_TIGHT = ParagraphStyle("body-tight", parent=BODY, spaceAfter=4, leading=12.1)
CAPTION = ParagraphStyle("caption", parent=BODY, fontName="Helvetica-Oblique", fontSize=8.2, leading=10, textColor=MUTED, alignment=TA_CENTER, spaceAfter=12)
TABLE_HEAD = ParagraphStyle("table-head", parent=BODY, fontName="Helvetica-Bold", fontSize=8.7, leading=10.2, textColor=CHALK, spaceAfter=0)
TABLE_BODY = ParagraphStyle("table-body", parent=BODY, fontSize=8.7, leading=10.5, spaceAfter=0)
SMALL = ParagraphStyle("small", parent=BODY, fontSize=8.5, leading=10.5, textColor=MUTED)
QUOTE = ParagraphStyle("quote", parent=BODY, fontName="Times-Bold", fontSize=15.2, leading=17.5, textColor=BLACK, spaceAfter=14)


def P(text, style=BODY):
    return Paragraph(text, style)


def label(text):
    return P(text.upper(), LABEL)


def heading(text, level=1):
    return P(text, H1 if level == 1 else H2)


def body(text, tight=False):
    return P(text, BODY_TIGHT if tight else BODY)


def bullet(text):
    return Paragraph(f"<font color='#D5A33E'>&bull;</font>&nbsp;&nbsp;{text}", BODY_TIGHT)


def image(path, width, height=None):
    if height is None:
        with PILImage.open(path) as source:
            height = width * source.height / source.width
    img = Image(str(path), width=width, height=height)
    img.hAlign = "CENTER"
    return img


def cover_image():
    """Create a proportional crop for the cover without stretching the source."""
    source_path = ASSETS / "vida-beleza-corporal.png"
    crop_path = OUT / "cover-crop.png"
    target_ratio = 6.02 / 4.5
    with PILImage.open(source_path) as source:
        fitted = ImageOps.fit(source.convert("RGB"), (1204, 900), method=PILImage.Resampling.LANCZOS, centering=(0.5, 0.5))
        fitted.save(crop_path, quality=94)
    return image(crop_path, 6.02 * inch, 4.5 * inch)


def metadata(rows):
    data = []
    for key, value in rows:
        data.append([P(key.upper(), ParagraphStyle("meta-key", parent=BODY, fontName="Helvetica-Bold", fontSize=8.2, textColor=GOLD, leading=10, spaceAfter=0)), P(value, ParagraphStyle("meta-value", parent=BODY, fontSize=9.3, leading=11.2, spaceAfter=0))])
    table = Table(data, colWidths=[0.82 * inch, 5.7 * inch], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]))
    return table


def comparison_table():
    rows = [
        [P("Instagram", TABLE_HEAD), P("Landing page", TABLE_HEAD)],
        [P("Atrai atenção e mantém relacionamento", TABLE_BODY), P("Organiza informação e conduz para o contato", TABLE_BODY)],
        [P("Depende do formato e do algoritmo", TABLE_BODY), P("Oferece um endereço próprio para a clínica", TABLE_BODY)],
        [P("Mostra conteúdos em ordem variável", TABLE_BODY), P("Apresenta a jornada na ordem planejada", TABLE_BODY)],
        [P("É excelente para descoberta social", TABLE_BODY), P("Pode apoiar buscas, campanhas e QR Codes", TABLE_BODY)],
    ]
    table = Table(rows, colWidths=[3.14 * inch, 3.14 * inch], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), BLACK),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 9),
        ("RIGHTPADDING", (0, 0), (-1, -1), 9),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]
    for row in range(1, len(rows)):
        style.append(("BACKGROUND", (0, row), (-1, row), SOFT if row % 2 == 0 else CHALK))
    table.setStyle(TableStyle(style))
    return table


def scope_table():
    rows = [[P("Item", TABLE_HEAD), P("Descrição", TABLE_HEAD), P("Definição", TABLE_HEAD)]]
    values = [
        ("Implementação inicial", "Personalização visual, revisão de textos aprovados, substituição das imagens demonstrativas, publicação e validação final.", "A definir"),
        ("Manutenção sob demanda", "Ajustes de conteúdo, campanhas, novas referências visuais e suporte evolutivo quando solicitados.", "A combinar"),
        ("Prazo estimado", "Após o recebimento dos materiais oficiais e a aprovação da direção da clínica.", "A confirmar"),
        ("Pagamento", "Condição comercial a ser combinada entre as partes.", "A combinar"),
    ]
    for item, description, definition in values:
        rows.append([P(item, TABLE_BODY), P(description, TABLE_BODY), P(definition, TABLE_BODY)])
    table = Table(rows, colWidths=[1.35 * inch, 3.8 * inch, 1.13 * inch], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), BLACK),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]
    for row in range(1, len(rows)):
        style.append(("BACKGROUND", (0, row), (-1, row), SOFT if row % 2 == 0 else CHALK))
    table.setStyle(TableStyle(style))
    return table


def journey_table():
    rows = [[P("Momento", TABLE_HEAD), P("Experiência", TABLE_HEAD), P("Objetivo comercial", TABLE_HEAD)]]
    values = [
        ("Instagram", "Portal de links enxuto", "Direcionar o interesse"),
        ("Primeiro contato", "Landing page premium", "Apresentar a clínica"),
        ("Exploração", "Áreas de cuidado e referências", "Ajudar a pessoa a se identificar"),
        ("Confiança", "Localização, FAQ e linguagem transparente", "Reduzir dúvidas"),
        ("Conversão", "Botão de WhatsApp", "Estimular a avaliação"),
    ]
    for item, experience, goal in values:
        rows.append([P(item, TABLE_BODY), P(experience, TABLE_BODY), P(goal, TABLE_BODY)])
    table = Table(rows, colWidths=[1.15 * inch, 2.2 * inch, 2.93 * inch], repeatRows=1)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), BLACK),
        ("GRID", (0, 0), (-1, -1), 0.45, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 7),
        ("RIGHTPADDING", (0, 0), (-1, -1), 7),
        ("TOPPADDING", (0, 0), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]
    for row in range(1, len(rows)):
        style.append(("BACKGROUND", (0, row), (-1, row), SOFT if row % 2 == 0 else CHALK))
    table.setStyle(TableStyle(style))
    return table


def visual_references():
    paths = [ASSETS / "vida-beleza-facial.png", ASSETS / "vida-beleza-corporal.png", ASSETS / "vida-beleza-capilar.png"]
    cells = [image(path, 1.94 * inch) for path in paths]
    table = Table([cells], colWidths=[2.08 * inch, 2.08 * inch, 2.08 * inch], hAlign="CENTER")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 2),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return table


def draw_page(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(CREAM)
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    if doc.page > 1:
        canvas.setStrokeColor(LINE)
        canvas.setLineWidth(0.45)
        canvas.line(0.78 * inch, height - 0.62 * inch, width - 0.78 * inch, height - 0.62 * inch)
        canvas.setFillColor(BLACK)
        canvas.setFont("Helvetica-Bold", 8)
        canvas.drawString(0.78 * inch, height - 0.45 * inch, "N  VIDA E BELEZA  |  PITUBA")
        canvas.setFillColor(GOLD)
        canvas.drawRightString(width - 0.78 * inch, height - 0.45 * inch, "PRESENÇA DIGITAL PREMIUM")
    canvas.setFillColor(MUTED)
    canvas.setFont("Helvetica-Bold", 8)
    canvas.drawRightString(width - 0.78 * inch, 0.42 * inch, f"VIDA E BELEZA  ·  PROPOSTA COMERCIAL  {doc.page}")
    canvas.restoreState()


def build_pdf():
    OUT.mkdir(parents=True, exist_ok=True)
    path = OUT / "proposta-comercial-vida-e-beleza.pdf"
    doc = SimpleDocTemplate(str(path), pagesize=A4, rightMargin=0.78 * inch, leftMargin=0.78 * inch, topMargin=0.82 * inch, bottomMargin=0.62 * inch, title="Proposta comercial para a Clínica Vida e Beleza", author="Demonstração comercial")
    story = []

    # Page 1
    story += [label("VIDA E BELEZA  ·  PITUBA  ·  SALVADOR, BA"), Spacer(1, 0.18 * inch), P("Proposta comercial para a Clínica Vida e Beleza", TITLE), P("Landing page premium, portal de links e estrutura digital para transformar interesse em conversa.", ParagraphStyle("subtitle", parent=BODY, fontSize=13.4, leading=16, textColor=MUTED, spaceAfter=15)), Spacer(1, 0.05 * inch), Table([[""]], colWidths=[1.2 * inch], rowHeights=[0.025 * inch], style=TableStyle([["BACKGROUND", (0, 0), (-1, -1), GOLD], ["LINEBELOW", (0, 0), (-1, -1), 0, GOLD], ["LEFTPADDING", (0, 0), (-1, -1), 0], ["RIGHTPADDING", (0, 0), (-1, -1), 0]])), Spacer(1, 0.16 * inch), cover_image(), P("Direção visual demonstrativa para uma experiência sofisticada, acolhedora e orientada à conversa.", CAPTION), body("Esta proposta apresenta uma base de presença digital pensada para a Clínica Vida e Beleza. O objetivo é oferecer uma apresentação mais profissional da clínica, organizar a descoberta das áreas de cuidado e facilitar a solicitação de uma avaliação pelo WhatsApp."), Spacer(1, 0.05 * inch), metadata([("Público", "Pessoas que buscam estética avançada, autocuidado e uma conversa clara em Salvador."), ("Status", "Demonstração comercial não oficial")]), PageBreak()]

    # Page 2
    story += [label("VISÃO COMERCIAL"), heading("Uma primeira conversa começa antes do WhatsApp"), body("Quando uma pessoa encontra uma clínica pelo Instagram, por uma indicação ou por uma busca na internet, ela precisa entender rapidamente quem é a empresa, como pode começar e qual é o próximo passo."), body("A proposta transforma esse interesse inicial em uma conversa mais simples, clara e profissional com a Vida e Beleza. A experiência combina direção visual premium, informação essencial, transparência e chamadas para ação distribuídas ao longo da jornada."), heading("Por que a Vida e Beleza deve investir nesta presença digital", 2), heading("Uma primeira impressão mais profissional", 2), body("A página apresenta a clínica com uma linguagem visual sofisticada, acolhedora e coerente com os sinais públicos do Instagram: preto, creme, dourado, acento magenta e símbolo floral demonstrativo.", True), heading("Mais facilidade para iniciar uma conversa", 2), body("O visitante encontra o WhatsApp em pontos estratégicos, sem precisar procurar um número ou navegar por várias telas. O caminho principal é objetivo: conhecer, avaliar e começar.", True), heading("Melhor aproveitamento do tráfego do Instagram", 2), body("O portal de links organiza os principais caminhos em uma única tela, com acesso para solicitar avaliação, conhecer as áreas, encontrar a localização e abrir o perfil público.", True), heading("Comunicação mais cuidadosa e confiável", 2), body("A proposta evita promessas de resultado e informações clínicas sem confirmação. Os materiais demonstrativos podem ser substituídos por imagens autorizadas, textos aprovados e informações oficiais na publicação definitiva."), PageBreak()]

    # Page 3
    story += [label("VALOR DO INVESTIMENTO"), heading("Uma landing page amplia o alcance da clínica"), body("O Instagram é importante para relacionamento e descoberta, mas não precisa ser o único ponto de presença digital da Vida e Beleza. Uma landing page cria um endereço próprio para apresentar a clínica e receber pessoas vindas de diferentes canais."), heading("Instagram e landing page cumprem papéis diferentes", 2), comparison_table(), Spacer(1, 0.16 * inch), heading("Um destino próprio para quem pesquisa a clínica", 2), body("Quando alguém pesquisa por clínica de estética em Pituba, estética avançada em Salvador ou uma avaliação para começar um cuidado, uma página própria pode organizar a relevância local e apresentar a clínica em uma sequência planejada."), body("A descoberta depende da indexação, da qualidade do conteúdo e de fatores de busca, portanto não representa uma garantia de primeira posição. Ainda assim, cria uma base que pode ser compartilhada em campanhas, anúncios, cartões digitais, mensagens e QR Codes."), heading("Mais confiança no momento da decisão", 2), body("Uma página própria ajuda a validar a pesquisa de quem recebeu uma indicação ou encontrou a clínica no Google. Ela oferece contexto, clareza e informações essenciais antes do contato, tornando a decisão de solicitar uma avaliação mais natural."), PageBreak()]

    # Page 4
    story += [label("ESTRUTURA ENTREGUE"), heading("O que está sendo proposto"), body("Uma experiência digital integrada para apresentar a clínica, organizar a atenção do visitante e tornar o próximo passo mais natural."), heading("Landing page premium", 2)]
    story += [bullet(item) for item in ["Hero section com posicionamento, localização e chamada principal.", "Apresentação da proposta de cuidado com linguagem acolhedora.", "Jornada em três etapas: conhecer, avaliar e começar.", "Áreas facial, corporal, capilar e criolipólise sem promessas clínicas.", "Galeria de referências visuais demonstrativas e tópicos editáveis.", "Seção institucional com localização e link para o Google Maps.", "Perguntas frequentes, WhatsApp, Instagram e aviso de demonstração.", "Privacidade, cookies e transparência LGPD como parte do escopo mínimo."]]
    story += [heading("Portal de links para Instagram", 2)]
    story += [bullet(item) for item in ["Identidade visual alinhada à landing page.", "Solicitar uma avaliação pelo WhatsApp.", "Como chegar ao Ed. TK Tower.", "Conhecer as áreas de cuidado e abrir o Instagram.", "Layout pensado para mobile, favicon próprio e política acessível."]]
    story += [heading("Referências visuais da direção", 2), visual_references(), P("Referências visuais demonstrativas para composição e direção de conteúdo. Não representam a clínica, equipe ou resultados reais.", CAPTION), PageBreak()]

    # Page 5
    story += [label("EXPERIÊNCIA E EVOLUÇÃO"), heading("Uma estrutura preparada para crescer"), body("O projeto foi organizado para que a Vida e Beleza possa atualizar sua comunicação sem precisar reconstruir toda a experiência a cada mudança."), heading("Estrutura de conteúdo", 2)]
    story += [bullet(item) for item in ["Conteúdo centralizado para editar textos e referências visuais.", "Inclusão de novos tópicos, campanhas e áreas após confirmação.", "Edição, remoção e reordenação de referências.", "Organização compatível com uma futura conexão a CMS."]]
    story += [heading("Qualidade técnica", 2)]
    story += [bullet(item) for item in ["Vite, React e TypeScript.", "Animações GSAP com movimento discreto e suporte a movimento reduzido.", "SEO local inicial para Pituba e Salvador.", "Acessibilidade semântica, foco de teclado e layout mobile-first.", "Testes automatizados para desktop e mobile com Playwright.", "Repositório GitHub e publicação preparada na Vercel.", "Aviso de cookies e política-base de privacidade com revisão necessária antes da publicação oficial."]]
    story += [heading("Jornada do visitante", 2), journey_table(), PageBreak()]

    # Page 6
    story += [label("APROVAÇÃO E CONTRATAÇÃO"), heading("O que a clínica precisará aprovar"), body("A demonstração apresenta uma direção comercial e visual. Para a publicação oficial, o conteúdo precisa ser validado pela Clínica Vida e Beleza.")]
    story += [bullet(item) for item in ["Logo e identidade visual oficiais, caso substituam a marca demonstrativa.", "Imagens institucionais autorizadas.", "Lista real de procedimentos e áreas de atendimento.", "Informações da equipe, caso sejam apresentadas.", "Textos institucionais e perguntas frequentes oficiais.", "Uso de depoimentos e casos reais, se houver autorização.", "Endereço, horários, formas de contato e domínio oficial.", "Controlador, canais, cookies, ferramentas e política final de privacidade."]]
    story += [heading("Escopo comercial sugerido", 2), scope_table(), heading("Proteção de dados e LGPD", 2), body("O projeto será desenvolvido com transparência sobre cookies e serviços de terceiros, minimização de dados e ausência de captação desnecessária na landing page. A adequação definitiva dependerá da validação da clínica, da definição do controlador e dos tratamentos efetivamente utilizados na versão oficial."), heading("O que diferencia esta proposta", 2), body("Esta não é apenas uma página com informações da clínica. É uma experiência pensada para organizar a atenção do visitante e tornar o próximo passo mais natural."), body("O projeto combina direção visual premium, clareza comercial, conversão pelo WhatsApp, presença local em Salvador, conteúdo visual editável e uma estrutura técnica preparada para evolução."), PageBreak()]

    # Page 7
    story += [label("PRÓXIMO PASSO"), heading("Uma presença digital que começa a conversa"), P("Uma pessoa interessada em cuidado não procura apenas um procedimento.<br/>Ela procura segurança para dar o primeiro passo.", QUOTE), body("Esta proposta ajuda a Vida e Beleza a oferecer essa segurança desde o primeiro contato, com uma presença digital mais clara, mais próxima e preparada para transformar atenção em conversa."), body("Para avançar, a clínica aprova a direção e envia os materiais oficiais. Em seguida, fazemos a personalização final, a revisão da política de privacidade e a publicação."), Spacer(1, 0.14 * inch), Table([[""]], colWidths=[2.25 * inch], rowHeights=[0.025 * inch], style=TableStyle([["BACKGROUND", (0, 0), (-1, -1), GOLD], ["LEFTPADDING", (0, 0), (-1, -1), 0], ["RIGHTPADDING", (0, 0), (-1, -1), 0]])), Spacer(1, 0.28 * inch), P("Demonstração comercial não oficial · valores, prazos, conteúdos e condições sujeitos à aprovação.", SMALL)]

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    print(path)


if __name__ == "__main__":
    build_pdf()
