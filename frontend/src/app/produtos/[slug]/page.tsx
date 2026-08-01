import { notFound } from "next/navigation";
import { fetchProdutoPorSlug } from "@/lib/cms";
import { ProdutoDetalheClient } from "./ProdutoDetalheClient";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produto = await fetchProdutoPorSlug(slug);

  if (!produto) notFound();

  return (
    <div className="px-6 py-12 sm:px-8">
      <ProdutoDetalheClient produto={produto} />
    </div>
  );
}
