"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Produto } from "@/lib/types";

// TODO: o arquivo de logo só é guardado como referência de nome no item do
// carrinho (localStorage não serializa File). Upload real para o Cloudflare R2
// precisa ser implementado como parte da finalização do orçamento (/carrinho),
// não neste componente — ver especificacao-tecnica.md, seção 1.
export function ProdutoDetalheClient({ produto }: { produto: Produto }) {
  const { adicionarItem } = useCart();
  const [quantidade, setQuantidade] = useState(produto.quantidadeMinima);
  const [corSelecionada, setCorSelecionada] = useState(produto.cores?.[0] ?? "");
  const [arquivoLogo, setArquivoLogo] = useState<File | null>(null);
  const [adicionado, setAdicionado] = useState(false);

  function handleAdicionar() {
    const observacoes = [
      corSelecionada && `Cor: ${corSelecionada}`,
      arquivoLogo && `Logomarca enviada: ${arquivoLogo.name}`,
    ]
      .filter(Boolean)
      .join(" · ");

    adicionarItem(
      {
        produtoId: produto.id,
        nome: produto.nome,
        codigo: produto.codigo,
        imagemUrl: produto.imagemUrl,
        observacaoPersonalizacao: observacoes || undefined,
      },
      quantidade
    );
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2500);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="h-72 rounded-xl bg-sand lg:h-full" aria-hidden />

      <div>
        <h1 className="text-2xl font-medium text-graphite">{produto.nome}</h1>
        <p className="text-sm text-gray-500">Cód. {produto.codigo}</p>
        {produto.descricao && <p className="mt-4 text-gray-600">{produto.descricao}</p>}

        <p className="mt-4 inline-block rounded-md bg-coral/15 px-3 py-1 text-sm font-medium text-coral">
          Quantidade mínima: {produto.quantidadeMinima} unidades
        </p>

        {produto.cores && produto.cores.length > 0 && (
          <div className="mt-6">
            <label className="text-sm font-medium text-graphite">Cor</label>
            <div className="mt-2 flex gap-2">
              {produto.cores.map((cor) => (
                <button
                  key={cor}
                  onClick={() => setCorSelecionada(cor)}
                  className={`rounded-md border px-3 py-1.5 text-sm ${
                    corSelecionada === cor
                      ? "border-navy bg-navy/5 text-navy"
                      : "border-gray-300 text-graphite"
                  }`}
                >
                  {cor}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6">
          <label htmlFor="logo" className="text-sm font-medium text-graphite">
            Enviar logomarca (opcional, antecipa a personalização do orçamento)
          </label>
          <input
            id="logo"
            type="file"
            accept="image/*,.pdf,.ai,.eps"
            onChange={(e) => setArquivoLogo(e.target.files?.[0] ?? null)}
            className="mt-2 block text-sm text-gray-600"
          />
        </div>

        <div className="mt-6 flex items-end gap-4">
          <div>
            <label htmlFor="quantidade" className="text-sm font-medium text-graphite">
              Quantidade
            </label>
            <input
              id="quantidade"
              type="number"
              min={produto.quantidadeMinima}
              value={quantidade}
              onChange={(e) =>
                setQuantidade(Math.max(produto.quantidadeMinima, Number(e.target.value)))
              }
              className="mt-2 w-28 rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={handleAdicionar}
            className="rounded-md bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0c3d4a]"
          >
            Adicionar ao orçamento
          </button>
        </div>
        {adicionado && (
          <p className="mt-3 text-sm text-teal">Adicionado ao seu orçamento.</p>
        )}
      </div>
    </div>
  );
}
