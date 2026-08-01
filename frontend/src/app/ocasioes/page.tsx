import Link from "next/link";
import { fetchOcasioes } from "@/lib/cms";

export const metadata = { title: "Ocasiões — In Print" };

export default async function OcasioesPage() {
  const ocasioes = await fetchOcasioes();

  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Ocasiões</h1>
      <p className="mt-2 text-gray-600">
        Brindes certos para cada momento da sua empresa.
      </p>
      {ocasioes.length === 0 ? (
        <p className="mt-6 text-sm text-gray-500">
          Páginas de ocasião (SIPAT, fim de ano, feiras, boas-vindas...) em preparação.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {ocasioes.map((o) => (
            <Link
              key={o.slug}
              href={`/ocasioes/${o.slug}`}
              className="rounded-lg border border-gray-200 p-6 text-center hover:border-navy"
            >
              {o.nome}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
