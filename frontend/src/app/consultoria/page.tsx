"use client";

import { useState } from "react";
import Link from "next/link";
import { eventoLeadConsultoriaEnviado, obterUTM } from "@/lib/analytics";

interface GrupoPresenteado {
  tipo: string;
  quantidade: string;
}

const GRUPO_VAZIO: GrupoPresenteado = { tipo: "", quantidade: "" };

// Campos conforme planejamento-inprint.md, seção 4.1 — o próprio cliente marcou
// este formulário como "primeira versão, a refinar depois". Não tratar como
// definitivo demais para resistir a mudança futura.
export default function ConsultoriaPage() {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [presenteados, setPresenteados] = useState<GrupoPresenteado[]>([GRUPO_VAZIO]);
  const [form, setForm] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    siteEmpresa: "",
    instagram: "",
    facebook: "",
    outrasRedes: "",
    tipoAcao: "",
    dataEvento: "",
    localEntrega: "",
    monocromia: "não sei",
    orcamentoDefinido: "não",
    valorAproximado: "",
    observacoes: "",
  });

  function atualizarPresenteado(index: number, campo: keyof GrupoPresenteado, valor: string) {
    setPresenteados((atual) =>
      atual.map((g, i) => (i === index ? { ...g, [campo]: valor } : g))
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);
    setErro(null);
    try {
      const res = await fetch("/api/consultoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, presenteados, utm: obterUTM() }),
      });
      if (!res.ok) throw new Error("Falha ao enviar consultoria");
      eventoLeadConsultoriaEnviado();
      setEnviado(true);
    } catch {
      setErro("Não foi possível enviar seu pedido agora. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="px-6 py-16 text-center sm:px-8">
        <h1 className="text-2xl font-medium text-graphite">Pedido de consultoria enviado!</h1>
        <p className="mt-2 text-gray-600">
          Nossa equipe vai analisar sua ação e entrar em contato com sugestões.
        </p>
        <Link href="/" className="mt-6 inline-block text-navy underline">
          Voltar para a home
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Pedir consultoria</h1>
      <p className="mt-2 max-w-xl text-gray-600">
        Conte pra gente sobre a sua ação e a nossa equipe sugere os brindes certos.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl space-y-10">
        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-graphite">Dados de contato</legend>
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Nome" value={form.nome} onChange={(v) => setForm({ ...form, nome: v })} required />
            <Campo label="Empresa" value={form.empresa} onChange={(v) => setForm({ ...form, empresa: v })} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Campo label="E-mail" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} required />
            <Campo label="Telefone/WhatsApp" value={form.telefone} onChange={(v) => setForm({ ...form, telefone: v })} required />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-graphite">Sobre a empresa</legend>
          <Campo label="Site da empresa" value={form.siteEmpresa} onChange={(v) => setForm({ ...form, siteEmpresa: v })} />
          <div className="grid grid-cols-3 gap-4">
            <Campo label="Instagram" value={form.instagram} onChange={(v) => setForm({ ...form, instagram: v })} />
            <Campo label="Facebook" value={form.facebook} onChange={(v) => setForm({ ...form, facebook: v })} />
            <Campo label="Outras redes" value={form.outrasRedes} onChange={(v) => setForm({ ...form, outrasRedes: v })} />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-graphite">Sobre o evento ou ação</legend>
          <Campo label="Qual é a ação/tipo de evento" value={form.tipoAcao} onChange={(v) => setForm({ ...form, tipoAcao: v })} required />
          <div className="grid grid-cols-2 gap-4">
            <Campo label="Data do evento" type="date" value={form.dataEvento} onChange={(v) => setForm({ ...form, dataEvento: v })} />
            <Campo label="Local de entrega" value={form.localEntrega} onChange={(v) => setForm({ ...form, localEntrega: v })} />
          </div>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-lg font-medium text-graphite">Sobre os presenteados</legend>
          {presenteados.map((grupo, i) => (
            <div key={i} className="grid grid-cols-[1fr_140px_auto] items-end gap-3">
              <Campo
                label="Quem são (colaboradores, clientes, parceiros...)"
                value={grupo.tipo}
                onChange={(v) => atualizarPresenteado(i, "tipo", v)}
              />
              <Campo
                label="Quantidade"
                type="number"
                value={grupo.quantidade}
                onChange={(v) => atualizarPresenteado(i, "quantidade", v)}
              />
              {presenteados.length > 1 && (
                <button
                  type="button"
                  onClick={() => setPresenteados((atual) => atual.filter((_, idx) => idx !== i))}
                  className="mb-1 text-sm text-gray-400 hover:text-coral"
                >
                  Remover
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setPresenteados((atual) => [...atual, GRUPO_VAZIO])}
            className="text-sm text-navy underline"
          >
            + adicionar outro grupo de presenteados
          </button>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-graphite">Personalização</legend>
          <div>
            <label className="text-sm text-graphite">
              A logomarca permite aplicação em monocromia?
            </label>
            <select
              value={form.monocromia}
              onChange={(e) => setForm({ ...form, monocromia: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:w-64"
            >
              <option value="sim">Sim</option>
              <option value="não">Não</option>
              <option value="não sei">Não sei</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-lg font-medium text-graphite">Orçamento</legend>
          <div>
            <label className="text-sm text-graphite">Já existe um orçamento definido?</label>
            <select
              value={form.orcamentoDefinido}
              onChange={(e) => setForm({ ...form, orcamentoDefinido: e.target.value })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm sm:w-64"
            >
              <option value="não">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
          {form.orcamentoDefinido === "sim" && (
            <Campo
              label="Valor aproximado (opcional)"
              value={form.valorAproximado}
              onChange={(v) => setForm({ ...form, valorAproximado: v })}
            />
          )}
        </fieldset>

        <fieldset className="space-y-2">
          <legend className="text-lg font-medium text-graphite">Observações</legend>
          <textarea
            value={form.observacoes}
            onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
            rows={4}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          />
        </fieldset>

        {erro && <p className="text-sm text-coral">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="rounded-md bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0c3d4a] disabled:opacity-60"
        >
          {enviando ? "Enviando..." : "Enviar pedido de consultoria"}
        </button>
      </form>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-sm text-graphite">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
      />
    </div>
  );
}
