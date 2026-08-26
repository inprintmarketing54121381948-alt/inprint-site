# Contas e informações necessárias — In Print

Checklist do que precisa existir/ser fornecido para executar a stack definida em
[especificacao-tecnica.md](especificacao-tecnica.md). Nada aqui foi criado ainda — é levantamento
para viabilizar o scaffolding e o deploy.

**Segurança:** senhas, API keys e tokens não devem ser colados em conversa de chat. Quando chegar a
hora de configurar cada serviço, usamos variáveis de ambiente/secrets do próprio provedor (Vercel
Environment Variables, Railway Variables etc.) — nunca commitados no repositório.

## 1. Contas de infraestrutura (a criar, uma por serviço)

| Serviço | Para quê | Quem cria | Custo | Status |
|---|---|---|---|---|
| GitHub | Hospedar o código (Next.js e Strapi), conectado ao deploy automático da Vercel e do Railway | Você (ou eu te guio na criação) | Grátis | [x] Criada — usuário `inprintmarketing54121381948-alt`, repo `inprint-site` (privado), código já com push feito |
| Vercel | Hospedagem do site (frontend Next.js) | Você, via login com GitHub | Grátis (free tier) | [x] Criada e deploy funcionando — `inprint-site-zeta.vercel.app` |
| Railway | Hospedagem do Strapi + banco Postgres | Você, via login com GitHub — **precisa de cartão de crédito cadastrado** | ~R$25-35/mês | [ ] Adiada de propósito para perto do lançamento (único custo recorrente) |
| Cloudflare | Armazenamento dos uploads de logomarca (R2) | Você — Cloudflare também costuma pedir cartão mesmo pro free tier do R2, mas não cobra dentro do limite grátis | Grátis até ~10GB | [x] Conta criada. **R2 confirmado: pede cartão para habilitar, mesmo no free tier** — adiado de propósito (sem cartão disponível no momento), backend segue no fallback de disco local até então |
| Resend | Envio dos e-mails de notificação (lead de consultoria / orçamento) | Você | Grátis (~3.000 e-mails/mês) | [x] Completo — domínio verificado, API key configurada, testado de ponta a ponta (POST em `/api/consultoria` → e-mail entregue em `vendas@`, confirmado no painel do Resend em 2026-08-26) |

Em todos esses, meu papel é te guiar passo a passo na hora de criar/configurar — eu não crio contas
em serviços de terceiros por você.

## 2. O que eu preciso que você me informe (dados, não credenciais)

- [x] **Domínio (GoDaddy):** `inprintpersonalizados.com.br`
- [x] **WhatsApp Business da equipe:** `19988104989` → formato internacional para o link `wa.me`:
  `5519988104989`
- [x] **E-mail da equipe para notificações de lead/orçamento:** `vendas@inprintpersonalizados.com.br`
  — **confirmado em 2026-08-26**: caixa real, ativa e monitorada, hospedada em **Microsoft 365** (não
  Google Workspace — descoberta feita ao exportar a zona DNS da GoDaddy pra configurar o Resend, ver
  abaixo).
- [x] **E-mail remetente do Resend:** `contato@inprintpersonalizados.com.br` — domínio verificado via
  DNS (TXT/CNAME/MX no subdomínio `send`) em 2026-08-26, envio via Resend funcionando independente de
  caixa de entrada.
  - **Recebimento — decisão revista duas vezes:** ao configurar o Resend (2026-08-26), a exportação da
    zona DNS revelou que o domínio já tem **Microsoft 365 ativo** (MX raiz apontando pra
    `*.mail.protection.outlook.com`, registros de autodiscover/Lync, e a caixa `vendas@` já funcionando
    ali). Isso levou a uma primeira revisão do plano — criar `contato@` como caixa real no M365 — mas
    depois o próprio cliente confirmou que **cada caixa nova no M365 custa ~R$30/mês**, o que não é
    custo zero como presumido. Como o orçamento aprovado só cobre o Railway (~R$25-35/mês, ver
    CLAUDE.md), **voltamos ao plano original**: `contato@inprintpersonalizados.com.br` continua sendo
    **encaminhamento gratuito da GoDaddy** para a conta Gmail `inprint.marketing54121381948@gmail.com`
    — sem custo adicional. *Pendente:* configurar de fato esse encaminhamento no painel da GoDaddy.
  - A conta Gmail `inprint.marketing54121381948@gmail.com` volta a ser o destino do encaminhamento de
    `contato@`, além dos papéis de Google Ads/GA4 (ver seção 4).

## 3. Acesso que você precisa me dar (quando chegarmos na etapa de deploy)

- **Acesso ao painel de DNS da GoDaddy** (login da conta, ou você mesmo cola os registros que eu
  indicar — prefiro essa segunda opção por segurança).
- **Convite como colaborador** nos repositórios GitHub do projeto, depois que forem criados.
- Não preciso (nem deve me passar) senha de conta Google, cartão de crédito ou senha de e-mail em
  texto — essas ações você faz diretamente nos respectivos painéis.

## 4. Contas de marketing/tracking (Google) — para os requisitos de Ads da seção 3 da especificação técnica

- [x] **Conta Google Ads:** `inprint.mkt@gmail.com` existe mas não está no CNPJ do cliente — decidido
  criar conta nova do zero já no CNPJ correto (ver seção 6). A conta antiga não será usada.
  - Conta Gmail criada: **`inprint.marketing54121381948@gmail.com`** — vai ser a dona da conta Google
    Ads nova.
- [x] **Conta Google Analytics (GA4)** — mesma conta `inprint.marketing54121381948@gmail.com` (facilita
  o link GA4↔Ads).
- Essa mesma conta Gmail acumula três papéis: destino do encaminhamento de `contato@`, dona da conta
  Google Ads nova e dona do GA4 (ver seção 2 para o histórico dessa decisão, revista duas vezes).
  Recomendo ativar verificação em duas etapas (2FA) nela, já que controla e-mail + Ads + GA4.
- **Google Tag Manager** — container novo, criado junto com o projeto (não depende de nada prévio).
- **Google Search Console** — recomendado abrir também (verificação de propriedade do domínio via DNS
  TXT na GoDaddy), útil tanto para SEO orgânico quanto para diagnosticar indexação.
- **Google Business Profile** (opcional, fora do escopo técnico do site, mas vale considerar) — ajuda
  SEO local para um negócio B2B com endereço físico; não é pré-requisito para o site funcionar.

## 5. Informações institucionais para o conteúdo (já apontadas como pendência no planejamento, seção 7)

Relevantes aqui porque alimentam rodapé, política de privacidade/LGPD e dados estruturados (schema.org)
do site, não só "conteúdo":

- Razão social e CNPJ (rodapé, política de privacidade)
- Endereço físico (se houver, para rodapé/schema.org LocalBusiness)
- Telefone comercial (além do WhatsApp)
- Links das redes sociais (Instagram, Facebook — já citados na seção 4.1 do planejamento como campo
  do formulário de consultoria, mas aqui é a versão "da própria Inprint", pro rodapé/schema.org)

## 6. Decisões pendentes

- [x] **Conta Google Ads sem CNPJ correto** — decidido (2026-07-29): vamos **criar uma conta nova do
  zero**, já no CNPJ correto da Inprint, em vez de tentar transferir `inprint.mkt@gmail.com`. Perde
  eventual histórico de campanhas da conta antiga, mas evita depender de acesso de terceiro. A conta
  antiga pode ser ignorada/descontinuada — não é usada no projeto.
  - E-mail definido: `inprint.marketing54121381948@gmail.com`.

- [x] **Provedor de e-mail para `contato@inprintpersonalizados.com.br`** — decisão original
  (2026-07-29: encaminhamento gratuito da GoDaddy para Gmail, para evitar custo de Workspace) foi
  brevemente revista em 2026-08-26 pra virar caixa real no M365 (ao descobrir que o domínio já tinha
  M365 ativo), mas **voltou ao plano original no mesmo dia** ao confirmar que cada caixa nova no M365
  custa ~R$30/mês — custo não aprovado, fora do orçamento (só o Railway está aprovado como custo
  recorrente). Decisão final: encaminhamento gratuito GoDaddy → Gmail, R$ 0,00/mês. Pendente:
  configurar o encaminhamento de fato no painel da GoDaddy.

## 7. Status

Domínio, WhatsApp, e-mail de notificação (`vendas@`, confirmado ativo em M365), domínio verificado e
testado de ponta a ponta no Resend para envio, e a conta Google Ads/GA4
(`inprint.marketing54121381948@gmail.com`, nova, no CNPJ correto) já estão confirmados. GitHub, Vercel,
Cloudflare (conta, sem R2 habilitado) e Resend já criados e funcionando. Falta: configurar de fato o
encaminhamento `contato@` → Gmail no painel da GoDaddy, criar a conta Google Ads dentro do Gmail de
marketing, habilitar o R2 (adiado por falta de cartão) e criar a conta Railway (adiada de propósito
para perto do lançamento).
