import { notFound } from "next/navigation";
import { fetchCategoriaPorSlug, fetchProdutosPorCategoria } from "@/lib/cms";
import { ProductCard } from "@/components/ProductCard";

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [categoria, produtos] = await Promise.all([
    fetchCategoriaPorSlug(slug),
    fetchProdutosPorCategoria(slug),
  ]);

  if (!categoria) notFound();

  return (
    <div className="px-6 py-12 sm:px-8">
      <p className="text-xs text-gray-400">Categorias / {categoria.nome}</p>
      <h1 className="mt-1 text-2xl font-medium text-graphite">{categoria.nome}</h1>
      {categoria.descricao && <p className="mt-2 text-gray-600">{categoria.descricao}</p>}

      {produtos.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">Nenhum produto cadastrado nesta categoria ainda.</p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {produtos.map((p) => (
            <ProductCard key={p.id} produto={p} />
          ))}
        </div>
      )}
    </div>
  );
}
