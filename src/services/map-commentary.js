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
            sequence, // only acts as a last-resort tie-breaker
        ].join("-"),

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