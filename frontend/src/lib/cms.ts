const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

// Strapi ainda não está com produtos/conteúdo real cadastrado — cada fetch* aqui
// retorna [] em caso de erro (CMS offline, endpoint vazio) para as páginas não
// quebrarem em build/dev antes do conteúdo existir. Ver especificacao-tecnica.md.

async function fetchFromStrapi<T>(path: string): Promise<T[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${path}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    return (json?.data ?? []).map((entry: { id: number; attributes?: object }) => ({
      id: entry.id,
      ...(entry.attributes ?? entry),
    }));
  } catch {
    return [];
  }
}

export function fetchProdutos() {
  return fetchFromStrapi<import("./types").Produto>("produtos?populate=*");
}

export function fetchCategorias() {
  return fetchFromStrapi<import("./types").Categoria>("categorias");
}

export function fetchOcasioes() {
  return fetchFromStrapi<import("./types").Ocasiao>("ocasioes");
}

export function fetchKits() {
  return fetchFromStrapi<import("./types").Kit>("kits?populate=*");
}

export function fetchPosts() {
  return fetchFromStrapi<import("./types").Post>("posts");
}

export async function fetchProdutoPorSlug(slug: string) {
  const produtos = await fetchProdutos();
  return produtos.find((p) => p.slug === slug) ?? null;
}

export async function fetchCategoriaPorSlug(slug: string) {
  const categorias = await fetchCategorias();
  return categorias.find((c) => c.slug === slug) ?? null;
}

export async function fetchOcasiaoPorSlug(slug: string) {
  const ocasioes = await fetchOcasioes();
  return ocasioes.find((o) => o.slug === slug) ?? null;
}

export async function fetchPostPorSlug(slug: string) {
  const posts = await fetchPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function fetchProdutosPorCategoria(categoriaSlug: string) {
  const produtos = await fetchProdutos();
  return produtos.filter((p) => p.categoria?.slug === categoriaSlug);
}

export { STRAPI_URL };
