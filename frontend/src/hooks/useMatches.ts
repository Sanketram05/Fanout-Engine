"use client";

import { useQuery } from "@tanstack/react-query";

import { getMatches } from "@/services/match.services";

export function useMatches() {
  return useQuery({
    queryKey: ["matches"],
    queryFn: getMatches,
  });
}