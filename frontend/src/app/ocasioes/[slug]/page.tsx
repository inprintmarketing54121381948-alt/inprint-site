import { notFound } from "next/navigation";
import Link from "next/link";
import { fetchOcasiaoPorSlug, fetchOcasioes } from "@/lib/cms";

// Página estática por ocasião — pensada para receber tráfego de campanhas do
// Google Ads com message match direto (ver especificacao-tecnica.md, seção 3).
export const revalidate = 3600;

export async function generateStaticParams() {
  const ocasioes = await fetchOcasioes();
  return ocasioes.map((o) => ({ slug: o.slug }));
}

export default async function OcasiaoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ocasiao = await fetchOcasiaoPorSlug(slug);

  if (!ocasiao) notFound();

  return (
    <div className="px-6 py-14 sm:px-8">
      <p className="text-xs text-gray-400">Ocasiões / {ocasiao.nome}</p>
      <h1 className="mt-1 text-3xl font-medium text-graphite">
        Brindes personalizados para {ocasiao.nome}
      </h1>
      {ocasiao.descricao && <p className="mt-3 max-w-2xl text-gray-600">{ocasiao.descricao}</p>}

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/consultoria"
          className="rounded-md bg-navy px-5 py-3 text-sm font-medium text-white hover:bg-[#0c3d4a]"
        >
          Pedir consultoria para {ocasiao.nome}
        </Link>
        <Link
          href="/categorias"
          className="rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-graphite hover:bg-gray-50"
        >
          Ver produtos sugeridos
        </Link>
      </div>
    </div>
  );
}
