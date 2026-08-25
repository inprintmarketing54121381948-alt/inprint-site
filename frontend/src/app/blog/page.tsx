import Link from "next/link";
import { fetchPosts } from "@/lib/cms";

export const metadata = { title: "Blog — In Print" };

export default async function BlogPage() {
  const posts = await fetchPosts();

  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-4 text-sm text-gray-500">Ainda sem posts publicados.</p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="rounded-lg border border-gray-200 p-4 hover:border-navy"
            >
              <p className="font-medium text-graphite">{p.titulo}</p>
              {p.resumo && <p className="mt-1 text-sm text-gray-600">{p.resumo}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
