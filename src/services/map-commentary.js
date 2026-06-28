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
        apiEventId: `${fixtureId}-${elapsed}-${event.type}-${event.player?.id ?? sequence}`,

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