"use client";

import { useQuery } from "@tanstack/react-query";

import { getCommentary } from "@/services/commentary.services";

export function useCommentary(matchId:number){

    return useQuery({

        queryKey:["commentary",matchId],

        queryFn:()=>getCommentary(matchId),

    });

}