export const metadata = { title: "Como funciona — In Print" };

const PASSOS = [
  {
    titulo: "1. Escolha seu caminho",
    descricao:
      "Já sabe o que quer? Monte seu orçamento direto no catálogo. Prefere sugestões? Peça uma consultoria personalizada.",
  },
  {
    titulo: "2. Envie os detalhes",
    descricao:
      "Conte sobre o evento, quantidade de presenteados e a logomarca — quanto mais contexto, melhor a proposta.",
  },
  {
    titulo: "3. Receba a proposta",
    descricao: "Nossa equipe retorna com a proposta consolidada e prazos.",
  },
  {
    titulo: "4. Aprovação e produção",
    descricao: "Com tudo aprovado, produzimos com prazo garantido até a entrega.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="px-6 py-12 sm:px-8">
      <h1 className="text-2xl font-medium text-graphite">Como funciona</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {PASSOS.map((passo) => (
          <div key={passo.titulo}>
            <p className="font-medium text-navy">{passo.titulo}</p>
            <p className="mt-1 text-sm text-gray-600">{passo.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
