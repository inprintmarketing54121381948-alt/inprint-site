---
name: inprint-design-system
description: Use whenever writing or reviewing code, copy, or UI for the In Print site — any page, component, form, or content generation. Encodes the client-approved brand tokens (colors, fonts, logo rules) and the two non-negotiable conversion flows (consultoria form + orçamento cart) so output stays consistent regardless of which tech stack is eventually chosen. Read planejamento-inprint.md for full context; this skill is the quick-reference contract.
---

# In Print — sistema de design e regras de negócio

Referência rápida para qualquer trabalho de código, layout ou conteúdo no site da In Print
(impressos e brindes corporativos). Estas decisões já foram aprovadas pelo cliente — trate como
requisitos fixos, não como sugestões a revisar. Fonte completa: `planejamento-inprint.md` na raiz
do projeto.

## Paleta de cores

| Token | Hex | Uso |
|---|---|---|
| Grafite | `#1F2937` | Texto principal |
| Azul petróleo | `#0F4C5C` | Cor primária corporativa — botões, CTAs, header/logo-icon |
| Coral suavizado | `#D9776B` | Accent herdado do logo original — badges, destaques pontuais |
| Verde-azulado | `#4F9D96` | Accent secundário — fundo do favicon, usos alternativos ao coral |
| Areia/bege | `#E8DFD3` | Neutro quente — fundos de seção alternados |

Não introduzir cores fora dessa paleta sem aprovação explícita do cliente.

## Tipografia

- **Dancing Script** — exclusiva do wordmark "In Print" no logotipo e do monograma "IP" (maiúsculo)
  do favicon. **Nunca** usar em corpo de texto, títulos de página ou UI.
- **Poppins** — todo o resto: títulos, parágrafos, botões, formulários, navegação.

## Logo

- Composição vertical: wordmark "In Print" (script) acima → seta simples ao centro (símbolo de
  conexão fornecedor–cliente, **sem** alvo/círculos concêntricos) → subtítulo "Impressos & Brindes
  Personalizados" (Poppins) abaixo.
- Favicon: monograma "IP" maiúsculo em Dancing Script, fundo `#4F9D96`.
- Versão em fundo escuro ainda não existe — pendência conhecida, não inventar uma.

## Tom de voz

Formal/corporativo e jovem. Copy para um comprador B2B (RH, marketing, eventos), não para
consumidor final. Evitar tom institucional genérico de SEO (ver crítica a concorrentes no
planejamento, seção 2) e evitar informalidade excessiva.

## Os dois fluxos de conversão (não simplificar para um único CTA)

O site **sempre** oferece dois caminhos paralelos — nunca substituir por um botão genérico de
"Solicitar orçamento":

### 1. Consultoria (`Pedir consultoria`)
Para quem não sabe exatamente o que quer. Formulário qualificado com blocos: dados de contato,
sobre a empresa (site, redes sociais), sobre o evento (tipo, data, local), sobre os presenteados
(perfil + quantidade, repetível), personalização (logomarca em monocromia: sim/não/não sei),
orçamento já definido (sim/não + valor opcional), observações livres. Estes campos são uma primeira
versão sujeita a refinamento — não tratar como definitivos ao ponto de resistir a mudança futura.

### 2. Carrinho de orçamento (`Adicionar ao orçamento`)
Para quem já sabe o que quer. Regras:
- Botão "Adicionar ao orçamento" em todo card de produto (home, listagem de categoria, produto).
- Ícone de carrinho no header com contador de itens.
- Página de carrinho: imagem, nome, código, quantidade editável, opção de remover por item.
- Finalização: dados de contato + local de entrega + observações → um único pedido consolidado
  (não é checkout de e-commerce — não há preço/pagamento no fluxo, é geração de orçamento).

### Página de produto individual
Por causa do fluxo de carrinho, toda página de produto precisa de:
- **Quantidade mínima** em destaque (brindes corporativos têm pedido mínimo).
- **Upload de logomarca** direto na página (antecipa a personalização no momento do orçamento).

## Sitemap de referência

Home · Categorias (subcategoria/material/cor) · Ocasiões (SIPAT, boas-vindas, feiras, fim de ano,
aniversário de empresa...) · Kits especiais · Carrinho de orçamento · Consultoria · Como funciona ·
Sobre a Inprint · Blog · Contato.

## O que NÃO fazer

- Não decidir/assumir stack técnica — está pendente de conversa com o usuário.
- Não inventar números de prova social, depoimentos ou fotos de produto reais — são placeholders
  até o cliente fornecer conteúdo (ver checklist, seção 7 "Conteúdo").
- Não remover ou fundir os dois fluxos de conversão em um só.
- Não adicionar preço/pagamento ao carrinho — é orçamento, não e-commerce transacional.
