"use client";

import { Badge } from "@/components/ui/badge";
import { Match } from "@/types/match";

type Props = {
    match: Match;
};

export default function MatchHeader({ match }: Props) {
    return (
        <div className="rounded-xl border bg-card p-10 shadow">

    <div className="text-center mb-6">

        <Badge>

            {match.status.toUpperCase()}

        </Badge>

    </div>

    <div className="grid grid-cols-3 items-center">

        <div className="text-center">

            <h2 className="text-2xl font-bold">

                {match.homeTeam}

            </h2>

        </div>

        <div className="text-center">

            <div className="text-5xl font-black">

                {match.homeScore}

                <span className="mx-3 text-gray-400">

                    -

                </span>

                {match.awayScore}

            </div>

        </div>

        <div className="text-center">

            <h2 className="text-2xl font-bold">

                {match.awayTeam}

            </h2>

        </div>

    </div>

</div>
    );
}