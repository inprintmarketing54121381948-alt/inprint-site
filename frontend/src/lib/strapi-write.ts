const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Grava uma entrada em um content type do Strapi (uso server-side apenas —
// precisa do STRAPI_API_TOKEN, que nunca deve ser exposto ao cliente).
export async function criarEntradaStrapi(
  contentType: "leads-consultoria" | "orcamentos",
  data: Record<string, unknown>
) {
  if (!STRAPI_API_TOKEN) {
    console.warn(`STRAPI_API_TOKEN não configurado — gravação em ${contentType} pulada.`);
    return null;
  }

  const res = await fetch(`${STRAPI_URL}/api/${contentType}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (!res.ok) {
    console.error(`Falha ao gravar em ${contentType}:`, await res.text());
    return null;
  }

  return res.json();
}
