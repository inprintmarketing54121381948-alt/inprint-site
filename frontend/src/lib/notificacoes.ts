const RESEND_API_KEY = process.env.RESEND_API_KEY;
const EMAIL_REMETENTE = process.env.EMAIL_REMETENTE ?? "contato@inprintpersonalizados.com.br";
const EMAIL_EQUIPE = process.env.EMAIL_EQUIPE ?? "vendas@inprintpersonalizados.com.br";
const WHATSAPP_EQUIPE = process.env.WHATSAPP_EQUIPE_NUMERO ?? "5519988104989";

// Notificação por e-mail (Resend) + link wa.me pronto no corpo do e-mail —
// decisão do cliente: sem API paga do WhatsApp, só um link de um clique.
// Ver contas-e-acessos.md e especificacao-tecnica.md, seção 1.
export async function notificarEquipe(params: {
  assunto: string;
  linhasResumo: string[];
  mensagemWhatsApp: string;
}) {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY não configurada — notificação por e-mail pulada.");
    return;
  }

  const linkWhatsApp = `https://wa.me/${WHATSAPP_EQUIPE}?text=${encodeURIComponent(
    params.mensagemWhatsApp
  )}`;

  const html = `
    <h2>${params.assunto}</h2>
    <ul>${params.linhasResumo.map((linha) => `<li>${linha}</li>`).join("")}</ul>
    <p><a href="${linkWhatsApp}">Abrir conversa no WhatsApp com o cliente</a></p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_REMETENTE,
      to: EMAIL_EQUIPE,
      subject: params.assunto,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Falha ao enviar notificação por e-mail:", await res.text());
  }
}
