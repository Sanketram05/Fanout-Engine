import { Skeleton } from "@/components/ui/skeleton";

export default function MatchCardSkeleton() {
    return (
        <div className="rounded-xl border p-6 space-y-5">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
    );
}