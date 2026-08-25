# In Print — backend (Strapi CMS)

CMS headless (Strapi 5, TypeScript) usado pelo frontend Next.js (`../frontend`). Contexto completo:
[../CLAUDE.md](../CLAUDE.md), [../especificacao-tecnica.md](../especificacao-tecnica.md).

## Rodando localmente

```bash
npm install
cp .env.example .env   # gerar secrets novos, ver comentários no arquivo
npm run develop
```

Abre o painel admin em [http://localhost:1337/admin](http://localhost:1337/admin) — no primeiro
acesso, cria o usuário administrador.

## Content types

| Content type | Uso |
|---|---|
| `produto` | Catálogo — nome, código, quantidade mínima, cores, categoria, kits e ocasiões relacionados |
| `categoria` | Navegação por categoria |
| `ocasiao` | Landing page por ocasião (SIPAT, fim de ano...) — ver especificacao-tecnica.md, seção 3 |
| `kit` | Kit especial (produtos combinados) |
| `post` | Blog |
| `lead-consultoria` | Envios do formulário de consultoria (fluxo 1) |
| `orcamento` | Envios do carrinho de orçamento consolidado (fluxo 2) |

Os dois últimos são preenchidos pelo frontend via API token (não pelo painel admin) — ver
`frontend/src/app/api/consultoria` e `frontend/src/app/api/orcamento`.

## Passos manuais ainda pendentes no painel admin (não são código)

1. **Permissões do papel "Public"** (Settings → Users & Permissions → Roles → Public):
   - `produto`, `categoria`, `ocasiao`, `kit`, `post`: permitir apenas `find` e `findOne`.
   - `lead-consultoria`, `orcamento`: **não** habilitar nenhuma permissão pública de leitura — essas
     entradas só devem ser gravadas via API token (do backend do Next.js) e lidas pela equipe dentro
     do painel admin.
2. **Gerar o API Token** (Settings → API Tokens) com permissão de `create` em `lead-consultoria` e
   `orcamento` — o valor gerado vai para `STRAPI_API_TOKEN` no `.env` do frontend.
3. Cadastrar o primeiro conteúdo real (produtos, categorias, ocasiões) — hoje o catálogo está vazio,
   por isso o frontend mostra "em preparação" nessas páginas.

## Upload de logomarca (Cloudflare R2)

Configurado em `config/plugins.ts`, ativado automaticamente quando as variáveis `R2_*` estão
presentes no `.env` (ver `.env.example`). Sem elas, cai no provider padrão (disco local) — suficiente
para dev, mas **não usar em produção no Railway**, que não persiste arquivos locais entre deploys.

## Produção (Railway)

- `DATABASE_CLIENT=postgres` + `DATABASE_URL` (fornecida pelo Railway ao criar o serviço Postgres).
- Gerar `APP_KEYS`, `API_TOKEN_SALT`, `ADMIN_JWT_SECRET`, `JWT_SECRET`, `TRANSFER_TOKEN_SALT`,
  `ENCRYPTION_KEY` novos (nunca reaproveitar os do `.env` local).
- Configurar as variáveis `R2_*` (Cloudflare R2) para o upload persistir entre deploys.
