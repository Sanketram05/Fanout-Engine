export function mapCommentary(matchId, fixtureId, event, sequence = 0) {
    const elapsed = event.time?.elapsed ?? 0;

    let period = "FIRST_HALF";

    if (elapsed > 45) {
        period = "SECOND_HALF";
    }

    if (elapsed > 90) {
        period = "EXTRA_TIME";
    }

    return {
        apiEventId: [
            fixtureId,
            elapsed,
            event.time?.extra ?? 0,
            event.type ?? "",
            event.detail ?? "",
            event.team?.id ?? "",
            event.player?.id ?? "",
            event.assist?.id ?? "",
            sequence, // last-resort tie-breaker
        ].join("-"),

        // Required database fields
        matchId,
        minute: elapsed,
        sequence,
        period,

        eventType: event.type ?? null,
        actor: event.player?.name ?? null,
        team: event.team?.name ?? null,

        message:
            event.comments ??
            event.detail ??
            event.type ??
            "Match Event",

        metadata: {
            fixtureId,
            time: event.time,
            team: event.team,
            player: event.player,
            assist: event.assist,
            detail: event.detail,
            comments: event.comments,
        },

        tags: [
            event.type,
            event.detail,
        ].filter(Boolean),
    };
}