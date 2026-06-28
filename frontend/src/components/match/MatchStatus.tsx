import { Badge } from "@/components/ui/badge";

export default function MatchStatus({
    status,
}: {
    status: string;
}) {

    if (status === "live") {

        return (

            <Badge className="bg-red-600 hover:bg-red-600">

                <span className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white" />

                LIVE

            </Badge>

        );
    }

    if (status === "scheduled") {

        return (

            <Badge className="bg-yellow-500 hover:bg-yellow-500">

                SCHEDULED

            </Badge>

        );
    }

    return (

        <Badge className="bg-green-600 hover:bg-green-600">

            FINISHED

        </Badge>

    );
}