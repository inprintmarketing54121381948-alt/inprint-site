import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Recebe o arquivo de logomarca do cliente e repassa pro upload do Strapi
// (Cloudflare R2 em produção, disco local em dev — mesmo endpoint, provider
// trocado via config/plugins.ts). Precisa passar pelo servidor porque o
// STRAPI_API_TOKEN nunca pode ser exposto ao navegador.
export async function POST(req: NextRequest) {
  if (!STRAPI_API_TOKEN) {
    return NextResponse.json({ error: "Upload indisponível no momento." }, { status: 503 });
  }

  const formData = await req.formData();
  const arquivo = formData.get("arquivo");
  if (!(arquivo instanceof File)) {
    return NextResponse.json({ error: "Arquivo não enviado." }, { status: 400 });
  }

  const strapiForm = new FormData();
  strapiForm.append("files", arquivo, arquivo.name);

  const res = await fetch(`${STRAPI_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${STRAPI_API_TOKEN}` },
    body: strapiForm,
  });

  if (!res.ok) {
    console.error("Falha ao enviar logomarca pro Strapi:", await res.text());
    return NextResponse.json({ error: "Falha ao enviar arquivo." }, { status: 502 });
  }

  const [arquivoEnviado] = (await res.json()) as { url: string }[];
  const url = arquivoEnviado.url.startsWith("http")
    ? arquivoEnviado.url
    : `${STRAPI_URL}${arquivoEnviado.url}`;

  return NextResponse.json({ url });
}
