# Especificação técnica — In Print

Decisões de plataforma/tecnologia fechadas em 2026-07-29, via conversa com o cliente. Este documento
é a fonte da verdade técnica — o scaffolding do projeto (ainda não iniciado) deve seguir exatamente
isto. Complementa [planejamento-inprint.md](planejamento-inprint.md) (negócio/UX/identidade) e a skill
`inprint-design-system` (regras de design/conteúdo).

## 1. Stack

| Camada | Escolha | Motivo |
|---|---|---|
| Frontend | **Next.js** (React + TypeScript) | Combina bem com CMS headless; SSG/ISR para páginas rápidas (importante para Google Ads, ver seção 3) |
| CMS/Backend | **Strapi** (self-hosted) | Painel administrativo amigável para equipe sem conhecimento técnico; modelagem de conteúdo flexível para os dois fluxos de conversão |
| Hospedagem do frontend | **Vercel** | Free tier, deploy automático a cada push, feito sob medida para Next.js |
| Hospedagem do backend (Strapi) | **Railway** (~R$25-35/mês) | Strapi precisa de processo Node + banco sempre ativos — não é viável em free tier realista; Railway inclui Postgres |
| Armazenamento de arquivos (upload de logomarca) | **Cloudflare R2** | Container do Railway não persiste arquivos entre deploys; R2 é compatível com S3, ~10GB grátis, sem custo de egress |
| E-mail transacional | **Resend** | Free tier ~3.000 e-mails/mês, simples de integrar em Next.js/Strapi |
| Notificação WhatsApp | **Link `wa.me` pré-preenchido** (não é API paga) | Decisão do cliente: sem custo/integração extra — o e-mail de notificação inclui um link que abre o WhatsApp da equipe com a mensagem pronta |
| Domínio/DNS | **GoDaddy** (já registrado, só domínio — sem hospedagem lá) | DNS deve apontar `inprint.com.br` → Vercel e um subdomínio (ex: `cms.inprint.com.br`) → Railway |

**Restrição orçamentária confirmada:** prioridade é manter custo baixo; único custo recorrente
aceito pelo cliente é o backend do Strapi (~R$25-35/mês). Qualquer nova ferramenta paga deve ser
justificada e confirmada antes de adicionar.

## 2. Modelagem de conteúdo no Strapi (content types)

Baseado no sitemap e nos dois fluxos de conversão da seção 4/5 do planejamento:

- **Produto** — nome, código, categoria(s), material, cores disponíveis, quantidade mínima, imagens,
  descrição, kits relacionados.
- **Categoria** — nome, slug, produtos relacionados (navegação por subcategoria/material/cor).
- **Ocasião** — nome, slug, descrição, produtos/kits sugeridos (ex: SIPAT, Fim de ano, Boas-vindas,
  Feiras, Aniversário de empresa). Cada ocasião vira uma landing page dedicada — ver seção 3.
- **Kit especial** — nome, produtos incluídos, descrição.
- **Post de blog** — título, slug, conteúdo, imagem de capa, data.
- **Lead de consultoria** — todos os campos do formulário (seção 4.1 do planejamento) + campos de
  atribuição de campanha (ver seção 3).
- **Orçamento (carrinho consolidado)** — itens (produto + quantidade + observação de personalização),
  dados de contato, local de entrega, observações + campos de atribuição de campanha.

## 3. Requisitos de Google Ads / rastreamento de conversão

Decisão: o site precisa ser otimizado para campanhas pagas desde o lançamento, não como retrofit.

- **Landing pages dedicadas por Ocasião** — cada ocasião (SIPAT, Fim de ano etc.) é uma página própria,
  estática (SSG/ISR), pensada para receber tráfego de campanha com *message match* direto ao anúncio.
- **Google Tag Manager + GA4** instalados desde o primeiro deploy.
- **Eventos de conversão separados** para os dois fluxos:
  - `lead_consultoria_enviado` (submissão do formulário de consultoria)
  - `orcamento_finalizado` (finalização do carrinho de orçamento)
- **Captura de UTM** (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) — gravada
  junto de cada Lead de consultoria e cada Orçamento no Strapi, para saber qual campanha gerou qual
  pedido.
- **Banner de consentimento de cookies (LGPD)** — obrigatório antes de disparar qualquer tag de
  rastreamento (GA4/Ads) para visitantes no Brasil.
- **Performance/Core Web Vitals** — páginas de ocasião e categoria devem ser estáticas/rápidas; isso
  também é fator de Quality Score no Google Ads, além de SEO orgânico.

## 4. Itens ainda em aberto (não decididos)

- Modelagem exata dos campos de "Personalização" e "Orçamento" do formulário de consultoria — o
  próprio planejamento marca esses campos como "primeira versão, a refinar" (seção 4.1).
- Se haverá conta de Google Ads/GTM já existente do cliente para reaproveitar IDs, ou se serão criadas
  do zero.
- Estrutura exata de URLs/slugs (ex: `/ocasioes/sipat` vs `/sipat`) — a decidir na hora do scaffolding.
- Nome exato do subdomínio do painel Strapi (sugestão: `cms.inprint.com.br`).

## 5. Status

Scaffolding **ainda não iniciado** por decisão do cliente (2026-07-29) — esta especificação está
documentada para referência futura. Quando o cliente autorizar, o próximo passo é gerar a estrutura
inicial dos dois projetos (Next.js e Strapi) conforme este documento.
