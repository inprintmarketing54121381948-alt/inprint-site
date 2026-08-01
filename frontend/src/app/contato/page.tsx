export const metadata = { title: "Contato — In Print" };

export default function ContatoPage() {
  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Contato</h1>
      <div className="mt-6 space-y-2 text-gray-600">
        <p>
          WhatsApp:{" "}
          <a href="https://wa.me/5519988104989" className="text-navy underline">
            (19) 98810-4989
          </a>
        </p>
        <p>
          Vendas:{" "}
          <a href="mailto:vendas@inprintpersonalizados.com.br" className="text-navy underline">
            vendas@inprintpersonalizados.com.br
          </a>
        </p>
        <p>
          Outros assuntos:{" "}
          <a href="mailto:contato@inprintpersonalizados.com.br" className="text-navy underline">
            contato@inprintpersonalizados.com.br
          </a>
        </p>
      </div>
    </div>
  );
}
