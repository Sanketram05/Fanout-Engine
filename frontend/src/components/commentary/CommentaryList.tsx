"use client";

import { Commentary } from "@/types/commentary";

import CommentaryItem from "./CommentaryItem";

type Props = {
    commentary: Commentary[];
};

export default function CommentaryList({
    commentary,
}: Props) {

    return (

        <div className="space-y-4">

            {commentary.map((item) => (

                <CommentaryItem
                    key={item.id}
                    item={item}
                />

            ))}

        </div>

    );

}