export interface Produto {
  id: number;
  slug: string;
  nome: string;
  codigo: string;
  descricao?: string;
  quantidadeMinima: number;
  cores?: string[];
  material?: string;
  imagemUrl?: string;
  categoria?: { slug: string; nome: string };
}

export interface Categoria {
  id: number;
  slug: string;
  nome: string;
  descricao?: string;
}

export interface Ocasiao {
  id: number;
  slug: string;
  nome: string;
  descricao?: string;
  imagemUrl?: string;
}

export interface Kit {
  id: number;
  slug: string;
  nome: string;
  descricao?: string;
  produtos?: Produto[];
}

export interface Post {
  id: number;
  slug: string;
  titulo: string;
  resumo?: string;
  conteudo?: string;
  imagemCapaUrl?: string;
  publicadoEm?: string;
}

export interface ItemOrcamento {
  produtoId: number;
  nome: string;
  codigo: string;
  imagemUrl?: string;
  quantidade: number;
  observacaoPersonalizacao?: string;
}

export interface CampanhaUTM {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}
