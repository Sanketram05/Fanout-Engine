import { SportProvider } from "../sport-provider.js";
import { syncMatches } from "./sync.js";
import { getLiveMatches } from "./api.js";
import { mapFixture } from "./map-fixture.js";

export class FootballProvider extends SportProvider {
    constructor(broadcastCommentary = null) {
        super();
        this.broadcastCommentary = broadcastCommentary;
    }

    async sync() {
        return syncMatches(this.broadcastCommentary);
    }

    async fetch() {
        return getLiveMatches();
    }

    async map(fixture) {
        return mapFixture(fixture);
    }
}
