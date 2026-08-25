# Planejamento do site — In Print (Impressos e Brindes Personalizados)

## 1. Briefing

- **Objetivo do site:** geração de leads e orçamento
- **Público-alvo:** eventos e brindes corporativos
- **Diferenciais da Inprint:**
  - Cumprimento de prazo
  - Projetos realmente personalizados e soluções fora do mercado
  - De olho na qualidade
  - Flexibilidade no pagamento
- **Tom de voz:** formal/corporativo e jovem

## 2. Concorrentes analisados

| Site | Pontos fortes | Observações |
|---|---|---|
| Magazine Brindes | Catálogo extenso, prova social forte, captura de e-mail | Visual genérico |
| Servgela | Megamenu amplo, CTA "orçar produto" em cada item | Textão institucional de SEO |
| Imprimus (Campinas) | "Atendemos apenas empresas", WhatsApp direto, blog ativo | Navegação só por categoria |
| **Só Marcas** (referência escolhida) | Navegação dupla por categoria e ocasião, kits temáticos, simulador de layout, prova social com números e depoimentos, "Planilha de Orçamento" acumulando itens | Referência principal de UX — inspirou o modelo de carrinho de orçamento |

## 3. Identidade visual

### 3.1 Ponto de partida e problema identificado

O logo original (usado no Facebook) tinha estética boho/aquarela — penas de dreamcatcher, respingos pastel, tipografia script decorativa. Esse estilo estava em tensão com o público-alvo B2B (compradores corporativos de eventos e brindes) e com o tom formal/jovem definido no briefing. Decisão do cliente: **não descartar o logo**, evoluí-lo mantendo os elementos com valor de marca já reconhecidos comercialmente.

### 3.2 O que foi mantido e o que mudou

**Mantido:**
- A tipografia script do wordmark "In Print"
- A seta, reinterpretada como símbolo de conexão entre fornecedor e cliente

**Removido/alterado:**
- Penas, aquarela e respingos pastel (elementos boho)
- Paleta evoluída para tons corporativos, preservando uma memória de cor do original (coral/rosa suavizado)

### 3.3 Iterações da composição do logo

1. Primeira proposta: seta com círculos concêntricos (alvo) na ponta, simbolizando "acertar o alvo"
2. **Ajuste solicitado pelo cliente:** remover o alvo; "In Print" deve ficar acima da seta; "Impressos & Brindes Personalizados" deve ficar abaixo da seta
3. Versão final aprovada: wordmark acima → seta simples ao centro (sem alvo) → subtítulo abaixo

### 3.4 Paleta (aprovada)

| Cor | Hex | Uso |
|---|---|---|
| Grafite | `#1F2937` | Texto principal |
| Azul petróleo | `#0F4C5C` | Primário corporativo (botões, CTAs) |
| Coral suavizado | `#D9776B` | Accent herdado do logo original |
| Verde-azulado | `#4F9D96` | Accent secundário — usado como fundo do favicon |
| Areia/bege | `#E8DFD3` | Neutro quente |

### 3.5 Tipografia

- **Dancing Script** — exclusiva do wordmark do logotipo, não usar em textos correntes do site
- **Poppins** — títulos, textos e toda a UI do site

### 3.6 Favicon — histórico de decisão

1. Duas opções apresentadas: (A) ícone com a seta simplificada, (B) monograma "IP" em Poppins
2. Cliente pediu: usar a fonte do logotipo (Dancing Script) no "IP" em vez de Poppins
3. Ajuste: as letras deveriam ser **maiúsculas** ("IP", não "Ip") — mesmo sabendo que letras maiúsculas soltas se conectam menos naturalmente em fontes cursivas, foi a direção confirmada pelo cliente
4. Fundo alterado de `#0F4C5C` (azul petróleo) para `#4F9D96` (verde-azulado accent secundário)

**Resultado final:** monograma "IP" maiúsculo, fonte Dancing Script, fundo `#4F9D96`.

### 3.7 Pendências de identidade

- [ ] Versão do logo em fundo escuro (dark mode)

## 4. Modelo de geração de leads — dois fluxos de conversão

Esta foi uma decisão central do planejamento: em vez de um único botão genérico de "Solicitar orçamento", o site terá **dois caminhos complementares**, pensados para dois perfis diferentes de comprador corporativo.

### 4.1 Fluxo 1 — Consultoria personalizada

Para o cliente que **não sabe exatamente o que quer** e prefere que a Inprint sugira os brindes certos para a ocasião. O botão principal do header foi renomeado de "Solicitar orçamento" para **"Pedir consultoria"**, e leva a um formulário qualificado dividido em blocos:

| Bloco | Campos |
|---|---|
| Dados de contato | Nome, empresa, e-mail, telefone/WhatsApp |
| Sobre a empresa | Site da empresa, redes sociais (Instagram, Facebook, outras) |
| Sobre o evento ou ação | Qual é a ação/tipo de evento, data do evento, local de entrega |
| Sobre os presenteados | Quem são os presenteados (colaboradores, clientes, parceiros), tipo de presenteado + quantidade (repetível para múltiplos grupos) |
| Personalização | A logomarca permite aplicação em monocromia? (sim/não/não sei) |
| Orçamento | Já existe um orçamento definido? (sim/não) + valor aproximado opcional |
| Observações | Campo livre |

**Nota do cliente:** este formulário é uma primeira versão — será refinado depois.

### 4.2 Fluxo 2 — Carrinho de orçamento (por produto)

Para o cliente que **já sabe o que quer** e prefere montar o próprio orçamento navegando pelo catálogo, item por item — modelo inspirado na "Planilha de Orçamento" da Só Marcas.

- Cada card de produto (na listagem de categoria, na home e na página de produto) tem um botão **"Adicionar ao orçamento"**
- Um ícone de carrinho/orçamento no header, com contador de itens, dá acesso à lista acumulada
- Na página de carrinho, cada item mostra imagem, nome, código e campo de quantidade editável, com opção de remover
- Ao finalizar, o cliente preenche dados de contato, local de entrega e observações, e envia um único pedido de orçamento consolidado

### 4.3 Reflexo na página de produto

Por causa do fluxo de carrinho, a página de produto individual ganhou:
- **Quantidade mínima** em destaque (relevante porque brindes corporativos geralmente têm pedido mínimo)
- **Upload de logomarca direto na página do produto** (antecipa a personalização já no momento de montar o orçamento — reforça o diferencial de "projetos realmente personalizados")

## 5. Arquitetura da informação (sitemap)

- Home
- Categorias (navegação por subcategoria, material, cor)
- Ocasiões (Boas-vindas, SIPAT, Feiras, Aniversário de empresa, Fim de ano, etc.)
- Kits especiais
- **Carrinho de orçamento** (fluxo 2 — ver seção 4.2)
- **Consultoria** (fluxo 1 — ver seção 4.1)
- Como funciona
- Sobre a Inprint
- Blog
- Contato

## 6. Páginas wireframadas

1. Home (hero, diferenciais, navegação dupla, kits especiais, prova social, blog)
2. Header com ícone de carrinho de orçamento + botão "Pedir consultoria"
3. Formulário de consultoria
4. Carrinho de orçamento (lista de itens, quantidade, finalização)
5. Listagem de categoria (filtros + grid de produtos, botão "Adicionar" em cada card)
6. Produto individual (galeria, cor, quantidade mínima, upload de logo, botão "Adicionar ao orçamento")

Um **protótipo navegável em HTML** (`inprint-prototipo.html`) conecta todas essas telas com a identidade visual aplicada, incluindo o carrinho funcional (contador atualiza ao clicar em "Adicionar").

## 7. Checklist geral do planejamento

**Descoberta**
- [x] Reunião de briefing realizada
- [x] Objetivos do site definidos
- [x] Público-alvo definido
- [x] Concorrentes mapeados e analisados
- [x] Diferenciais da empresa listados

**Identidade visual**
- [x] Imagem de referência recebida e analisada
- [x] Direção de evolução definida (manter tipografia + seta, remover boho)
- [x] Composição do logo ajustada conforme feedback (wordmark acima, seta sem alvo, subtítulo abaixo)
- [x] Paleta aprovada
- [x] Favicon definido (IP maiúsculo, fonte do logo, fundo #4F9D96)
- [ ] Versão do logo em fundo escuro

**Modelo de geração de leads**
- [x] Fluxo de consultoria definido (formulário qualificado)
- [x] Fluxo de carrinho de orçamento definido (por produto)
- [x] Campos do formulário de consultoria mapeados (a refinar)
- [ ] Refinamento final dos campos do formulário de consultoria

**Estrutura**
- [x] Sitemap definido
- [x] Fluxo de navegação (categoria + ocasião)
- [x] Fluxo de conversão (consultoria + carrinho de orçamento)

**Conteúdo**
- [ ] Textos institucionais
- [ ] Fotos de produtos reais
- [ ] Depoimentos/cases
- [ ] Políticas (trocas, LGPD)
- [ ] Números reais de prova social (clientes atendidos, anos de mercado)

**Wireframes e protótipo**
- [x] Home
- [x] Header com carrinho
- [x] Formulário de consultoria
- [x] Carrinho de orçamento
- [x] Listagem de categoria
- [x] Produto individual
- [x] Protótipo navegável funcional

**Técnico**
- [x] Plataforma definida — Next.js + Strapi (ver [especificacao-tecnica.md](especificacao-tecnica.md))
- [x] Integração de upload de logomarca (formulário de consultoria e página de produto) — Cloudflare R2
- [x] Notificações do formulário de consultoria e do carrinho de orçamento — e-mail (Resend) + link wa.me
- [ ] Requisitos de SEO
- [x] Requisitos de Google Ads/rastreamento de conversão definidos — GTM/GA4, eventos por fluxo, captura de UTM (ver especificacao-tecnica.md, seção 3)
- [x] Scaffolding do projeto — `frontend/` (Next.js) e `backend/` (Strapi) criados, ver CLAUDE.md

**Gestão**
- [x] Cronograma com marcos definido — ver [plano-de-desenvolvimento.md](plano-de-desenvolvimento.md)
- [ ] Responsáveis por aprovação definidos

## 8. Próximos passos sugeridos

1. Refinar os campos do formulário de consultoria
2. Roteiro de perguntas para o briefing de conteúdo (textos, números reais, fotos)
3. Especificação técnica (plataforma, integrações, upload de logo, notificações)
4. Cronograma e aprovação final antes do desenvolvimento
