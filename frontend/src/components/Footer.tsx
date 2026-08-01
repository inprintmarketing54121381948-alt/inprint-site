import Link from "next/link";

// Dados institucionais (CNPJ, endereço, redes sociais) ainda não foram
// fornecidos pelo cliente — ver planejamento-inprint.md, checklist "Conteúdo".
// Não inventar valores reais aqui; manter os placeholders visíveis até o
// conteúdo definitivo chegar.
export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 bg-sand/40 px-6 py-10 text-sm text-graphite sm:px-8">
      <div className="grid gap-8 sm:grid-cols-3">
        <div>
          <span className="font-script text-lg font-semibold">In Print</span>
          <p className="mt-2 text-gray-600">Impressos & Brindes Personalizados</p>
          <p className="mt-4 text-gray-500">[Razão social / CNPJ pendente]</p>
          <p className="text-gray-500">[Endereço pendente]</p>
        </div>
        <div>
          <p className="font-medium">Contato</p>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>
              <a href="https://wa.me/5519988104989" className="hover:text-navy">
                WhatsApp: (19) 98810-4989
              </a>
            </li>
            <li>
              <a href="mailto:vendas@inprintpersonalizados.com.br" className="hover:text-navy">
                vendas@inprintpersonalizados.com.br
              </a>
            </li>
            <li>
              <a href="mailto:contato@inprintpersonalizados.com.br" className="hover:text-navy">
                contato@inprintpersonalizados.com.br
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium">Institucional</p>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>
              <Link href="/como-funciona" className="hover:text-navy">
                Como funciona
              </Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade" className="hover:text-navy">
                Política de privacidade (LGPD)
              </Link>
            </li>
            <li>
              <Link href="/contato" className="hover:text-navy">
                Contato
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-gray-500">[Instagram / Facebook pendentes]</p>
        </div>
      </div>
      <p className="mt-8 text-xs text-gray-400">
        © {new Date().getFullYear()} In Print. Todos os direitos reservados.
      </p>
    </footer>
  );
}
