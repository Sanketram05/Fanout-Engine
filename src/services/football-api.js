const API_URL = process.env.FOOTBALL_API_URL;
const API_KEY = process.env.FOOTBALL_API_KEY;

export async function getLiveMatches() {
    const response = await fetch(`${API_URL}/fixtures?live=all`, {
        headers: {
            "x-apisports-key": API_KEY,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch live matches");
    }

    return response.json();
}

export async function getMatchEvents(fixtureId) {
    const response = await fetch(
        `${API_URL}/fixtures/events?fixture=${fixtureId}`,
        {
            headers: {
                "x-apisports-key": API_KEY,
            },
        }
    );

    if (response.status === 429) {
        console.warn(
            "API rate limit reached. Skipping commentary sync."
        );
    
        return {
            response: [],
        };
    }
    
    if (!response.ok) {
        throw new Error(
            `Failed to fetch events for fixture ${fixtureId}`
        );
    }

    return response.json();
}