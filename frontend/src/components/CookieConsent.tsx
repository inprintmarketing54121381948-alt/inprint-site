"use client";

import { useEffect, useState } from "react";
import { capturarUTM } from "@/lib/analytics";
import { GoogleTagManagerNoscript, GoogleTagManagerScript } from "./GoogleTagManager";

const CONSENT_KEY = "inprint_cookie_consent";

// Consentimento LGPD para tags de marketing (GTM/GA4/Ads). A captura de UTM
// roda independente do consentimento: é atribuição do próprio pedido do
// visitante (para que fluxo/campanha ele respondeu), não rastreamento de
// terceiros — mas o GTM em si só carrega depois do aceite explícito.
export function CookieConsent() {
  const [consentimento, setConsentimento] = useState<"pendente" | "aceito" | "recusado">(
    "pendente"
  );

  useEffect(() => {
    capturarUTM();
    const salvo = localStorage.getItem(CONSENT_KEY);
    if (salvo === "aceito" || salvo === "recusado") {
      setConsentimento(salvo);
    }
  }, []);

  function responder(valor: "aceito" | "recusado") {
    localStorage.setItem(CONSENT_KEY, valor);
    setConsentimento(valor);
  }

  return (
    <>
      <GoogleTagManagerScript consentiu={consentimento === "aceito"} />
      <GoogleTagManagerNoscript consentiu={consentimento === "aceito"} />
      {consentimento === "pendente" && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col gap-3 border-t border-black/10 bg-white p-4 shadow-lg sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-graphite">
            Usamos cookies para melhorar sua experiência e medir o desempenho das
            nossas campanhas. Veja nossa{" "}
            <a href="/politica-de-privacidade" className="underline">
              política de privacidade
            </a>
            .
          </p>
          <div className="flex shrink-0 gap-2">
            <button
              onClick={() => responder("recusado")}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm"
            >
              Recusar
            </button>
            <button
              onClick={() => responder("aceito")}
              className="rounded-md bg-navy px-4 py-2 text-sm text-white"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
