const API_URL = process.env.FOOTBALL_API_URL;
const API_KEY = process.env.FOOTBALL_API_KEY;

const API_TIMEOUT = 10000; // 10 seconds

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();

    const timeout = setTimeout(() => {
        console.warn(`Request timed out: ${url}`);
        controller.abort();
    }, API_TIMEOUT);

    try {
        console.log(`Fetching: ${url}`);

        return await fetch(url, {
            ...options,
            signal: controller.signal,
        });

    } finally {
        clearTimeout(timeout);
    }
}

export async function getLiveMatches() {
    try {

        const response = await fetchWithTimeout(
            `${API_URL}/fixtures?live=all`,
            {
                headers: {
                    "x-apisports-key": API_KEY,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch live matches");
        }

        console.log("Live matches fetched successfully.");

        return response.json();

    } catch (error) {

        if (error.name === "AbortError") {
            throw new Error("Live matches request timed out.");
        }

        throw error;
    }
}

export async function getMatchEvents(fixtureId) {
    try {

        const response = await fetchWithTimeout(
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

        console.log(`Fetched commentary for fixture ${fixtureId}.`);

        return response.json();

    } catch (error) {

        if (error.name === "AbortError") {
            console.warn(
                `Commentary request timed out for fixture ${fixtureId}.`
            );

            return {
                response: [],
            };
        }

        throw error;
    }
}