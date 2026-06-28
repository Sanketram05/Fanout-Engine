import {Router} from 'express';
import { createMatchSchema, listMatchesQuerySchema, updateScoreSchema, matchIdParamSchema } from '../validation/matches.js';
import {matches} from '../db/schema.js'
import {db} from "../db/db.js"
import { getMatchStatus } from '../utils/match-status.js';
import { desc,eq } from 'drizzle-orm';

export const matchRouter = Router();

const MAX_LIMIT = 100;

matchRouter.get('/', async(req,res) => {

    const parsed = listMatchesQuerySchema.safeParse(req.query);

    if(!parsed.success){
        return res.status(400).json({error : 'Invalid query.', details : parsed.error.issues});
    }

    const limit = Math.min(parsed.data.limit ?? 50 , MAX_LIMIT);

    try {
        const data = await db
        .select()
        .from(matches)
        .orderBy((desc(matches.createdAt)))
        .limit(limit)
        
        res.json({ data})
    } catch (e) {
        res.status(500).json({error : 'Failed to create match.'});
    }

});

matchRouter.post('/', async(req,res) => {
    const parsed = createMatchSchema.safeParse(req.body);
    if(!parsed.success){
        return res.status(400).json({error : 'Invalid payload.', details : parsed.error.issues});
    }
    const {data : {startTime, endTime, homeScore, awayScore}} = parsed


    try {
        
        const [event] = await db.insert(matches).values({
            ...parsed.data,
            startTime : new Date(startTime),
            endTime : new Date(endTime),
            homeScore: homeScore ?? 0,
            awayScore: awayScore ?? 0,
            status: getMatchStatus(startTime,endTime),
        }).returning();

        if(res.app.locals.broadcastMatchCreated){
            res.app.locals.broadcastMatchCreated(event);
        }

        res.status(201).json({data : event});

    } catch (e) {
        res.status(500).json({error : 'Failed to create match.'});
    }
})

matchRouter.get("/:id", async (req, res) => {
    const params = matchIdParamSchema.safeParse(req.params);

    if (!params.success) {
        return res.status(400).json({
            error: "Invalid match id",
            details: params.error.issues,
        });
    }

    try {
        const result = await db
            .select()
            .from(matches)
            .where(eq(matches.id, params.data.id))
            .limit(1);

        if (result.length === 0) {
            return res.status(404).json({
                error: "Match not found",
            });
        }

        return res.status(200).json({
            data: result[0],
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: "Failed to fetch match",
        });
    }
});
