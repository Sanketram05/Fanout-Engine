import { MATCH_STATUS } from "../validation/matches.js";

function getStatus(short) {
    switch (short) {
        case "NS":
            return MATCH_STATUS.SCHEDULED;

        case "1H":
        case "HT":
        case "2H":
        case "ET":
            return MATCH_STATUS.LIVE;

        case "FT":
        case "AET":
        case "PEN":
            return MATCH_STATUS.FINISHED;

        default:
            return MATCH_STATUS.SCHEDULED;
    }
}

export function mapFixture(fixture) {
    return {
        apiMatchId: fixture.fixture.id,

        sport: "Football",

        homeTeam: fixture.teams.home.name,

        awayTeam: fixture.teams.away.name,

        startTime: new Date(fixture.fixture.date),

        endTime: new Date(
            new Date(fixture.fixture.date).getTime() +
            2 * 60 * 60 * 1000
        ),

        homeScore: fixture.goals.home ?? 0,

        awayScore: fixture.goals.away ?? 0,

        status: getStatus(fixture.fixture.status.short),
    };
}