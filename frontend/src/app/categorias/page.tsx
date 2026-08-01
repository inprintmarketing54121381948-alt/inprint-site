import Link from "next/link";
import { fetchCategorias } from "@/lib/cms";

export const metadata = { title: "Categorias — In Print" };

export default async function CategoriasPage() {
  const categorias = await fetchCategorias();

  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Categorias</h1>
      {categorias.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">Catálogo em preparação — em breve por aqui.</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {categorias.map((c) => (
            <Link
              key={c.slug}
              href={`/categorias/${c.slug}`}
              className="rounded-lg border border-gray-200 p-6 text-center hover:border-navy"
            >
              {c.nome}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
