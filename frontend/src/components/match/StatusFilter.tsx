"use client";

import { Button } from "@/components/ui/button";

const statuses = [
  "all",
  "live",
  "scheduled",
  "finished",
] as const;

type StatusFilterProps = {
  selected: string;
  onChange: (status: string) => void;
};

export default function StatusFilter({
  selected,
  onChange,
}: StatusFilterProps) {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      {statuses.map((status) => (
        <Button
          key={status}
          variant={selected === status ? "default" : "outline"}
          onClick={() => onChange(status)}
        >
          {status.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}