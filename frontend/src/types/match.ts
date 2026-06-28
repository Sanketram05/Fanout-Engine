export type MatchStatus = "scheduled" | "live" | "finished";

export interface Match {
  id: number;
  apiMatchId: number;

  sport: string;

  homeTeam: string;
  awayTeam: string;

  homeScore: number;
  awayScore: number;

  status: MatchStatus;

  startTime: string;
  endTime: string;

  createdAt: string;
}

export interface MatchResponse {
  data: Match[];
}