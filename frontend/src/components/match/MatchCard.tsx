"use client";

import Link from "next/link";

import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Match } from "@/types/match";

type Props = {
    match: Match;
};

export default function MatchCard({
    match,
}: Props) {

    const badgeVariant =
        match.status === "live"
            ? "destructive"
            : match.status === "finished"
            ? "secondary"
            : "outline";

    return (

        <Card
            className="
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
            "
        >

            <CardContent className="space-y-6 pt-6">

                <div className="flex justify-between">

                    <Badge variant={badgeVariant}>

                        {match.status.toUpperCase()}

                    </Badge>

                    <span className="text-sm text-muted-foreground">

                        Football

                    </span>

                </div>

                <div className="grid grid-cols-3 items-center">

                    <div className="text-center">

                        <h2 className="font-semibold text-lg">

                            {match.homeTeam}

                        </h2>

                    </div>

                    <div className="text-center">

                        <div className="text-4xl font-bold">

                            {match.homeScore} - {match.awayScore}

                        </div>

                    </div>

                    <div className="text-center">

                        <h2 className="font-semibold text-lg">

                            {match.awayTeam}

                        </h2>

                    </div>

                </div>

            </CardContent>

            <CardFooter>

                <Button
                    asChild
                    className="w-full"
                >

                    <Link href={`football/matches/${match.id}`}>

                        View Match →

                    </Link>

                </Button>

            </CardFooter>

        </Card>

    );

}