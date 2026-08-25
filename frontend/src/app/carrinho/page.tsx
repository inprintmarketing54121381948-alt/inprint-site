"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { eventoOrcamentoFinalizado, obterUTM } from "@/lib/analytics";

export default function CarrinhoPage() {
  const { itens, atualizarQuantidade, removerItem, limparCarrinho } = useCart();
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [dados, setDados] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    localEntrega: "",
    observacoes: "",
  });

  async function handleFinalizar(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...dados, itens, utm: obterUTM() }),
      });
      if (!res.ok) throw new Error("Falha ao enviar orçamento");
      eventoOrcamentoFinalizado(itens.reduce((s, i) => s + i.quantidade, 0));
      limparCarrinho();
      setEnviado(true);
    } catch {
      setErro("Não foi possível enviar seu orçamento agora. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="px-6 py-16 text-center sm:px-8">
        <h1 className="text-2xl font-medium text-graphite">Orçamento enviado!</h1>
        <p className="mt-2 text-gray-600">
          Recebemos seu pedido de orçamento consolidado. Nossa equipe entra em contato em breve.
        </p>
        <Link href="/" className="mt-6 inline-block text-navy underline">
          Voltar para a home
        </Link>
      </div>
    );
  }

  if (itens.length === 0) {
    return (
      <div className="px-6 py-16 text-center sm:px-8">
        <h1 className="text-2xl font-medium text-graphite">Seu orçamento está vazio</h1>
        <p className="mt-2 text-gray-600">
          Navegue pelo catálogo e adicione produtos ao orçamento.
        </p>
        <Link href="/categorias" className="mt-6 inline-block text-navy underline">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Seu orçamento</h1>

      <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
        {itens.map((item) => (
          <div key={item.produtoId} className="flex items-center gap-4 py-4">
            <div className="h-16 w-16 shrink-0 rounded-md bg-sand" aria-hidden />
            <div className="flex-1">
              <p className="font-medium text-graphite">{item.nome}</p>
              <p className="text-xs text-gray-500">Cód. {item.codigo}</p>
              {item.observacaoPersonalizacao && (
                <p className="text-xs text-gray-500">{item.observacaoPersonalizacao}</p>
              )}
            </div>
            <input
              type="number"
              min={1}
              value={item.quantidade}
              onChange={(e) => atualizarQuantidade(item.produtoId, Number(e.target.value))}
              className="w-20 rounded-md border border-gray-300 px-2 py-1 text-sm"
            />
            <button
              onClick={() => removerItem(item.produtoId)}
              className="text-sm text-gray-400 hover:text-coral"
            >
              Remover
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleFinalizar} className="mt-10 max-w-lg space-y-4">
        <h2 className="text-lg font-medium text-graphite">Finalizar pedido de orçamento</h2>
        <div>
          <label className="text-sm text-graphite">Nome</label>
          <input
            required
            value={dados.nome}
            onChange={(e) => setDados({ ...dados, nome: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-graphite">Empresa</label>
          <input
            required
            value={dados.empresa}
            onChange={(e) => setDados({ ...dados, empresa: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-graphite">E-mail</label>
            <input
              required
              type="email"
              value={dados.email}
              onChange={(e) => setDados({ ...dados, email: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-graphite">Telefone/WhatsApp</label>
            <input
              required
              value={dados.telefone}
              onChange={(e) => setDados({ ...dados, telefone: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>
        </div>
        <div>
          <label className="text-sm text-graphite">Local de entrega</label>
          <input
            required
            value={dados.localEntrega}
            onChange={(e) => setDados({ ...dados, localEntrega: e.target.value })}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="text-sm text-graphite">Observações</label>
          <textarea
            value={dados.observacoes}
            onChange={(e) => setDados({ ...dados, observacoes: e.target.value })}
            rows={3}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </div>

        {erro && <p className="text-sm text-coral">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0c3d4a] disabled:opacity-60"
        >
          {enviando ? "Enviando..." : "Enviar pedido de orçamento"}
        </button>
      </form>
    </div>
  );
}
