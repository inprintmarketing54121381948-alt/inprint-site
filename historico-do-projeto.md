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
- Catálogo do Strapi está vazio — páginas do site mostram "em preparação" até haver conteúdo real.
- Conteúdo institucional (textos, fotos, depoimentos, CNPJ, endereço, políticas) continua pendente —
  ver checklist "Conteúdo" em `planejamento-inprint.md`, seção 7.

## 8. Commit local e transferência para outra máquina

O cliente pediu pra comitar localmente. O git não tinha identidade configurada nesta máquina; em vez
de usar `--global` (evitado por padrão), configuramos a identidade **só neste repositório**
(`user.name "Delano"`, `user.email "projetos.delano@gmail.com"`). Primeiro commit criado:
`2e67145 — Scaffold inicial do site In Print (Next.js + Strapi)`, 121 arquivos.

Em seguida o cliente pediu para transferir o projeto para a pasta de rede
`\\192.168.0.10\dmsantos\Documentos\InPrint`. Feito com `git archive HEAD | tar -x` (exporta
exatamente a árvore versionada, sem `node_modules`/`.env`/build) mais uma cópia bruta da pasta `.git`
por cima, pra levar o histórico de commits junto. Confirmado que os dois lados batem (121 arquivos,
204 objetos git). Aviso dado: não rodar `npm install`/dev direto pela rede — copiar para disco local
na outra máquina antes, pelo mesmo motivo dos travamentos que tivemos aqui (ver seção 6); e que ao
abrir o repositório copiado, o git provavelmente vai reclamar de "dubious ownership" (proteção padrão
pra pastas de rede) — resolve-se com `git config --global --add safe.directory <caminho>` **na outra
máquina**, não nesta.

### Descoberta: frontend não tinha `.env` real

O cliente perguntou por que não havia `.env` no frontend. Resposta: o `frontend/.env.example` sempre
existiu, mas nunca virou um `.env.local` real — o site funcionava mesmo assim porque `lib/cms.ts`,
`lib/notificacoes.ts` e `lib/strapi-write.ts` foram escritos com fallback silencioso (loga aviso no
console e segue) quando faltam `STRAPI_API_TOKEN`/`RESEND_API_KEY`. Consequência prática: os dois
formulários (consultoria e orçamento) **aparentam funcionar na tela, mas não gravam nada no Strapi nem
disparam e-mail** até essas duas variáveis existirem de verdade.

Criado `frontend/.env.local` (gitignorado, não commitado, não vai para a cópia de rede) com os valores
já conhecidos (URLs locais do Strapi, e-mails, número de WhatsApp) e `STRAPI_API_TOKEN`/
`RESEND_API_KEY`/`NEXT_PUBLIC_GTM_ID` em branco — a preencher quando o token do Strapi for gerado no
painel admin e as contas Resend/GTM existirem (ver `contas-e-acessos.md`).

## 9. Sessão de 2026-08-26 — infraestrutura, integrações, conteúdo

Sessão longa cobrindo as Fases 0, 1 e 2 do `plano-de-desenvolvimento.md` (documento criado nesta
mesma sessão, ver seção 10) e o início da Fase 3. Nota de contexto que virou relevante durante a
sessão: **esta máquina roda vários projetos simultâneos não relacionados** (EasyPark, Digitalizador
de Fotos, e um processo chamado "ArqPromptLab" já ocupando a porta 3000) — o aviso antigo de "RAM
muito limitada" na seção 6 está desatualizado, a máquina tem 250GB+ de RAM hoje.

### Fase 0 — Git e GitHub

O `git status` mostrava **110 arquivos modificados/novos não commitados** (praticamente todo o
scaffolding de frontend/backend descrito no CLAUDE.md, nunca commitado depois do primeiro commit
`2e67145`). Revisado que nenhum `.env` real estava sendo incluído, commitado (`ba70632`).

O cliente contou que tinha perdido acesso às contas criadas anteriormente e pediu pra recriar tudo do
zero — mas antes disso, decidiu tentar recuperar o acesso primeiro. Conseguiu recuperar a Gmail
`inprint.marketing54121381948@gmail.com` e a partir dela criou/confirmou o GitHub
(`inprintmarketing54121381948-alt`). Criado o repositório privado `inprint-site` nesse GitHub.

Autenticação resolvida via **chave SSH** gerada nesta máquina (sem senha, só uso local) — o cliente
colou a chave pública em GitHub → SSH Keys. `git push` inicialmente bloqueado pelo classificador do
modo automático (ação de "afeta estado compartilhado"); resolvido criando
`.claude/settings.local.json` (o próprio cliente criou o arquivo, já que escrever regras de permissão
também é uma ação sensível para o classificador) com `Bash(git push:*)` liberado. Push feito com
sucesso; código no ar no GitHub.

### Fase 1 — Contas de infraestrutura

- **GitHub**: recuperado (não recriado), repositório `inprint-site` criado e sincronizado.
- **Vercel**: conta criada (usuário `inprintmarketing54121381948`), projeto conectado ao repositório
  (Root Directory = `frontend/`, já que é um monorepo). Primeiro deploy **falhou**: build travava 60s
  x3 gerando `/categorias` estaticamente porque `fetchFromStrapi` em `frontend/src/lib/cms.ts` não
  tinha timeout — no sandbox de build da Vercel, uma conexão para o fallback `localhost:1337` fica
  pendurada em vez de falhar rápido (diferente do comportamento local). Corrigido adicionando
  `signal: AbortSignal.timeout(8000)` ao fetch. Redeploy funcionou — site no ar em
  `inprint-site-zeta.vercel.app`, mostrando corretamente os placeholders "em preparação" (catálogo
  ainda vazio).
- **Cloudflare**: conta criada. Confirmado que **habilitar o R2 pede cartão de crédito mesmo no free
  tier** — o cliente não tinha cartão disponível no momento, então o R2 ficou **adiado de propósito**
  (o backend já cai automaticamente no disco local sem as variáveis `R2_*`, então isso não bloqueia
  nada em dev).
- **Resend**: conta criada, domínio `inprintpersonalizados.com.br` verificado via DNS (DKIM TXT, SPF
  MX+TXT e DMARC no subdomínio `send`, registros colados na GoDaddy pelo cliente). API key gerada e
  colada em `frontend/.env.local`. Testado de ponta a ponta: POST em `/api/consultoria` e
  `/api/orcamento` disparando e-mails reais, entrega confirmada no painel do Resend.
- **Railway**: deliberadamente adiado para perto do lançamento (único custo recorrente aprovado,
  ~R$25-35/mês) — decisão consciente do cliente, não pendência esquecida.

### Descoberta: Microsoft 365 já ativo no domínio (e duas reviravoltas na decisão de `contato@`)

Ao exportar a zona DNS da GoDaddy pra colar os registros do Resend, apareceu um MX raiz apontando
pra `*.mail.protection.outlook.com` mais registros de autodiscover/Lync — o domínio já tinha
**Microsoft 365 ativo**, não documentado antes. O cliente confirmou que `vendas@` é uma caixa real
nesse M365, já em uso.

Isso invalidou o plano original de `contato@` (encaminhamento grátis GoDaddy → Gmail, pensado pra
evitar custo de Workspace) — decidido no mesmo dia criar `contato@` como caixa real nesse M365, já
que a assinatura "já existia mesmo assim".

**Primeira reviravolta:** o cliente avisou que cada caixa nova no M365 custa **~R$30/mês** — não é
grátis como presumido. Como o único custo recorrente aprovado é o Railway, a decisão voltou pro plano
original (encaminhamento GoDaddy → Gmail).

**Segunda reviravolta:** ao pesquisar como configurar esse encaminhamento, descoberto que
**GoDaddy Email Forwarding e o MX customizado do M365 não coexistem no mesmo domínio** (MX é por
domínio, não por endereço — ativar o encaminhamento da GoDaddy quebraria o recebimento em `vendas@`).
Alternativa proposta (ainda não confirmada, fica pendente): criar `contato@` como **alias ou caixa
compartilhada dentro do mesmo tenant M365** — recurso tipicamente gratuito nos planos M365 Business
(não é uma licença/usuário novo), mas precisa ser confirmado por quem administra o painel do M365
(fora do meu acesso).

### Fase 2 — Integrações validadas de ponta a ponta

- Rodado o Strapi localmente pela primeira vez nesta máquina. Achado um bug real: `.gitignore`
  ignorava a pasta `backend/public/uploads/` **inteira**, então ela nunca existe depois de um clone
  novo — e o Strapi trava na inicialização sem ela (provider de upload local exige a pasta). Corrigido
  com o padrão `.gitkeep` (ignora só o conteúdo).
- Cliente criou o primeiro admin do Strapi, gerou API token (`frontend-dev`, full access), colado em
  `frontend/.env.local`.
- Configurada a role **Public** do plugin Users & Permissions: leitura habilitada em
  Produto/Categoria/Ocasião/Kit/Post; confirmado por teste direto na API que Lead de
  consultoria/Orçamento retornam `403` (não públicos, como deveria ser).
- Testado de ponta a ponta: submissões reais em `/api/consultoria` e `/api/orcamento` gravando de
  verdade no Strapi (confirmado no Content Manager) e disparando e-mail via Resend.
- **Implementado o upload real de logomarca** (TODO conhecido desde o scaffolding): nova rota
  `/api/upload-logo` repassa o arquivo pro endpoint de upload do Strapi (usa disco local hoje, muda
  pra R2 automaticamente quando essa conta for retomada, sem mudar código). `ItemOrcamento` ganhou
  campo `logoUrl`; carrinho mostra link pra logo enviada; e-mail de notificação do orçamento inclui a
  URL no resumo do item. Testado com upload real (arquivo de teste chegou no Strapi e ficou acessível
  pela URL retornada).
- Corrigido bug pequeno: `notificarEquipe` não checava se a resposta do Resend era `ok`, falhando
  silenciosamente em caso de erro — agora loga a falha.
- Nota de processo: durante os reinícios do servidor local, um `curl localhost:3000` acabou batendo
  num projeto completamente diferente ("ArqPromptLab", rodando como processo separado nesta máquina
  compartilhada) — daí em diante o frontend do In Print passou a rodar numa porta dedicada (3555) pra
  evitar esse tipo de confusão.

### Fase 3 (início) — briefing de conteúdo

Criado `briefing-conteudo.md` (roteiro do que pedir ao cliente: dados institucionais, textos,
políticas, prova social, fotos, catálogo de produtos, refinamento do formulário de consultoria) e uma
versão em **PDF** pronta pra envio direto à equipe da In Print (`inprint-levantamento-conteudo.pdf`,
sem menções internas a "cliente"/fases do projeto, com a paleta e tipografia da marca).

Confirmado também que `inprintpersonalizados.com.br` ainda mostra a página padrão de domínio
parqueado da GoDaddy (não a Vercel) — esperado, já que o corte de DNS é passo da Fase 7. O cliente
confirmou que prefere esperar essa fase em vez de apontar o domínio agora.

### Documentos novos desta sessão

- `plano-de-desenvolvimento.md` — cronograma por fases com dependências e critérios de conclusão
  (preenche a lacuna "Cronograma com marcos definido" do checklist em `planejamento-inprint.md`).
- `briefing-conteudo.md` + `inprint-levantamento-conteudo.pdf` — briefing de conteúdo pra Fase 3.
