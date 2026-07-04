"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy } from "lucide-react";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Football",
    href: "/football",
  },
  {
    name: "Formula 1",
    href: "/formula1",
  },
  {
    name: "NBA",
    href: "/nba",
  },
  {
    name: "Baseball",
    href: "/baseball",
  },
  {
    name: "MMA",
    href: "/mma",
  },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold"
        >
          <Trophy className="h-6 w-6 text-yellow-500" />
          FanOut-Engine
        </Link>

        <nav className="flex gap-6">

          {links.map((link) => (

            <Link
              key={link.name}
              href={link.href}
              className={`transition hover:text-blue-500 ${
                pathname === link.href
                  ? "font-semibold text-blue-600"
                  : ""
              }`}
            >
              {link.name}
            </Link>

          ))}

        </nav>

        <div className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">

          ● Live

        </div>

      </div>
    </header>
  );
}