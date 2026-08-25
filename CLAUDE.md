# In Print — site institucional (B2B, brindes e impressos corporativos)

## O que é este projeto

Site para a In Print, empresa de impressos e brindes personalizados para eventos corporativos.
Objetivo do site: **geração de leads e orçamento**. Público: compradores corporativos (RH, marketing,
eventos) que encomendam brindes para ações como SIPAT, fim de ano, feiras, boas-vindas etc.

O planejamento completo (briefing, concorrentes, identidade visual, fluxos de conversão, sitemap,
checklist) está em [planejamento-inprint.md](planejamento-inprint.md). Leia esse arquivo antes de
qualquer trabalho de conteúdo, UX ou design — ele é a fonte da verdade para decisões já aprovadas
pelo cliente.

**Antes de gerar código ou conteúdo para o site, consulte a skill `inprint-design-system`** — ela
resume paleta, tipografia e as regras de UX/negócio já fechadas (dois fluxos de conversão, carrinho
de orçamento, formulário de consultoria), para manter consistência independente da stack escolhida.

## Estado atual

- **Descoberta, identidade visual, fluxos de conversão e sitemap**: definidos e aprovados pelo cliente.
- **Wireframes e protótipo navegável em HTML/CSS/JS puro** (sem framework): prontos, em
  [inprint-artefatos-completos/](inprint-artefatos-completos/) e na raiz ([inprint-prototipo.html](inprint-prototipo.html)).
  Esses arquivos são material de referência/prova de conceito, não a base de código final.
- **Conteúdo real** (textos institucionais, fotos de produtos, depoimentos, números de prova social,
  políticas/LGPD): pendente — ver seção 7 do planejamento.
- **Plataforma/tecnologia do site final**: **definida** em 2026-07-29 — Next.js (frontend) + Strapi
  self-hosted (CMS/backend), Vercel (hosting frontend), Railway (hosting Strapi), Cloudflare R2
  (upload de logomarca), Resend (e-mail), link `wa.me` (notificação WhatsApp), domínio já registrado
  na GoDaddy. Detalhes completos, modelagem de conteúdo e requisitos de Google Ads/tracking em
  [especificacao-tecnica.md](especificacao-tecnica.md) — leia esse arquivo antes de qualquer
  scaffolding.
- **Scaffolding do código**: **feito** em 2026-07-29 — `frontend/` (Next.js) e `backend/` (Strapi)
  criados e funcionando localmente (build do frontend passa limpo; Strapi sobe sem erro de schema).
  Ver [contas-e-acessos.md](contas-e-acessos.md) para as contas reais (domínio, WhatsApp, e-mails,
  Google Ads/GA4) já usadas no código (placeholders reais, não fictícios).
- **Conteúdo do catálogo**: Strapi ainda está vazio (nenhum produto/categoria/ocasião cadastrado) —
  as páginas do frontend mostram estado "em preparação" até isso ser cadastrado no painel admin.
- **Deploy real**: ainda não feito — GitHub/Vercel/Railway/Cloudflare R2/Resend ainda precisam ser
  criados e conectados (ver contas-e-acessos.md, seção 1).
- **Integrações pendentes**: requisitos de SEO orgânico (distintos dos requisitos de Google Ads, que
  já estão implementados), upload real de logomarca para o R2 na finalização do orçamento (hoje só
  guarda o nome do arquivo — ver TODO em `frontend/src/app/produtos/[slug]/ProdutoDetalheClient.tsx`).
- **`frontend/.env.local`**: existe localmente (gitignorado, não commitado) com URLs/e-mails/WhatsApp
  já preenchidos, mas `STRAPI_API_TOKEN` e `RESEND_API_KEY` ainda estão em branco — até serem
  preenchidos, os formulários de consultoria e orçamento respondem normalmente na tela mas **não
  gravam no Strapi nem disparam e-mail** (fallback silencioso, só loga aviso no console).
- **Git**: primeiro commit feito em 2026-07-29 (`2e67145`), identidade configurada só neste
  repositório (não `--global`). Ainda sem repositório remoto (GitHub) — ver contas-e-acessos.md.
- **Cópia adicional do projeto**: existe uma cópia sincronizada manualmente em
  `\\192.168.0.10\dmsantos\Documentos\InPrint` (exportada via `git archive` + cópia de `.git`, sem
  `node_modules`/`.env`). Essa cópia **não se atualiza sozinha** — precisa ser re-sincronizada
  manualmente sempre que este repositório mudar; ver [historico-do-projeto.md](historico-do-projeto.md),
  seção 8.

## Estrutura de arquivos

```
planejamento-inprint.md              # fonte da verdade: briefing, identidade, fluxos, sitemap, checklist
especificacao-tecnica.md             # stack decidida: Next.js, Strapi, hospedagem, tracking de Google Ads
contas-e-acessos.md                  # contas reais já criadas (domínio, WhatsApp, e-mails, Google Ads/GA4)
plano-de-desenvolvimento.md          # cronograma por fases/marcos até o lançamento, com dependências e critérios de conclusão
historico-do-projeto.md              # registro narrativo da conversa/decisões — complementar, não é fonte da verdade
inprint-prototipo.html               # protótipo navegável (referência visual — não é a base de código final)
291760810_..._n.jpg                  # imagem de referência do logo original (boho/aquarela, pré-evolução)
inprint-artefatos-completos/
  planejamento-inprint.md            # cópia mais antiga/resumida do planejamento — não usar como fonte
  inprint-prototipo.html             # idêntico ao da raiz
  favicon-final.svg, logo-conceito-final.svg, logo-conceito-v1-com-alvo.svg, favicon-opcoes-exploradas.svg
  wireframe-01-home.html … wireframe-06-produto.html   # telas individuais do wireframe
frontend/                            # Next.js (App Router, TS, Tailwind v4) — ver frontend/README.md
backend/                             # Strapi 5 (TS) — content types, componentes — ver backend/README.md
```

Nota: há duplicidade entre a raiz e `inprint-artefatos-completos/`. O `planejamento-inprint.md` da
raiz é a versão completa (192 linhas, com seção de checklist e próximos passos); o de dentro da pasta
é uma versão anterior mais curta. Ao editar o planejamento, edite sempre o da raiz.

## Identidade visual (resumo — detalhes completos na skill `inprint-design-system`)

- Cores: grafite `#1F2937`, azul petróleo `#0F4C5C` (primária/CTA), coral `#D9776B` (accent),
  verde-azulado `#4F9D96` (accent secundário), areia `#E8DFD3` (neutro).
- Tipografia: **Dancing Script** só no wordmark do logo; **Poppins** em todo o resto da UI.
- Tom de voz: formal/corporativo e jovem.

## Modelo de conversão — não simplificar para um único CTA

O site tem **dois fluxos de conversão paralelos e intencionais**, não um só:

1. **"Pedir consultoria"** — formulário qualificado (cliente não sabe o que quer).
2. **Carrinho de orçamento** — botão "Adicionar ao orçamento" em cada produto, ícone de carrinho no
   header com contador, finalização consolidada (cliente já sabe o que quer).

Ambos os fluxos devem coexistir em qualquer implementação futura — ver seção 4 do planejamento.

## Como trabalhar neste projeto

- A stack técnica já está decidida e escafoldada (ver [especificacao-tecnica.md](especificacao-tecnica.md),
  `frontend/README.md`, `backend/README.md`) — não reabrir essa escolha sem motivo.
- Dados reais de conta (domínio, WhatsApp, e-mails, Gmail do Google Ads) já estão em uso no código —
  ver [contas-e-acessos.md](contas-e-acessos.md). Não substituir por placeholders genéricos.
- Decisões de identidade visual, copy de UX (nomes de botões, campos de formulário) e fluxos já estão
  fechadas com o cliente — não as reabra sem motivo; trate como requisitos, não sugestões.
- Itens marcados `- [ ]` no checklist do planejamento (seção 7) são lacunas conhecidas, não bugs.
