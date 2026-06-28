import { eq } from "drizzle-orm";

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

            const existing = await db
                .select()
                .from(commentary)
                .where(eq(commentary.apiEventId, mapped.apiEventId))
                .limit(1);

            if (existing.length > 0) {
                continue;
            }

            const [created] = await db
                .insert(commentary)
                .values(mapped)
                .returning();

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