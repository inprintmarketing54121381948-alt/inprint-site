import type { CampanhaUTM } from "./types";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";

const UTM_STORAGE_KEY = "inprint_utm";
const UTM_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

// Grava os parâmetros de campanha (utm_*) da URL de entrada em sessionStorage,
// para que ainda estejam disponíveis quando o visitante converter páginas depois.
export function capturarUTM() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: CampanhaUTM = {};
  let hasAny = false;
  for (const key of UTM_PARAMS) {
    const value = params.get(key);
    if (value) {
      found[key] = value;
      hasAny = true;
    }
  }
  if (hasAny) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
  }
}

export function obterUTM(): CampanhaUTM {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) ?? "{}");
  } catch {
    return {};
  }
}

type DataLayerEvent = Record<string, unknown> & { event: string };

export function pushDataLayerEvent(event: DataLayerEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(event);
}

// Eventos de conversão dos dois fluxos — ver especificacao-tecnica.md, seção 3.
export function eventoLeadConsultoriaEnviado() {
  pushDataLayerEvent({ event: "lead_consultoria_enviado", ...obterUTM() });
}

export function eventoOrcamentoFinalizado(quantidadeItens: number) {
  pushDataLayerEvent({
    event: "orcamento_finalizado",
    quantidade_itens: quantidadeItens,
    ...obterUTM(),
  });
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}
