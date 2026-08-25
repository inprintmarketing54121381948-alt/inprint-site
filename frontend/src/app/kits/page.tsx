import { fetchKits } from "@/lib/cms";
import { ProductCard } from "@/components/ProductCard";

export const metadata = { title: "Kits especiais — In Print" };

export default async function KitsPage() {
  const kits = await fetchKits();

  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Kits especiais</h1>
      {kits.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">Kits temáticos em preparação.</p>
      ) : (
        <div className="mt-8 space-y-12">
          {kits.map((kit) => (
            <section key={kit.slug} id={kit.slug}>
              <h2 className="text-lg font-medium text-graphite">{kit.nome}</h2>
              {kit.descricao && <p className="mt-1 text-gray-600">{kit.descricao}</p>}
              <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {kit.produtos?.map((p) => (
                  <ProductCard key={p.id} produto={p} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
