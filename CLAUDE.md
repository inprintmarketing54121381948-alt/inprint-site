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

Ver [plano-de-desenvolvimento.md](plano-de-desenvolvimento.md) para o cronograma completo por fases —
Fases 0, 1 e 2 (fundação de código, contas de infraestrutura, integrações) estão **concluídas** desde
2026-08-26. Resumo:

- **Descoberta, identidade visual, fluxos de conversão e sitemap**: definidos e aprovados pelo cliente.
- **Wireframes e protótipo navegável em HTML/CSS/JS puro**: prontos, em
  [inprint-artefatos-completos/](inprint-artefatos-completos/) e na raiz ([inprint-prototipo.html](inprint-prototipo.html))
  — referência visual, não é a base de código final.
- **Stack e scaffolding**: Next.js + Strapi, criados e funcionando (ver
  [especificacao-tecnica.md](especificacao-tecnica.md)).
- **Git/GitHub**: repositório privado `inprint-site` (GitHub `inprintmarketing54121381948-alt`) criado,
  código commitado e sincronizado via SSH. `git push` liberado sem prompt via
  `.claude/settings.local.json` (gitignorado, não commitado).
- **Contas de infraestrutura**: GitHub, Vercel, Cloudflare (conta) e Resend criadas e funcionando —
  ver [contas-e-acessos.md](contas-e-acessos.md) para detalhes/status de cada uma. Railway e a
  habilitação do R2 (pede cartão de crédito) foram **adiados de propósito**, não esquecidos — o
  backend cai automaticamente no disco local sem R2 configurado.
- **Deploy do frontend**: já no ar em `inprint-site-zeta.vercel.app` (Vercel conectada ao GitHub,
  deploy automático a cada push). O domínio real `inprintpersonalizados.com.br` **ainda não** aponta
  pra lá de propósito — ainda mostra o parqueamento padrão da GoDaddy; o corte de DNS é passo da
  Fase 7, adiado a pedido do cliente até o conteúdo estar pronto pra lançamento.
- **Backend Strapi**: roda localmente (`npm run develop`, porta 1337). Admin criado, API token gerado,
  role Public configurada (leitura só em Produto/Categoria/Ocasião/Kit/Post — **não** em
  Lead-consultoria/Orçamento). `frontend/.env.local` tem `STRAPI_API_TOKEN` e `RESEND_API_KEY`
  preenchidos — os dois fluxos de conversão (consultoria e carrinho de orçamento) foram testados de
  ponta a ponta: gravam no Strapi, disparam e-mail via Resend, e o upload real de logomarca
  (implementado em 2026-08-26, rota `/api/upload-logo`) funciona de verdade.
- **Conteúdo do catálogo**: Strapi ainda está vazio (nenhum produto/categoria/ocasião cadastrado de
  verdade) — as páginas do frontend mostram "em preparação" até isso ser cadastrado. Roteiro do que
  pedir ao cliente em [briefing-conteudo.md](briefing-conteudo.md) (Fase 3, ainda não iniciada).
- **E-mail `contato@inprintpersonalizados.com.br`**: decisão em aberto, ver
  [contas-e-acessos.md](contas-e-acessos.md) seção 2/6 — GoDaddy Email Forwarding não é compatível com
  o Microsoft 365 já ativo no domínio (MX é por domínio, não por endereço); alternativa proposta
  (alias/caixa compartilhada no mesmo M365, tipicamente sem custo extra) ainda precisa ser confirmada
  por quem administra o tenant.
- **Integrações ainda pendentes**: requisitos de SEO orgânico (Fase 5, distintos do tracking de Google
  Ads que já está implementado); contas Google Ads/GTM/Search Console ainda não criadas dentro da
  Gmail `inprint.marketing54121381948@gmail.com` (Fase 4).
- **Rodando localmente nesta máquina**: frontend numa porta dedicada (3555, não 3000/3010 — esta
  máquina roda vários outros projetos simultâneos) e Strapi em 1337. Ver
  [historico-do-projeto.md](historico-do-projeto.md), seção 9, para o porquê da porta dedicada.
- **Cópia adicional do projeto**: existe uma cópia sincronizada manualmente em
  `\\192.168.0.10\dmsantos\Documentos\InPrint` (exportada via `git archive` + cópia de `.git`, sem
  `node_modules`/`.env`). Essa cópia **não se atualiza sozinha** — precisa ser re-sincronizada
  manualmente; ver [historico-do-projeto.md](historico-do-projeto.md), seção 8.

## Estrutura de arquivos

```
planejamento-inprint.md              # fonte da verdade: briefing, identidade, fluxos, sitemap, checklist
especificacao-tecnica.md             # stack decidida: Next.js, Strapi, hospedagem, tracking de Google Ads
contas-e-acessos.md                  # contas reais já criadas (domínio, WhatsApp, e-mails, Google Ads/GA4)
plano-de-desenvolvimento.md          # cronograma por fases/marcos até o lançamento, com dependências e critérios de conclusão
briefing-conteudo.md                 # roteiro do que pedir ao cliente para a Fase 3 (textos, fotos, catálogo, políticas)
inprint-levantamento-conteudo.pdf    # versão em PDF do briefing acima, pronta pra enviar direto à equipe da In Print
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
