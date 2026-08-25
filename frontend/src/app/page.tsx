import Link from "next/link";
import { fetchCategorias, fetchKits, fetchOcasioes, fetchPosts } from "@/lib/cms";

const DIFERENCIAIS = [
  { titulo: "Cumprimento de prazo", descricao: "Seu evento tem data marcada — a gente entrega." },
  {
    titulo: "Projetos realmente personalizados",
    descricao: "Soluções sob medida, fora do padrão de mercado.",
  },
  { titulo: "De olho na qualidade", descricao: "Cada peça passa por controle antes de sair." },
  { titulo: "Flexibilidade no pagamento", descricao: "Condições que cabem no orçamento do seu evento." },
];

export default async function HomePage() {
  const [categorias, ocasioes, kits, posts] = await Promise.all([
    fetchCategorias(),
    fetchOcasioes(),
    fetchKits(),
    fetchPosts(),
  ]);

  return (
    <div>
      <section className="grid gap-10 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <h1 className="text-3xl font-medium leading-tight text-graphite sm:text-4xl">
            Brindes e impressos personalizados para o seu evento corporativo
          </h1>
          <p className="mt-4 max-w-md text-gray-600">
            Da ideia à entrega: projetos sob medida para SIPAT, fim de ano, feiras e
            ações de relacionamento — com prazo garantido.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/consultoria"
              className="rounded-md bg-navy px-5 py-3 text-sm font-medium text-white hover:bg-[#0c3d4a]"
            >
              Pedir consultoria
            </Link>
            <Link
              href="/categorias"
              className="rounded-md border border-gray-300 px-5 py-3 text-sm font-medium text-graphite hover:bg-gray-50"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
        <div className="h-64 rounded-xl bg-sand sm:h-80" aria-hidden />
      </section>

      <section className="grid gap-6 border-t border-black/5 px-6 py-14 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
        {DIFERENCIAIS.map((item) => (
          <div key={item.titulo}>
            <p className="font-medium text-navy">{item.titulo}</p>
            <p className="mt-1 text-sm text-gray-600">{item.descricao}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-black/5 px-6 py-14 sm:px-8">
        <h2 className="text-xl font-medium text-graphite">Navegue por categoria</h2>
        {categorias.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Catálogo em preparação — em breve por aqui.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categorias.map((c) => (
              <Link
                key={c.slug}
                href={`/categorias/${c.slug}`}
                className="rounded-lg border border-gray-200 px-4 py-6 text-center text-sm hover:border-navy"
              >
                {c.nome}
              </Link>
            ))}
          </div>
        )}

        <h2 className="mt-12 text-xl font-medium text-graphite">Navegue por ocasião</h2>
        {ocasioes.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">
            Páginas de ocasião (SIPAT, fim de ano, feiras...) em preparação.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ocasioes.map((o) => (
              <Link
                key={o.slug}
                href={`/ocasioes/${o.slug}`}
                className="rounded-lg border border-gray-200 px-4 py-6 text-center text-sm hover:border-navy"
              >
                {o.nome}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-black/5 px-6 py-14 sm:px-8">
        <h2 className="text-xl font-medium text-graphite">Kits especiais</h2>
        {kits.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Kits temáticos em preparação.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {kits.map((k) => (
              <Link
                key={k.slug}
                href={`/kits#${k.slug}`}
                className="rounded-lg border border-gray-200 p-4 hover:border-navy"
              >
                {k.nome}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-black/5 px-6 py-14 sm:px-8">
        <h2 className="text-xl font-medium text-graphite">Do blog</h2>
        {posts.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">Ainda sem posts publicados.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="rounded-lg border border-gray-200 p-4 hover:border-navy"
              >
                {p.titulo}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
