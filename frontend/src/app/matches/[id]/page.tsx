"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState, useCallback } from "react";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import MatchHeader from "@/components/match/MatchHeader";
import CommentaryList from "@/components/commentary/CommentaryList";

import { useMatch } from "@/hooks/useMatch";
import { useCommentary } from "@/hooks/useCommentary";
import { useWebSocket } from "@/hooks/useWebSocket";

import { Commentary } from "@/types/commentary";

export default function MatchPage() {
    const params = useParams();

    const id = Number(params.id);

    const {
        data: match,
        isLoading: matchLoading,
        error: matchError,
    } = useMatch(id);

    const {
        data: initialCommentary = [],
        isLoading: commentaryLoading,
        error: commentaryError,
    } = useCommentary(id);

    const [liveCommentary, setLiveCommentary] = useState<Commentary[]>([]);

    const handleNewCommentary = useCallback(
        (newComment: Commentary) => {
            setLiveCommentary((prev) => {
                const exists = prev.some(
                    (item) => item.id === newComment.id
                );

                if (exists) {
                    return prev;
                }

                return [newComment, ...prev];
            });
        },
        []
    );

    useWebSocket(id, handleNewCommentary);

    const commentary =
        liveCommentary.length > 0
            ? [...liveCommentary, ...initialCommentary]
            : initialCommentary;

    if (matchLoading) {
        return (
            <main className="mx-auto max-w-6xl p-8">
                <p>Loading Match...</p>
            </main>
        );
    }

    if (matchError) {
        return (
            <main className="mx-auto max-w-6xl p-8">
                <p>Failed to load match.</p>
            </main>
        );
    }

    if (!match) {
        return (
            <main className="mx-auto max-w-6xl p-8">
                <p>Match not found.</p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl space-y-8 p-8">

            <Button
                asChild
                variant="outline"
            >
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                </Link>
            </Button>

            <MatchHeader match={match} />

            <section>

                <h2 className="mb-6 text-3xl font-bold">
                    Match Timeline
                </h2>

                {commentaryLoading ? (
                    <p>Loading commentary...</p>
                ) : commentaryError ? (
                    <p>Failed to load commentary.</p>
                ) : commentary.length === 0 ? (
                    <div className="rounded-xl border p-6 text-center">
                        No commentary available.
                    </div>
                ) : (
                    <CommentaryList commentary={commentary} />
                )}

            </section>

        </main>
    );
}