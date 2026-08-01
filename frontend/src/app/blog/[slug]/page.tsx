import { notFound } from "next/navigation";
import { fetchPostPorSlug } from "@/lib/cms";

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchPostPorSlug(slug);

  if (!post) notFound();

  return (
    <article className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">{post.titulo}</h1>
      {post.conteudo && (
        <div className="prose mt-6 max-w-2xl text-gray-700">{post.conteudo}</div>
      )}
    </article>
  );
}
