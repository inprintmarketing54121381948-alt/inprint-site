# Briefing de conteúdo — In Print

Roteiro do que falta pedir ao cliente para a **Fase 3** do [plano-de-desenvolvimento.md](plano-de-desenvolvimento.md)
(conteúdo institucional e catálogo real). Hoje o site está tecnicamente pronto mas vazio — todas as
páginas mostram "em preparação" até isso ser preenchido. Organizado por bloco, do mais simples/rápido
ao que exige mais trabalho do lado do cliente (fotos, catálogo).

## 1. Dados institucionais (rápido — texto curto, sem precisar de design)

Necessários para rodapé, política de privacidade e dados estruturados (schema.org LocalBusiness), que
ajudam tanto a credibilidade do site quanto o SEO local.

- [ ] Razão social completa
- [ ] CNPJ
- [ ] Endereço físico (se houver ponto comercial/showroom — se for só operação remota/fábrica sem
      atendimento ao público, avisar, porque muda o que aparece no rodapé)
- [ ] Telefone comercial (além do WhatsApp já cadastrado, `19988104989`)
- [ ] Links reais das redes sociais da própria Inprint (Instagram, Facebook, LinkedIn se houver) —
      diferente dos campos de rede social que aparecem no formulário de consultoria (aqueles são do
      *cliente que pede orçamento*, não da Inprint)

## 2. Textos institucionais (curto/médio prazo — pode ser rascunho, eu ajudo a lapidar)

- [ ] Texto da página **"Sobre a Inprint"** — história, diferenciais (os 4 já mapeados no planejamento:
      cumprimento de prazo, personalização, qualidade, flexibilidade de pagamento — mas em texto
      corrido, não só bullet points)
- [ ] Texto da página **"Como funciona"** — passo a passo do processo de compra/orçamento, do ponto de
      vista do cliente corporativo
- [ ] Texto curto por **Ocasião** (SIPAT, Fim de ano, Boas-vindas, Feiras, Aniversário de empresa) — 2-4
      frases cada, pensadas como landing page de campanha (message match com anúncios do Google Ads)
- [ ] Confirmar se há mais ocasiões além dessas 5 que valham página própria

## 3. Políticas (importante para LGPD, pode ser texto padrão adaptado)

- [ ] Política de trocas/devoluções (ou confirmar que não se aplica a esse tipo de produto/pedido
      corporativo, e o texto deve dizer isso)
- [ ] Confirmação dos termos de política de privacidade/LGPD — hoje a página existe com texto
      placeholder; preciso saber que dados são coletados (já sabemos: formulário de consultoria,
      carrinho de orçamento, GA4/Ads) e se há algo além disso a declarar

## 4. Prova social (importante para conversão — é diferencial citado no planejamento)

- [ ] Depoimentos/cases de clientes reais (nome da empresa + trecho de depoimento — mesmo que
      informal, tipo WhatsApp, dá pra formatar depois)
- [ ] Números reais: quantos clientes atendidos, quantos anos de mercado, algum número de "peças
      entregues" ou similar — o que for verdadeiro e puder ser afirmado sem exagero

## 5. Fotos de produtos (o item que mais trava — precisa de material visual real)

- [ ] Fotos reais dos produtos do catálogo (substituem os placeholders cinza que estão no site hoje)
- [ ] Pelo menos 1 foto por produto que for cadastrado (mais de um ângulo é melhor, mas 1 já desbloqueia)
- [ ] Formato preferencial: JPG/PNG, orientação quadrada ou retrato, iluminação neutra — se o cliente
      não tiver isso pronto, um smartphone com boa luz já resolve pra V1

## 6. Catálogo para cadastro no Strapi (o item mais trabalhoso — dados estruturados)

Isso não precisa vir em nenhum formato específico — pode ser planilha, lista em texto, ou até uma
conversa gravada — eu organizo depois. Mas por produto, preciso saber:

- [ ] Nome do produto
- [ ] Código/SKU (se não tiver, posso sugerir um padrão)
- [ ] Categoria(s) — ex: canecas, camisetas, bolsas, brindes tecnológicos etc. (a Inprint já deve ter
      uma classificação informal — não precisa inventar do zero)
- [ ] Material
- [ ] Cores disponíveis
- [ ] **Quantidade mínima de pedido** — campo em destaque na página de produto, importante pro modelo
      de negócio B2B
- [ ] Descrição curta
- [ ] Quais Ocasiões esse produto é sugerido para (alimenta a navegação cruzada categoria×ocasião)
- [ ] Se faz parte de algum **Kit especial** já existente, e quais outros produtos compõem esse kit

**Sugestão para começar mais rápido:** não precisa do catálogo inteiro de uma vez. Um lote inicial de
10-15 produtos "carro-chefe" (os mais vendidos/mais representativos de cada categoria) já tira o site
do estado "em preparação" e permite testar o fluxo de carrinho de orçamento com conteúdo real. O resto
do catálogo pode ser cadastrado depois, direto no painel do Strapi pelo próprio cliente (é pra isso que
o painel existe).

## 7. Refinamento do formulário de consultoria (pendência já sinalizada pelo próprio cliente)

O planejamento já registra que os campos de **"Personalização"** (a logomarca permite monocromia?) e
**"Orçamento"** (já existe valor definido?) foram uma primeira versão, "a refinar". Vale uma conversa
rápida:

- [ ] Esses campos continuam fazendo sentido como estão, ou o cliente quer ajustar pergunta/formato?
- [ ] Existe algum campo faltando que a equipe comercial da Inprint sente falta ao qualificar um lead?

## Como usar este documento

Pode ser enviado direto pro cliente como está, ou servir de roteiro pra uma reunião/call de briefing.
Conforme as respostas forem chegando, eu atualizo o site e o catálogo no Strapi — não precisa esperar
ter tudo pronto de uma vez; dá pra ir em lotes (ex: primeiro os dados institucionais + textos, depois o
catálogo inicial, depois fotos e depoimentos).
