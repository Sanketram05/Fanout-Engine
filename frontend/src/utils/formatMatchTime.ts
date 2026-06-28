import { format } from "date-fns";

export function formatMatchTime(date: string) {
    return format(new Date(date), "dd MMM • hh:mm a");
}