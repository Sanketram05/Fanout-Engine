import { db } from "../db/db.js";
import { commentary } from "../db/schema.js";

import { getMatchEvents } from "./football-api.js";
import { mapCommentary } from "./map-commentary.js";

export async function syncCommentary(
    dbMatchId,
    fixtureId,
    broadcastCommentary = null
) {
    try {
        const response = await getMatchEvents(fixtureId);

        const events = response.response ?? [];

        if (events.length === 0) {
            return;
        }

        for (let i = 0; i < events.length; i++) {

            const mapped = mapCommentary(
                dbMatchId,
                fixtureId,
                events[i],
                i
            );

            const inserted = await db
            .insert(commentary)
            .values(mapped)
            .onConflictDoNothing({
                target: commentary.apiEventId,
            })
            .returning();

            const created = inserted[0];

            if (!created) {
                continue;
            }

            if (broadcastCommentary) {
                broadcastCommentary(dbMatchId, created);
            }
        }

    } catch (error) {
        console.error(
            `Failed syncing commentary for fixture ${fixtureId}`,
            error
        );
    }
}