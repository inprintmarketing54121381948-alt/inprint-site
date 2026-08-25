"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/categorias", label: "Categorias" },
  { href: "/ocasioes", label: "Ocasiões" },
  { href: "/kits", label: "Kits especiais" },
  { href: "/como-funciona", label: "Como funciona" },
  { href: "/sobre", label: "Sobre a Inprint" },
  { href: "/blog", label: "Blog" },
];

export function Header() {
  const { totalItens } = useCart();

  return (
    <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-white px-6 py-4 sm:px-8">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy font-script text-xl font-semibold text-white">
          IP
        </span>
        <span className="font-script text-xl font-semibold text-graphite">In Print</span>
      </Link>

      <nav className="flex flex-wrap gap-6 text-sm text-graphite">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="hover:text-navy">
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <Link href="/carrinho" className="relative text-xl" aria-label="Carrinho de orçamento">
          🧾
          {totalItens > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-coral px-1.5 text-xs font-semibold text-white">
              {totalItens}
            </span>
          )}
        </Link>
        <Link
          href="/consultoria"
          className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-[#0c3d4a]"
        >
          Pedir consultoria
        </Link>
      </div>
    </header>
  );
}
