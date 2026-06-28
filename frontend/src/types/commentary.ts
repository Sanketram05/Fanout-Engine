export interface Commentary {

    id:number;

    matchId:number;

    minute:number;

    sequence:number;

    period:string;

    eventType:string;

    actor:string;

    team:string;

    message:string;

    metadata:string;

    tags:string[];

    createdAt:string;

}