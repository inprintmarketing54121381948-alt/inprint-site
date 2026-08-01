# Planejamento do site — In Print (Impressos e Brindes Personalizados)

## 1. Briefing

- **Objetivo do site:** geração de leads e orçamento
- **Público-alvo:** eventos e brindes corporativos
- **Diferenciais da Inprint:**
  - Cumprimento de prazo
  - Projetos realmente personalizados e soluções fora do mercado
  - De olho na qualidade
  - Flexibilidade no pagamento
- **Tom de voz:** formal/corporativo e jovem

## 2. Concorrentes analisados

| Site | Pontos fortes | Observações |
|---|---|---|
| Magazine Brindes | Catálogo extenso, prova social forte, captura de e-mail | Visual genérico |
| Servgela | Megamenu amplo, CTA "orçar produto" em cada item | Textão institucional de SEO |
| Imprimus (Campinas) | "Atendemos apenas empresas", WhatsApp direto, blog ativo | Navegação só por categoria |
| **Só Marcas** (referência escolhida) | Navegação dupla por categoria e ocasião, kits temáticos, simulador de layout, prova social com números e depoimentos | Referência principal de UX |

## 3. Identidade visual

**Direção:** evoluir o logo original (mantendo tipografia script e a seta como símbolo de conexão fornecedor-cliente), removendo os elementos boho/aquarela para adequar ao público corporativo B2B.

**Composição final do logo:**
- "In Print" (wordmark script) acima
- Seta simplificada, sem alvo, ao centro
- "Impressos & Brindes Personalizados" abaixo

**Paleta:**
| Cor | Hex | Uso |
|---|---|---|
| Grafite | `#1F2937` | Texto principal |
| Azul petróleo | `#0F4C5C` | Primário corporativo |
| Coral suavizado | `#D9776B` | Accent herdado do logo original |
| Verde-azulado | `#4F9D96` | Accent secundário (fundo do favicon) |
| Areia/bege | `#E8DFD3` | Neutro quente |

**Tipografia:**
- Dancing Script — wordmark do logotipo (uso exclusivo, não usar em textos correntes)
- Poppins — títulos, textos e UI do site inteiro

**Favicon:** monograma "IP" maiúsculo, na fonte do logotipo (Dancing Script), fundo `#4F9D96`.

## 4. Arquitetura da informação (sitemap)

- Home
- Categorias (com navegação por subcategoria, material, cor)
- Ocasiões (Boas-vindas, SIPAT, Feiras, Aniversário de empresa, Fim de ano, etc.)
- Kits especiais
- **Carrinho de orçamento** — cliente adiciona produtos específicos navegando pelo catálogo, ajusta quantidades e finaliza um orçamento consolidado com dados de contato
- **Consultoria** — formulário qualificado para quem prefere sugestões personalizadas, com blocos:
  - Dados de contato (nome, empresa, e-mail, telefone)
  - Sobre a empresa (site, redes sociais)
  - Sobre o evento (ação, data, local de entrega)
  - Sobre os presenteados (quem são, quantidade por tipo)
  - Personalização (logo permite monocromia?)
  - Orçamento (existe budget definido?)
- Como funciona
- Sobre a Inprint
- Blog
- Contato

## 5. Páginas wireframadas

1. Home (hero, diferenciais, navegação dupla, kits especiais, prova social, blog)
2. Header com ícone de carrinho de orçamento
3. Formulário de consultoria
4. Carrinho de orçamento (lista de itens, quantidade, finalização)
5. Listagem de categoria (filtros + grid de produtos)
6. Produto individual (galeria, cor, quantidade mínima, upload de logo)

Um **protótipo navegável em HTML** (`inprint-prototipo.html`) conecta todas essas telas com a identidade visual aplicada.

## 6. Checklist geral do planejamento

**Descoberta**
- [x] Reunião de briefing realizada
- [x] Objetivos do site definidos
- [x] Público-alvo definido
- [x] Concorrentes mapeados e analisados
- [x] Diferenciais da empresa listados

**Identidade visual**
- [x] Imagem de referência recebida
- [x] Direção de evolução definida
- [x] Paleta aprovada
- [x] Favicon definido
- [ ] Versão do logo em fundo escuro

**Estrutura**
- [x] Sitemap definido
- [x] Fluxo de navegação (categoria + ocasião)
- [x] Fluxo de conversão (consultoria + carrinho de orçamento)

**Conteúdo**
- [ ] Textos institucionais
- [ ] Fotos de produtos reais
- [ ] Depoimentos/cases
- [ ] Políticas (trocas, LGPD)
- [ ] Números reais de prova social (clientes atendidos, anos de mercado)

**Wireframes e protótipo**
- [x] Home
- [x] Header com carrinho
- [x] Formulário de consultoria
- [x] Carrinho de orçamento
- [x] Listagem de categoria
- [x] Produto individual
- [x] Protótipo navegável

**Técnico**
- [ ] Plataforma definida
- [ ] Integração de upload de logomarca
- [ ] Notificações do formulário de consultoria
- [ ] Requisitos de SEO

**Gestão**
- [ ] Cronograma com marcos definido
- [ ] Responsáveis por aprovação definidos

## 7. Próximos passos sugeridos

1. Roteiro de perguntas para o briefing de conteúdo (textos, números reais, fotos)
2. Especificação técnica (plataforma, integrações, upload de logo)
3. Cronograma e aprovação final antes do desenvolvimento
