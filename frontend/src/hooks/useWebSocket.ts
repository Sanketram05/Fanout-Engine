"use client";

import { useEffect } from "react";
import { connectSocket } from "@/lib/websocket";
import { Commentary } from "@/types/commentary";

export function useWebSocket(
    matchId: number,
    onNewCommentary: (comment: Commentary) => void
) {
    useEffect(() => {
        const socket = connectSocket();

        const subscribe = () => {
            console.log("📡 Subscribing:", matchId);

            socket.send(
                JSON.stringify({
                    type: "subscribe",
                    matchId,
                })
            );
        };

        const handleMessage = (event: MessageEvent) => {
            const payload = JSON.parse(event.data);

            console.log("📨", payload);

            if (payload.type === "commentary") {
                onNewCommentary(payload.data);
            }
        };

        if (socket.readyState === WebSocket.OPEN) {
            subscribe();
        } else {
            socket.addEventListener("open", subscribe, {
                once: true,
            });
        }

        socket.addEventListener("message", handleMessage);

        return () => {
            if (socket.readyState === WebSocket.OPEN) {
                console.log("📴 Unsubscribing:", matchId);

                socket.send(
                    JSON.stringify({
                        type: "unsubscribe",
                        matchId,
                    })
                );
            }

            socket.removeEventListener(
                "message",
                handleMessage
            );
        };
    }, [matchId, onNewCommentary]);
}