# Contas e informações necessárias — In Print

Checklist do que precisa existir/ser fornecido para executar a stack definida em
[especificacao-tecnica.md](especificacao-tecnica.md). Nada aqui foi criado ainda — é levantamento
para viabilizar o scaffolding e o deploy.

**Segurança:** senhas, API keys e tokens não devem ser colados em conversa de chat. Quando chegar a
hora de configurar cada serviço, usamos variáveis de ambiente/secrets do próprio provedor (Vercel
Environment Variables, Railway Variables etc.) — nunca commitados no repositório.

## 1. Contas de infraestrutura (a criar, uma por serviço)

| Serviço | Para quê | Quem cria | Custo |
|---|---|---|---|
| GitHub | Hospedar o código (Next.js e Strapi), conectado ao deploy automático da Vercel e do Railway | Você (ou eu te guio na criação) | Grátis |
| Vercel | Hospedagem do site (frontend Next.js) | Você, via login com GitHub | Grátis (free tier) |
| Railway | Hospedagem do Strapi + banco Postgres | Você, via login com GitHub — **precisa de cartão de crédito cadastrado** | ~R$25-35/mês |
| Cloudflare | Armazenamento dos uploads de logomarca (R2) | Você — Cloudflare também costuma pedir cartão mesmo pro free tier do R2, mas não cobra dentro do limite grátis | Grátis até ~10GB |
| Resend | Envio dos e-mails de notificação (lead de consultoria / orçamento) | Você | Grátis (~3.000 e-mails/mês) |

Em todos esses, meu papel é te guiar passo a passo na hora de criar/configurar — eu não crio contas
em serviços de terceiros por você.

## 2. O que eu preciso que você me informe (dados, não credenciais)

- [x] **Domínio (GoDaddy):** `inprintpersonalizados.com.br`
- [x] **WhatsApp Business da equipe:** `19988104989` → formato internacional para o link `wa.me`:
  `5519988104989`
- [x] **E-mail da equipe para notificações de lead/orçamento:** `vendas@inprintpersonalizados.com.br`
  (assumindo que essa caixa já existe e é monitorada)
- [x] **E-mail remetente do Resend:** `contato@inprintpersonalizados.com.br` — decidido (2026-07-29),
  **sem Google Workspace** (custo descartado). Solução com dois lados:
  - **Envio** (Resend disparando notificações "de" `contato@inprintpersonalizados.com.br`): só
    precisa da verificação de domínio via DNS (TXT/CNAME) — não depende de caixa de entrada.
  - **Recebimento** (alguém responder e a mensagem chegar em algum lugar): **encaminhamento de e-mail
    grátis da GoDaddy**, `contato@inprintpersonalizados.com.br` → encaminha para a conta Gmail nova
    (ver seção 6). O endereço continua parecendo profissional no site/rodapé, sem custo de hospedagem
    de e-mail.
  - Conta Gmail de destino: `inprint.marketing54121381948@gmail.com` (ver seção 4/6).

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
- Essa mesma conta Gmail acumula três papéis: destino do encaminhamento de
  `contato@inprintpersonalizados.com.br`, dona da conta Google Ads nova e dona do GA4. Um único login
  simplifica a gestão, mas significa que quem tiver acesso a esse Gmail controla e-mail + Ads + GA4 —
  recomendo ativar verificação em duas etapas (2FA) nela.
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

- [x] **Provedor de e-mail para `contato@inprintpersonalizados.com.br`** — decidido: **sem
  Workspace**, usar encaminhamento gratuito da GoDaddy para a conta Gmail nova (ver acima). Custo
  R$ 0,00/mês.

## 7. Status

Domínio, WhatsApp, e-mail de notificação (`vendas@`), solução de `contato@` (encaminhamento GoDaddy →
Gmail) e a conta Google Ads/GA4 (`inprint.marketing54121381948@gmail.com`, nova, no CNPJ correto) já
estão confirmados. Falta apenas: configurar de fato o encaminhamento de e-mail na GoDaddy (quando
chegar a etapa de deploy) e criar a conta Google Ads dentro desse Gmail. Nenhuma conta de
infraestrutura (GitHub/Vercel/Railway/Cloudflare/Resend) foi criada ainda — seguimos só documentando,
scaffolding aguardando autorização.
