"use client";

import {
    CircleDot,
    RefreshCw,
    Square,
    Clock3,
} from "lucide-react";

import { Commentary } from "@/types/commentary";

type Props = {
    item: Commentary;
};

export default function CommentaryItem({ item }: Props) {

    const renderIcon = () => {
        switch (item.eventType?.toLowerCase()) {
            case "goal":
                return <CircleDot className="h-5 w-5 text-green-600" />;

            case "card":
                return <Square className="h-5 w-5 text-yellow-500" />;

            case "subst":
            case "substitution":
                return <RefreshCw className="h-5 w-5 text-blue-500" />;

            default:
                return <Clock3 className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="rounded-xl border bg-card p-5 transition-all duration-300 hover:bg-muted hover:shadow-md">

            <div className="flex items-start justify-between">

                <div className="flex gap-4">

                    {renderIcon()}

                    <div>

                        <p className="font-semibold">
                            {item.actor || item.team || "Match Event"}
                        </p>

                        <p className="text-sm text-muted-foreground">
                            {item.eventType}
                        </p>

                        <p className="mt-1">
                            {item.message}
                        </p>

                    </div>

                </div>

                <span className="text-lg font-bold">
                    {item.minute}
                </span>

            </div>

        </div>
    );
}