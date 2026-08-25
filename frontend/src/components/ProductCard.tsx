"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { Produto } from "@/lib/types";

export function ProductCard({ produto }: { produto: Produto }) {
  const { adicionarItem } = useCart();

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <Link href={`/produtos/${produto.slug}`}>
        <div className="h-32 rounded-md bg-sand" aria-hidden />
        <p className="mt-3 font-medium text-graphite">{produto.nome}</p>
        <p className="text-xs text-gray-500">Cód. {produto.codigo}</p>
      </Link>
      <p className="mt-1 text-xs text-gray-500">
        Qtd. mínima: {produto.quantidadeMinima}
      </p>
      <button
        onClick={() =>
          adicionarItem(
            {
              produtoId: produto.id,
              nome: produto.nome,
              codigo: produto.codigo,
              imagemUrl: produto.imagemUrl,
            },
            produto.quantidadeMinima
          )
        }
        className="mt-3 w-full rounded-md bg-navy py-2 text-sm font-medium text-white hover:bg-[#0c3d4a]"
      >
        Adicionar ao orçamento
      </button>
    </div>
  );
}
