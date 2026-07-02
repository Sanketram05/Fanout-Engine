import { eq, and, notInArray } from "drizzle-orm";

import { db } from "../../db/db.js";
import { matches } from "../../db/schema.js";

import { getLiveMatches } from "./api.js";
import { mapFixture } from "./map-fixture.js";
import { syncCommentary } from "./commentary-sync.js";

const LIVE_STATUSES = [
    "1H", // First Half
    "HT", // Half Time
    "2H", // Second Half
    "ET", // Extra Time
    "BT", // Break Time
    "P",  // Penalties
];

export async function syncMatches(broadcastCommentary = null) {

    try {

        const data = await getLiveMatches();

        if (!data.response || !Array.isArray(data.response)) {
            console.log("No live matches found.");
            return;
        }

        let inserted = 0;
        let updated = 0;

        for (const fixture of data.response) {

            const match = mapFixture(fixture);

            const existingMatches = await db
                .select()
                .from(matches)
                .where(eq(matches.apiMatchId, match.apiMatchId))
                .limit(1);

            let dbMatch;

            if (existingMatches.length === 0) {

                const [created] = await db
                    .insert(matches)
                    .values(match)
                    .returning();

                dbMatch = created;

                inserted++;

                console.log(
                    `Inserted: ${match.homeTeam} vs ${match.awayTeam}`
                );

            } else {

                dbMatch = existingMatches[0];

                await db
                    .update(matches)
                    .set({
                        status: match.status,
                        homeScore: match.homeScore,
                        awayScore: match.awayScore,
                        startTime: match.startTime,
                        endTime: match.endTime,
                    })
                    .where(eq(matches.apiMatchId, match.apiMatchId));

                updated++;

                console.log(
                    `Updated: ${match.homeTeam} vs ${match.awayTeam}`
                );
            }

            const matchStatus = fixture.fixture.status.short;

            if (LIVE_STATUSES.includes(matchStatus)) {
                await syncCommentary(
                    dbMatch.id,
                    fixture.fixture.id,
                    broadcastCommentary
                );
            }
        }

        const liveFixtureIds = data.response.map(
            (fixture) => fixture.fixture.id
        );

        const result = await db
            .update(matches)
            .set({
                status: "finished",
            })
            .where(
                and(
                    eq(matches.status, "live"),
                    notInArray(matches.apiMatchId, liveFixtureIds)
                )
            )
            .returning();

        if (result.length > 0) {
            console.log(
                `Marked ${result.length} stale live match(es) as finished.`
            );
        }


        console.log(
            `Sync complete: ${inserted} inserted, ${updated} updated`
        );

    } catch (error) {
        console.error("Match Sync Failed:", error);
    }
}
