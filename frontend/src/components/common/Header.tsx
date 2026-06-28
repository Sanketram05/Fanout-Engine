"use client";

import { Trophy } from "lucide-react";

import ThemeToggle from "./ThemeToggle";

export default function Header() {

    return (

        <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-xl">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-green-600 p-3 text-white">

                        <Trophy />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold">

                            FanOut-Engine

                        </h1>

                        <p className="text-sm text-muted-foreground">

                            Live Football Dashboard

                        </p>

                    </div>

                </div>

                <ThemeToggle />

            </div>

        </header>

    );

}