"use client";

import MatchCard from "./MatchCard";

import { Match } from "@/types/match";

type Props = {
    matches: Match[];
};

export default function MatchList({ matches }: Props) {

    return (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {matches.map((match) => (

                <MatchCard
                    key={match.id}
                    match={match}
                />

            ))}

        </div>

    );
}