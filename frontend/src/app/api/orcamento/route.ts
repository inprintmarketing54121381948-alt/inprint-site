import { NextRequest, NextResponse } from "next/server";
import { criarEntradaStrapi } from "@/lib/strapi-write";
import { notificarEquipe } from "@/lib/notificacoes";
import type { ItemOrcamento } from "@/lib/types";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { nome, empresa, email, telefone, localEntrega, observacoes, itens, utm } = body as {
    nome: string;
    empresa: string;
    email: string;
    telefone: string;
    localEntrega: string;
    observacoes?: string;
    itens: ItemOrcamento[];
    utm?: Record<string, string>;
  };

  if (!nome || !empresa || !email || !telefone || !itens?.length) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }

  await criarEntradaStrapi("orcamentos", {
    nome,
    empresa,
    email,
    telefone,
    localEntrega,
    observacoes,
    itens,
    ...utm,
  });

  const resumoItens = itens.map((i) => `${i.quantidade}x ${i.nome} (${i.codigo})`);

  await notificarEquipe({
    assunto: `Novo orçamento consolidado — ${empresa}`,
    linhasResumo: [
      `Nome: ${nome}`,
      `Empresa: ${empresa}`,
      `E-mail: ${email}`,
      `Telefone: ${telefone}`,
      `Local de entrega: ${localEntrega ?? "-"}`,
      `Itens: ${resumoItens.join(", ")}`,
    ],
    mensagemWhatsApp: `Olá ${nome}! Recebemos seu pedido de orçamento na In Print com ${itens.length} ${
      itens.length === 1 ? "item" : "itens"
    }. Vamos preparar sua proposta!`,
  });

  return NextResponse.json({ ok: true });
}
