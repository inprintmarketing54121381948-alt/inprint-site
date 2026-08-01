# Histórico do projeto — In Print (registro narrativo da conversa)

Este arquivo resume, em ordem cronológica, tudo que foi decidido e construído nas conversas com o
Claude Code sobre o site da In Print. Ele é complementar aos documentos "fonte da verdade"
([planejamento-inprint.md](planejamento-inprint.md), [especificacao-tecnica.md](especificacao-tecnica.md),
[contas-e-acessos.md](contas-e-acessos.md), [CLAUDE.md](CLAUDE.md)) — **para continuar o trabalho em
outra máquina, o que importa de verdade são os arquivos do projeto** (código + esses documentos), não
este histórico. Este arquivo existe só como registro de contexto/memória do processo, a pedido do
cliente.

## 1. Setup inicial do projeto Claude Code

O ponto de partida era uma pasta com material já pronto: `planejamento-inprint.md` (briefing,
identidade visual, os dois fluxos de conversão, sitemap — já aprovados pelo cliente antes desta
conversa), um protótipo HTML navegável (`inprint-prototipo.html`) e wireframes individuais em
`inprint-artefatos-completos/`. Não havia repositório git nem estrutura de projeto Claude Code.

Ações tomadas:
- `git init` na pasta do projeto.
- Criação do `CLAUDE.md` raiz, documentando objetivo do site, estado atual, estrutura de arquivos e
  as regras de negócio já fechadas (não reabrir identidade visual/fluxos sem motivo).
- Criação da skill de projeto `inprint-design-system` (`.claude/skills/inprint-design-system/SKILL.md`)
  — paleta de cores, tipografia, regras do logo e os dois fluxos de conversão como contrato fixo, para
  qualquer geração de código/copy futura respeitar essas decisões independente da stack.
- `.gitignore` inicial (OS/editor).

Nada disso foi commitado ainda nesse momento — só estruturado no disco.

## 2. Definição da stack técnica

O cliente pediu para prosseguir e "fazer perguntas" para fechar a tecnologia do site. A conversa
seguiu em rodadas de perguntas via formulário de múltipla escolha, cobrindo:

1. **Abordagem de plataforma** — escolhido **CMS headless + frontend customizado** (não código 100%
   customizado sem CMS, não WordPress, não website builder no-code), porque os dois fluxos de
   conversão (carrinho de orçamento com lógica própria, formulário de consultoria com blocos
   condicionais) são customizados demais para builders no-code, mas a equipe do cliente **não tem
   conhecimento técnico** e precisa de um painel de edição de conteúdo.
2. **CMS específico** — entre Sanity, Strapi, Payload ou "decida você": o cliente escolheu
   **Strapi** (self-hosted).
3. **Profundidade da integração WhatsApp** — entre link `wa.me` simples (grátis) ou API paga
   (Twilio/Z-API/Meta Cloud API): o cliente escolheu o **link `wa.me` simples**, sem custo de API.
4. **Hospedagem/domínio** — o cliente já tinha domínio registrado na **GoDaddy** (só o domínio, sem
   plano de hospedagem lá).
5. **Orçamento para ferramentas pagas** — prioridade em **manter custo baixo/gratuito** sempre que
   possível.

Isso gerou uma tensão real: Strapi self-hosted não é gratuito de verdade (precisa de servidor rodando
24/7), diferente de um CMS SaaS como o Sanity. Perguntei diretamente se o cliente topava um custo
mínimo (~R$25-35/mês) para o backend do Strapi, ou preferia trocar para algo 100% gratuito — o cliente
**confirmou que topava esse custo mínimo**, mantendo o Strapi.

Também confirmei que o domínio na GoDaddy é **só o domínio** (sem hospedagem compartilhada lá), o que
libera a escolha de onde hospedar o site de verdade.

### Stack final fechada

| Camada | Escolha |
|---|---|
| Frontend | Next.js (React + TypeScript) |
| CMS/Backend | Strapi self-hosted |
| Hospedagem frontend | Vercel (free tier) |
| Hospedagem backend | Railway (~R$25-35/mês, inclui Postgres) |
| Upload de logomarca | Cloudflare R2 (compatível com S3, free tier ~10GB) |
| E-mail transacional | Resend (free tier ~3.000 e-mails/mês) |
| Notificação WhatsApp | Link `wa.me` pré-preenchido (sem custo) |
| Domínio/DNS | GoDaddy (já registrado) |

Detalhes completos e a modelagem de conteúdo do Strapi estão em `especificacao-tecnica.md`.

## 3. Requisitos de Google Ads

O cliente perguntou espontaneamente "como podemos otimizar para Google Ads?" no meio da aprovação da
stack. Isso virou requisito técnico incorporado desde o início (não como retrofit depois):

- Landing pages dedicadas por **Ocasião** (SIPAT, fim de ano, feiras...) — já existiam no sitemap,
  reaproveitadas como páginas de *message match* para campanhas.
- Google Tag Manager + GA4 instalados desde o primeiro deploy.
- Dois eventos de conversão separados: `lead_consultoria_enviado` e `orcamento_finalizado`.
- Captura de parâmetros UTM, gravada em cada Lead/Orçamento no Strapi.
- Banner de consentimento de cookies (LGPD) antes de disparar qualquer tag.
- Páginas de ocasião/categoria estáticas (SSG/ISR) por causa do Core Web Vitals / Quality Score.

O cliente pediu para, nesse momento, **só documentar** essas decisões (sem gerar código ainda) — isso
foi registrado em `especificacao-tecnica.md`.

## 4. Levantamento de contas e informações necessárias

Pergunta do cliente: "quais contas e informações vamos precisar?". Criado `contas-e-acessos.md` com:
contas de infraestrutura a criar (GitHub, Vercel, Railway, Cloudflare, Resend), informações que só o
cliente tinha (domínio, WhatsApp, e-mails), acesso que o Claude precisaria depois (DNS, colaborador em
repositórios) e contas de marketing (Google Ads/GA4/GTM/Search Console).

O cliente forneceu, ao longo da conversa:
- Domínio: `inprintpersonalizados.com.br`
- WhatsApp Business: `19988104989` (formato internacional `5519988104989`)
- E-mail de notificação da equipe: `vendas@inprintpersonalizados.com.br`
- E-mail remetente pretendido: `contato@inprintpersonalizados.com.br` (a criar)

### Decisão sobre e-mail e Google Ads

O cliente perguntou o custo do Google Workspace — pesquisei e informei os valores reais (Business
Starter ~R$32,72/mês promocional, ~R$40,90/mês depois). O cliente decidiu **não pagar Workspace** e
criar uma conta Gmail comum. Resolvemos isso com **encaminhamento de e-mail grátis da GoDaddy**:
`contato@inprintpersonalizados.com.br` continua aparecendo no site, mas as mensagens são encaminhadas
para o Gmail novo — sem custo de hospedagem de e-mail.

Também havia uma conta Google Ads antiga (`inprint.mkt@gmail.com`) que **não estava no CNPJ do
cliente** — decidido **criar uma conta nova do zero**, já no CNPJ correto, em vez de tentar transferir
a antiga. O cliente criou essa conta nova: **`inprint.marketing54121381948@gmail.com`**, que acumula
três papéis: destino do encaminhamento de `contato@`, dona da conta Google Ads nova e dona do GA4.

O cliente também considerou hospedar o site na GoDaddy ou no Google Cloud — expliquei por que nenhuma
das duas é a rota certa (GoDaddy é hospedagem compartilhada tradicional, não roda Node.js/Strapi;
Google Cloud é infraestrutura enterprise, mais cara e complexa sem necessidade) e reafirmei a
combinação já decidida (Vercel + Railway).

## 5. Scaffolding do código

Com tudo levantado, o cliente pediu para prosseguir com o scaffolding de verdade.

### Frontend (`frontend/`)

Criado com `create-next-app` (TypeScript, App Router, Tailwind CSS v4, src dir). Configurado:
- Tokens de design (cores da paleta, fontes Poppins/Dancing Script) via `globals.css` (`@theme`).
- `CartContext` (carrinho de orçamento, persistido em `localStorage`).
- Header, Footer (com placeholders explícitos para dados institucionais ainda não fornecidos),
  `CookieConsent` (banner LGPD que só carrega o GTM depois do aceite) e `GoogleTagManagerScript`.
- `lib/analytics.ts` — captura de UTM + eventos de conversão dos dois fluxos.
- `lib/cms.ts` — cliente de leitura do Strapi (retorna `[]` graciosamente se o Strapi estiver vazio ou
  offline, para as páginas não quebrarem antes de haver conteúdo).
- Todas as páginas do sitemap: home, categorias (+ `[slug]`), ocasiões (+ `[slug]`, como landing SSG),
  kits, produto (`[slug]`, com quantidade mínima e upload de logo), carrinho (com finalização),
  consultoria (formulário completo com os blocos do planejamento, incluindo grupo de presenteados
  repetível), como-funciona, sobre, blog (+ `[slug]`), contato, política de privacidade.
- Rotas de API (`api/consultoria`, `api/orcamento`) que gravam no Strapi via `STRAPI_API_TOKEN`
  (server-side) e disparam e-mail de notificação via Resend com link `wa.me` embutido.
- `npm run build` rodado com sucesso (sem erros de tipo).

TODO conhecido: o upload de logomarca na página de produto hoje só guarda o **nome do arquivo** no
item do carrinho (localStorage não serializa `File`) — o upload real para o R2 ainda precisa ser
implementado na finalização do orçamento.

### Backend (`backend/`)

Criado com `create-strapi-app` (TypeScript). Modelados 7 content types + 2 componentes reutilizáveis:

- **Produto** (com relação para categoria, kits, ocasiões sugeridas)
- **Categoria**, **Ocasião**, **Kit**, **Post** (blog)
- **Lead de consultoria** e **Orçamento** (recebem os envios dos dois fluxos — não devem ter leitura
  pública habilitada, só criação via API token)
- Componentes: `orcamento.item` (item do carrinho) e `consultoria.presenteado` (grupo repetível do
  formulário)

Configurado o provider de upload condicional: usa Cloudflare R2 (S3-compatible) se as variáveis
`R2_*` estiverem no `.env`, senão cai automaticamente no disco local (para não quebrar o dev local
sem R2 configurado).

Validado com `strapi console` (schemas carregam sem erro) e depois com `strapi develop` de verdade.

### Passos manuais pendentes no Strapi (não são código)

Documentados em `backend/README.md`: configurar permissões do papel "Public" (leitura pública só em
produto/categoria/ocasião/kit/post; **nenhuma** leitura pública em lead-consultoria/orçamento), gerar
o API Token para o frontend, e cadastrar conteúdo real (hoje o catálogo está vazio).

## 6. Problemas de ambiente enfrentados (e resolvidos)

Esta máquina de desenvolvimento é **bem limitada em recursos** — vale saber disso ao continuar em
outra máquina (lá provavelmente não vai ter esse problema, mas fica o registro):

- **Disco cheio (`ENOSPC`)** durante a primeira tentativa de instalar o Strapi — o cache do npm
  sozinho ocupava 3,13 GB. Resolvido limpando `npm cache clean --force` e removendo a pasta `backend/`
  corrompida da tentativa que falhou. Depois disso a instalação foi limpa.
- **RAM muito baixa** (só 3,85 GB no total, chegou a ~190 MB livres) causou dois crashes por falta de
  memória: o compilador Turbopack do Next.js (`memory allocation ... failed`) e o Vite/esbuild do
  painel admin do Strapi (`Error: The service was stopped`). Os dois foram resolvidos reiniciando os
  processos. O cliente optou por manter os dois servidores rodando ao mesmo tempo e simplesmente
  reiniciar se caírem de novo, em vez de rodar um de cada vez.

Se isso se repetir na outra máquina, o diagnóstico é sempre o mesmo: checar espaço em disco livre e
RAM livre antes de assumir que é bug de código.

## 7. Estado no momento deste registro

- Frontend e backend rodando localmente (`npm run dev` / `npm run develop`), acessíveis em
  `http://localhost:3000` e `http://localhost:1337/admin`.
- **Nada foi commitado no git ainda** — só estruturado no disco. Para abrir em outra máquina de
  verdade, é necessário commitar (e idealmente subir para um repositório remoto no GitHub, que ainda
  não foi criado — ver `contas-e-acessos.md`, seção 1).
- Catálogo do Strapi está vazio — páginas do site mostram "em preparação" até haver conteúdo real.
- Conteúdo institucional (textos, fotos, depoimentos, CNPJ, endereço, políticas) continua pendente —
  ver checklist "Conteúdo" em `planejamento-inprint.md`, seção 7.
