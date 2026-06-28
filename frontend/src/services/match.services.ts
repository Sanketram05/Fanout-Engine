import { api } from "@/lib/api";
import { Match } from "@/types/match";

export async function getMatches(): Promise<Match[]> {
  console.log("Calling backend...");

  const response = await api.get("/matches");

  console.log(response.data);

  return response.data.data;
}

export async function getMatch(id:number){

    const response = await api.get(`/matches/${id}`);

    return response.data.data;

}