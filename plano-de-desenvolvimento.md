# Plano de desenvolvimento — In Print

Cronograma por fases e marcos, criado para preencher a lacuna registrada em
[planejamento-inprint.md](planejamento-inprint.md) (seção 7, "Gestão"): *"Cronograma com marcos
definido"*. Organiza o que falta fazer, na ordem em que precisa ser feito, para o site sair do estado
atual (scaffolding local funcionando, catálogo vazio, nada em produção) até atingir o objetivo do
cliente — **geração de leads e orçamento** via os dois fluxos de conversão.

Este documento não inventa datas de calendário nem responsáveis — isso depende de você e do cliente
(ver "Decisões que dependem de vocês" no fim de cada fase). O que ele define é a **sequência de
dependências**: o que bloqueia o quê, e o critério objetivo para considerar cada fase concluída.
Fontes: [especificacao-tecnica.md](especificacao-tecnica.md), [contas-e-acessos.md](contas-e-acessos.md),
[CLAUDE.md](CLAUDE.md), [historico-do-projeto.md](historico-do-projeto.md).

## Visão geral

| Fase | Objetivo | Status |
|---|---|---|
| 0 | Fundação de código versionada | 🟢 concluída |
| 1 | Contas de infraestrutura e segredos | 🟢 concluída (Railway e R2 adiados de propósito, ver notas) |
| 2 | Integrações pendentes (upload real, e-mail) | 🟡 parcial (fallback silencioso ativo) |
| 3 | Conteúdo institucional e catálogo real | 🔴 não iniciada |
| 4 | Tracking/Google Ads de verdade | 🟡 código pronto, contas não criadas |
| 5 | SEO orgânico | 🔴 requisitos nem definidos |
| 6 | QA end-to-end dos dois fluxos | 🔴 não iniciada |
| 7 | Deploy e lançamento | 🔴 não iniciada |
| 8 | Pós-lançamento | 🔴 não iniciada |

A ordem importa: fases 0 e 1 bloqueiam praticamente tudo depois. Fases 2 e 3 podem correr em
paralelo entre si (uma é técnica, outra é de conteúdo/negócio), mas ambas bloqueiam a fase 6 (QA real
depende de dados reais e integrações ligadas). Fase 4 (tracking) pode ser preparada em paralelo desde
já, mas só é testável de ponta a ponta depois do deploy (fase 7).

---

## Fase 0 — Fundação de código versionada

**Por quê primeiro:** hoje só existe um commit (`2e67145`, "Scaffold inicial") e o `git status` mostra
**110 arquivos modificados/novos não commitados** — ou seja, a maior parte do scaffolding descrito no
CLAUDE.md (frontend completo, backend completo, content types) está só no disco local, sem histórico
nem backup. Sem isso, nada do resto (deploy automático via Vercel/Railway, colaboração, backup) é
possível.

**Escopo:**
1. Revisar o `git status`/`git diff` antes de commitar — checar que nenhum `.env` real ou segredo está
   sendo incluído (o `.gitignore` do frontend e backend já deveria cobrir isso, mas vale conferir).
2. Commit(s) do estado atual do scaffolding (pode ser um commit único ou dividido por área —
   frontend/backend/docs).
3. Criar o repositório remoto no GitHub (ver [contas-e-acessos.md](contas-e-acessos.md), seção 1) e
   fazer o push.
4. Conectar Vercel e Railway ao repositório GitHub (isso já prepara o deploy automático usado na fase 7).

**Critério de conclusão:** `git status` limpo, repositório remoto no GitHub existe e reflete o estado
local, Vercel e Railway já enxergam o repositório (mesmo sem deploy de produção ainda).

**Decisões que dependem de vocês:** criar a conta GitHub (e decidir se o repositório é privado —
recomendado, dado que o projeto tem dados reais de negócio nos arquivos de planejamento).

---

## Fase 1 — Contas de infraestrutura e segredos

**Por quê agora:** as fases seguintes (integrações, deploy) não funcionam sem essas contas existirem.
Hoje, segundo o CLAUDE.md, **nenhuma** conta de infraestrutura foi criada ainda.

**Escopo** (ver [contas-e-acessos.md](contas-e-acessos.md) para detalhes de cada uma):
1. Vercel (login via GitHub) — grátis.
2. Railway (login via GitHub, **precisa de cartão cadastrado**) — ~R$25-35/mês, único custo recorrente
   já aprovado pelo cliente.
3. Cloudflare (para o R2 de upload de logomarca) — grátis até ~10GB. **Confirmado em 2026-08-26: o R2
   pede cartão cadastrado mesmo no free tier**, igual ao Railway. Sem cartão disponível no momento —
   adiado de propósito; o backend já cai automaticamente no disco local sem essa variável configurada
   (ver `backend/config/plugins.ts`), então isso não bloqueia dev nem QA local, só a persistência de
   upload em produção (fica pendente para perto da Fase 7).
4. Resend (e-mail transacional) — grátis até ~3.000 e-mails/mês.
5. Gerar as credenciais reais de cada serviço e preencher:
   - `frontend/.env.local` → `STRAPI_API_TOKEN` e `RESEND_API_KEY` (hoje em branco — é por isso que
     os formulários não gravam nem disparam e-mail ainda, ver TODO no CLAUDE.md).
   - `backend/.env` → variáveis `R2_*` para o provider de upload (já está com fallback condicional
     para disco local, então isso pode ser feito quando o R2 estiver pronto, sem quebrar o dev local).
6. Configurar DNS na GoDaddy: `inprintpersonalizados.com.br` → Vercel, e decidir/criar o subdomínio do
   Strapi (sugestão já registrada em especificacao-tecnica.md: `cms.inprintpersonalizados.com.br`) →
   Railway.

**Critério de conclusão:** as 4 contas existem, os tokens estão preenchidos nos `.env` (locais, não
commitados), e o DNS aponta para os serviços certos (pode ser feito perto da fase 7, mas o registro
pode ser preparado aqui).

**Decisões que dependem de vocês:** criar as contas (login, cartão no caso do Railway) e confirmar o
nome do subdomínio do Strapi.

---

## Fase 2 — Fechar as integrações pendentes

**Por quê:** dois TODOs técnicos específicos, já identificados no CLAUDE.md, impedem que os dois
fluxos de conversão funcionem de ponta a ponta mesmo com as contas da fase 1 criadas.

**Escopo:**
1. **Upload real de logomarca para o R2** — hoje, na finalização do orçamento
   (`frontend/src/app/produtos/[slug]/ProdutoDetalheClient.tsx`), só o **nome do arquivo** é guardado
   no item do carrinho, porque `localStorage` não serializa `File`. Precisa de um fluxo real de upload
   (provavelmente: enviar o arquivo para uma rota de API do Next.js no momento da finalização do
   orçamento, que sobe pro R2 e associa a URL final ao item — não no momento de "adicionar ao
   carrinho").
2. **Validar de ponta a ponta**, com `STRAPI_API_TOKEN` e `RESEND_API_KEY` preenchidos (fase 1):
   - Envio do formulário de consultoria grava um Lead de consultoria real no Strapi e dispara e-mail
     via Resend com link `wa.me` funcional.
   - Finalização do carrinho de orçamento grava um Orçamento real no Strapi (com os itens, upload de
     logo incluído) e dispara e-mail equivalente.
3. Revisar as permissões do papel "Public" no Strapi (documentado como pendência manual em
   `backend/README.md`): leitura pública só em produto/categoria/ocasião/kit/post; **nenhuma** leitura
   pública em lead-consultoria/orçamento.

**Critério de conclusão:** os dois formulários, testados manualmente em ambiente local com contas
reais, gravam no Strapi, disparam e-mail e o link `wa.me` abre com a mensagem certa. Upload de logo
chega de fato no bucket R2.

**Decisões que dependem de vocês:** nenhuma decisão de produto aqui — é trabalho técnico direto, mas
depende da fase 1 estar pronta (tokens reais).

---

## Fase 3 — Conteúdo institucional e catálogo real

**Por quê:** o site está tecnicamente pronto mas **vazio** — sem isso, não há o que lançar. Esta é a
maior lacuna de conteúdo, listada na seção 7 do planejamento como totalmente pendente.

**Escopo:**
1. **Textos institucionais** — "Sobre a Inprint", "Como funciona", textos de cada página de Ocasião
   (SIPAT, Fim de ano, Boas-vindas, Feiras, Aniversário de empresa etc.), rodapé.
2. **Dados institucionais reais** para rodapé/política de privacidade/schema.org (já listados como
   pendência em contas-e-acessos.md, seção 5): razão social, CNPJ, endereço físico (se houver),
   telefone comercial, links de redes sociais da própria Inprint.
3. **Fotos de produtos reais** — substituir qualquer placeholder.
4. **Depoimentos/cases e números reais de prova social** (clientes atendidos, anos de mercado) — o
   protótipo e o planejamento citam prova social como diferencial de conversão (inspirado na Só
   Marcas), então isso não é cosmético, é parte do funil.
5. **Políticas** — trocas/devoluções, LGPD (a página `politica-de-privacidade` já existe no frontend,
   mas com conteúdo placeholder).
6. **Cadastro do catálogo real no Strapi**: Categorias, Produtos (com quantidade mínima, cores,
   material), Ocasiões (com produtos/kits sugeridos), Kits especiais. Só depois disso as páginas do
   site deixam de mostrar "em preparação".
7. **Refinamento final dos campos do formulário de consultoria** — o próprio cliente marcou os campos
   de "Personalização" e "Orçamento" como *"primeira versão, a refinar"* (planejamento, seção 4.1;
   também listado como item em aberto na especificacao-tecnica.md, seção 4). Vale revisitar com o
   cliente antes do lançamento, não depois.

**Critério de conclusão:** nenhuma página do site mostra "em preparação"; rodapé e política de
privacidade têm dados reais; pelo menos um conjunto inicial de produtos/categorias/ocasiões/kits está
cadastrado e navegável.

**Decisões que dependem de vocês:** isso é majoritariamente levantamento de informação com o cliente
(briefing de conteúdo) — não é código. É o maior gargalo de prazo do projeto inteiro, porque depende
de terceiros (cliente) entregarem material.

---

## Fase 4 — Tracking e Google Ads

**Por quê nessa posição:** o código de tracking (GTM, GA4, captura de UTM, eventos de conversão,
banner de consentimento) **já está implementado** desde o scaffolding, mas as contas do lado Google
ainda não existem de fato — só foram decididas (ver contas-e-acessos.md, seção 4/6).

**Escopo:**
1. Criar a conta Google Ads nova (dentro de `inprint.marketing54121381948@gmail.com`, já definida,
   já no CNPJ correto — a conta antiga `inprint.mkt@gmail.com` não será usada).
2. Criar/confirmar GA4 na mesma conta Gmail e linkar com o Google Ads.
3. Criar o container do Google Tag Manager e configurar as tags de GA4 + conversão.
4. **Validar os dois eventos de conversão** (`lead_consultoria_enviado`, `orcamento_finalizado`) no
   GTM Preview Mode, disparando de verdade ao enviar cada formulário.
5. Confirmar que o banner de consentimento (LGPD) bloqueia mesmo o disparo das tags antes do aceite.
6. Abrir Google Search Console (verificação de domínio via DNS TXT na GoDaddy) — baixo esforço, alto
   valor para diagnosticar indexação assim que o site for ao ar.
7. Ativar 2FA na conta Gmail `inprint.marketing54121381948@gmail.com` — ela concentra e-mail + Ads +
   GA4, então é um ponto único de risco (já sinalizado em contas-e-acessos.md).

**Critério de conclusão:** os dois eventos de conversão aparecem no GA4 em tempo real durante um teste
manual; conta de Ads pronta para receber campanhas assim que o site estiver no ar.

**Decisões que dependem de vocês:** criar as contas Google (login, aceite de termos) e decidir o
orçamento inicial de campanha (fora do escopo técnico deste plano).

---

## Fase 5 — SEO orgânico

**Por quê separado do tracking:** a especificação técnica é explícita — os requisitos de SEO orgânico
**ainda não foram definidos** (distintos dos requisitos de Google Ads, que já estão implementados).
Hoje o site tem a base técnica favorável (SSG/ISR, Core Web Vitals como requisito já existente por
causa do Quality Score do Ads), mas falta a camada de conteúdo/SEO em si.

**Escopo a decidir com o cliente antes de virar tarefa técnica:**
1. Palavras-chave alvo por página de Ocasião e Categoria (aproveitando as landing pages já estáticas).
2. Metadados (title/description) por página — hoje provavelmente genéricos no scaffolding.
3. Dados estruturados schema.org (LocalBusiness, Product) — depende dos dados institucionais da fase 3.
4. Sitemap.xml e robots.txt (o `backend/public/robots.txt` existe mas é do Strapi, não do site
   público — confirmar se o frontend Next.js já gera sitemap/robots próprios).
5. Estratégia de blog (a seção existe no sitemap e no código, mas sem conteúdo nem calendário editorial).

**Critério de conclusão:** requisitos documentados (viram uma seção nova na especificacao-tecnica.md
ou um documento próprio), depois implementados e validados no Search Console.

**Decisões que dependem de vocês:** esta fase inteira está bloqueada até vocês decidirem se SEO
orgânico é prioridade de lançamento ou algo pós-lançamento (dado que Google Ads já cobre aquisição
paga desde o dia 1). Recomendo tratar como pós-lançamento (fase 8) se o prazo apertar — não é
bloqueante para gerar leads via Ads.

---

## Fase 6 — QA end-to-end dos dois fluxos

**Por quê antes do deploy:** os dois fluxos de conversão são o motivo de existir do site — precisam
ser testados como um todo, com dados reais, antes de ir ao ar.

**Escopo:**
1. **Fluxo de consultoria completo**: preencher com dados de teste realistas, incluindo o bloco
   repetível de "presenteados", conferir grid de campos, envio, gravação no Strapi, e-mail, `wa.me`.
2. **Fluxo de carrinho completo**: navegar por categoria/ocasião, adicionar produtos com quantidade
   mínima, upload de logo, editar/remover itens no carrinho, finalizar, conferir Strapi + e-mail.
3. Teste em mobile (o público B2B ainda assim frequentemente acessa por celular a partir de anúncios).
4. Teste de performance/Core Web Vitals nas páginas de Ocasião e Categoria (requisito de Quality Score
   já definido na especificação).
5. Teste de acessibilidade básica (contraste da paleta, navegação por teclado nos formulários).
6. Revisão de cross-browser mínima (Chrome, Safari, Edge).

**Critério de conclusão:** checklist de teste manual dos dois fluxos passando sem erros, em desktop e
mobile, com conteúdo real (depende das fases 2 e 3 estarem concluídas).

---

## Fase 7 — Deploy e lançamento

**Escopo:**
1. Deploy do Strapi em produção no Railway (com Postgres e variáveis `R2_*`/produção).
2. Deploy do frontend em produção na Vercel, com as variáveis de ambiente de produção
   (`STRAPI_API_TOKEN`, `RESEND_API_KEY`, IDs do GTM/GA4/Ads).
3. Corte de DNS definitivo na GoDaddy (`inprintpersonalizados.com.br` → Vercel,
   `cms.inprintpersonalizados.com.br` → Railway).
4. Verificação de domínio no Search Console e submissão do sitemap (se a fase 5 já estiver pronta;
   senão, fazer isso na fase 8).
5. Smoke test em produção: repetir os testes críticos da fase 6 direto no domínio real.

**Critério de conclusão:** site acessível publicamente em `inprintpersonalizados.com.br`, formulários
funcionando em produção, DNS estável (propagação completa).

---

## Fase 8 — Pós-lançamento

**Escopo:**
1. Treinamento da equipe do cliente no painel admin do Strapi (cadastro de produtos/categorias/ocasiões).
2. Rotina de backup do Postgres (Railway) e do bucket R2.
3. Monitoramento inicial de campanhas Google Ads (ajuste de Quality Score, custo por lead).
4. SEO orgânico, se adiado da fase 5.
5. Fechar os itens de "Gestão" ainda em aberto: **responsáveis por aprovação** de cada etapa futura
   (esse plano cobre marcos técnicos, mas não define quem aprova o quê no lado do cliente).

---

## Resumo das dependências entre fases

```
Fase 0 (git/GitHub) ──┬──> Fase 1 (contas/segredos) ──┬──> Fase 2 (integrações)  ──┐
                       │                                │                          │
                       │                                └──> Fase 4 (tracking)     ├──> Fase 6 (QA) ──> Fase 7 (deploy) ──> Fase 8
                       │                                                           │
                       └───────────────────────> Fase 3 (conteúdo/catálogo) ───────┘

Fase 5 (SEO) — paralela, pode ser adiada para depois da Fase 8 sem bloquear lançamento
```

O gargalo real não é técnico: as fases 0-2 e 4 são trabalho de desenvolvimento que pode avançar rápido
assim que as contas existirem. O gargalo é a **fase 3** (conteúdo institucional, fotos, depoimentos,
catálogo) porque depende do cliente entregar material — vale começar a cobrar isso em paralelo com as
fases 0-1, não depois.
