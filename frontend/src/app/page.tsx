import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";

const sports = [
  {
    name: "Football",
    icon: "⚽",
    description: "Live matches, commentary and match statistics",
    href: "/football",
    available: true,
    color: "from-green-500 to-emerald-600",
  },
  {
    name: "Formula 1",
    icon: "🏎️",
    description: "Race schedule, standings and results",
    href: "/formula1",
    available: false,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "NBA",
    icon: "🏀",
    description: "Games, standings and player statistics",
    href: "/nba",
    available: false,
    color: "from-orange-500 to-yellow-500",
  },
  {
    name: "Baseball",
    icon: "⚾",
    description: "Live games and season standings",
    href: "/baseball",
    available: false,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "MMA",
    icon: "🥊",
    description: "Fight cards and results",
    href: "/mma",
    available: false,
    color: "from-purple-500 to-pink-500",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-7xl px-6 py-16">

        <div className="text-center">

          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-primary/10 p-5">
              <Trophy className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <h1 className="text-5xl font-extrabold tracking-tight">
            FanOut-Engine
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            A real-time multi-sport platform for live scores, commentary,
            standings and analytics.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {sports.map((sport) => (
            <Link
              key={sport.name}
              href={sport.available ? sport.href : "#"}
              className={`group rounded-3xl border bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                !sport.available
                  ? "cursor-default opacity-70"
                  : ""
              }`}
            >
              <div
                className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${sport.color} text-5xl`}
              >
                {sport.icon}
              </div>

              <h2 className="text-3xl font-bold">
                {sport.name}
              </h2>

              <p className="mt-3 text-muted-foreground">
                {sport.description}
              </p>

              <div className="mt-8 flex items-center justify-between">

                {sport.available ? (
                  <span className="rounded-full bg-green-600 px-3 py-1 text-sm font-medium text-white">
                    Available
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-600 px-3 py-1 text-sm font-medium text-white">
                    Coming Soon
                  </span>
                )}

                {sport.available && (
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-2" />
                )}

              </div>
            </Link>
          ))}

        </div>

        <div className="mt-20 rounded-3xl border bg-card p-10 text-center">

          <h2 className="text-3xl font-bold">
            More Sports Coming Soon
          </h2>

          <p className="mt-4 text-muted-foreground">
            Formula 1, NBA, Baseball and MMA modules will be added one by one
            while preserving the existing Football experience.
          </p>

        </div>

      </section>
    </main>
  );
}