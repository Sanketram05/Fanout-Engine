import { Match } from "@/types/match";

type Props = {
  matches: Match[];
};

export default function DashboardStats({
  matches,
}: Props) {

  const live = matches.filter(
    m => m.status === "live"
  ).length;

  const scheduled = matches.filter(
    m => m.status === "scheduled"
  ).length;

  const finished = matches.filter(
    m => m.status === "finished"
  ).length;

  return (

    <div className="mb-8 grid gap-4 md:grid-cols-3">

      <div className="rounded-xl border p-6">

        <h2 className="text-sm text-muted-foreground">
          Live Matches
        </h2>

        <p className="mt-2 text-3xl font-bold">
          {live}
        </p>

      </div>

      <div className="rounded-xl border p-6">

        <h2 className="text-sm text-muted-foreground">
          Scheduled
        </h2>

        <p className="mt-2 text-3xl font-bold">
          {scheduled}
        </p>

      </div>

      <div className="rounded-xl border p-6">

        <h2 className="text-sm text-muted-foreground">
          Finished
        </h2>

        <p className="mt-2 text-3xl font-bold">
          {finished}
        </p>

      </div>

    </div>

  );
}