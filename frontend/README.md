# In Print — frontend

Site em Next.js (App Router, TypeScript, Tailwind CSS v4). Consome o Strapi (`../backend`) como
CMS headless. Contexto completo do projeto: [../CLAUDE.md](../CLAUDE.md),
[../especificacao-tecnica.md](../especificacao-tecnica.md).

## Rodando localmente

```bash
npm install
cp .env.example .env.local   # preencher com os valores reais (ver contas-e-acessos.md)
npm run dev
```

Abre em [http://localhost:3000](http://localhost:3000). Sem o Strapi rodando (`../backend`), as
páginas de catálogo mostram estado vazio ("em preparação") em vez de quebrar — ver `src/lib/cms.ts`.

## Estrutura

- `src/app/` — páginas (App Router), uma pasta por rota do sitemap (planejamento-inprint.md, seção 5).
- `src/app/api/consultoria`, `src/app/api/orcamento` — recebem os dois fluxos de conversão, gravam
  no Strapi e disparam a notificação por e-mail (Resend) com link `wa.me`.
- `src/context/CartContext.tsx` — estado do carrinho de orçamento (fluxo 2), persistido em
  `localStorage`.
- `src/lib/cms.ts` — cliente de leitura do Strapi.
- `src/lib/strapi-write.ts` — gravação no Strapi a partir das API routes (usa `STRAPI_API_TOKEN`,
  nunca exposto ao navegador).
- `src/lib/notificacoes.ts` — envio do e-mail de notificação via Resend.
- `src/lib/analytics.ts` — GTM, captura de UTM e eventos de conversão (`lead_consultoria_enviado`,
  `orcamento_finalizado`) — ver especificacao-tecnica.md, seção 3.
- `src/components/CookieConsent.tsx` — banner de consentimento LGPD; o GTM só carrega após aceite.

## Pendências conhecidas

- Upload de logomarca na página de produto (`src/app/produtos/[slug]/ProdutoDetalheClient.tsx`) só
  guarda o nome do arquivo no item do carrinho — o upload real para o Cloudflare R2 ainda precisa ser
  implementado na finalização do orçamento (ver comentário `TODO` no arquivo).
- Conteúdo institucional (rodapé, `/sobre`, `/politica-de-privacidade`) está com placeholders — ver
  planejamento-inprint.md, checklist "Conteúdo".
