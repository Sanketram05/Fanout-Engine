import { Clock3 } from "lucide-react";

type ComingSoonProps = {
  sport: string;
  icon: string;
  description?: string;
};

export default function ComingSoon({
  sport,
  icon,
  description = "This module is currently under development.",
}: ComingSoonProps) {
  return (
    <main className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-6">

      <div className="w-full max-w-2xl rounded-3xl border bg-card p-10 text-center shadow-sm">

        <div className="mb-6 text-7xl">
          {icon}
        </div>

        <h1 className="text-5xl font-bold">
          {sport}
        </h1>

        <p className="mt-5 text-lg text-muted-foreground">
          {description}
        </p>

        <div className="mt-10 flex items-center justify-center gap-2 text-blue-600">

          <Clock3 className="h-5 w-5" />

          <span className="font-medium">
            Coming Soon
          </span>

        </div>

      </div>

    </main>
  );
}