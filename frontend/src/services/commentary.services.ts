import { api } from "@/lib/api";
import { Commentary } from "@/types/commentary";

export async function getCommentary(matchId:number){

    const response = await api.get<{
        data:Commentary[]
    }>(
        `/matches/${matchId}/commentary`
    );

    return response.data.data;

}