import { NextRequest, NextResponse } from "next/server";
import { criarEntradaStrapi } from "@/lib/strapi-write";
import { notificarEquipe } from "@/lib/notificacoes";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    nome,
    empresa,
    email,
    telefone,
    siteEmpresa,
    instagram,
    facebook,
    outrasRedes,
    tipoAcao,
    dataEvento,
    localEntrega,
    presenteados,
    monocromia,
    orcamentoDefinido,
    valorAproximado,
    observacoes,
    utm,
  } = body;

  if (!nome || !empresa || !email || !telefone) {
    return NextResponse.json({ error: "Campos obrigatórios ausentes." }, { status: 400 });
  }

  await criarEntradaStrapi("leads-consultoria", {
    nome,
    empresa,
    email,
    telefone,
    siteEmpresa,
    instagram,
    facebook,
    outrasRedes,
    tipoAcao,
    dataEvento,
    localEntrega,
    presenteados,
    monocromia,
    orcamentoDefinido,
    valorAproximado,
    observacoes,
    ...utm,
  });

  await notificarEquipe({
    assunto: `Novo pedido de consultoria — ${empresa}`,
    linhasResumo: [
      `Nome: ${nome}`,
      `Empresa: ${empresa}`,
      `E-mail: ${email}`,
      `Telefone: ${telefone}`,
      `Ação: ${tipoAcao ?? "-"}`,
      `Data do evento: ${dataEvento ?? "-"}`,
    ],
    mensagemWhatsApp: `Olá ${nome}! Recebemos seu pedido de consultoria para ${
      tipoAcao ?? "sua ação"
    } na In Print. Vamos conversar sobre as opções de brindes?`,
  });

  return NextResponse.json({ ok: true });
}
