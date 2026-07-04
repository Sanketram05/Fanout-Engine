"use client";

import { useState } from "react";

import Header from "@/components/common/Header";
import MatchList from "@/components/match/MatchList";
import StatusFilter from "@/components/match/StatusFilter";
import DashboardStats from "@/components/match/DashboardStats";
import MatchCardSkeleton from "@/components/skeletons/MatchCardSkeleton";
import { useMatches } from "@/hooks/useMatches";

export default function Home() {

  const { data = [], isLoading, error } = useMatches();

  const [status, setStatus] = useState("all");

  const filteredMatches =
    status === "all"
      ? data
      : data.filter(
        match => match.status === status
      );

  if (isLoading) {
    return (
      <main className="container mx-auto p-8">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        Failed to load matches.
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-6 py-10">

        <DashboardStats matches={data} />

        <StatusFilter
          selected={status}
          onChange={setStatus}
        />

        <MatchList
          matches={filteredMatches}
        />

      </main>
    </>
  );
}