"use client";

import { useQuery } from "@tanstack/react-query";

import { getMatch } from "@/services/match.services";

export function useMatch(id:number){

    return useQuery({

        queryKey:["match",id],

        queryFn:()=>getMatch(id),

    });

}