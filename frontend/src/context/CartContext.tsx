"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ItemOrcamento } from "@/lib/types";

const STORAGE_KEY = "inprint_orcamento";

interface CartContextValue {
  itens: ItemOrcamento[];
  totalItens: number;
  adicionarItem: (item: Omit<ItemOrcamento, "quantidade">, quantidade: number) => void;
  atualizarQuantidade: (produtoId: number, quantidade: number) => void;
  removerItem: (produtoId: number) => void;
  limparCarrinho: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemOrcamento[]>([]);
  const [hidratado, setHidratado] = useState(false);

  useEffect(() => {
    const salvo = localStorage.getItem(STORAGE_KEY);
    if (salvo) {
      try {
        setItens(JSON.parse(salvo));
      } catch {
        // carrinho salvo corrompido — ignora e começa vazio
      }
    }
    setHidratado(true);
  }, []);

  useEffect(() => {
    if (hidratado) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens));
    }
  }, [itens, hidratado]);

  function adicionarItem(item: Omit<ItemOrcamento, "quantidade">, quantidade: number) {
    setItens((atual) => {
      const existente = atual.find((i) => i.produtoId === item.produtoId);
      if (existente) {
        return atual.map((i) =>
          i.produtoId === item.produtoId
            ? { ...i, quantidade: i.quantidade + quantidade }
            : i
        );
      }
      return [...atual, { ...item, quantidade }];
    });
  }

  function atualizarQuantidade(produtoId: number, quantidade: number) {
    setItens((atual) =>
      atual.map((i) => (i.produtoId === produtoId ? { ...i, quantidade } : i))
    );
  }

  function removerItem(produtoId: number) {
    setItens((atual) => atual.filter((i) => i.produtoId !== produtoId));
  }

  function limparCarrinho() {
    setItens([]);
  }

  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0);

  return (
    <CartContext.Provider
      value={{ itens, totalItens, adicionarItem, atualizarQuantidade, removerItem, limparCarrinho }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
