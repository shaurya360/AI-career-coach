
import { NextRequest, NextResponse } from "next/server";
import {db} from '../../../configs/db'
import {HistoryTable} from '../../../configs/schema'
import {currentUser} from '@clerk/nextjs/server'
import { eq } from "drizzle-orm";
export async function POST(req:any){
    const {content,recordId,aiAgentType } = await req.json();
    const user = await currentUser();
    try{
        const response = await db.insert(HistoryTable).values({
            recordId:recordId,
            content:content,
            userEmail:user?.primaryEmailAddress?.emailAddress,
            createdAt:(new Date()).toString(),
            aiAgentType:aiAgentType
        })
        return NextResponse.json(response)
    }
    catch(e){
        return NextResponse.json(e);
    }
}

export async function PUT(req:any){
    const {content,recordId } = await req.json();


    try{

        const response = await db.update(HistoryTable).set({
            
            content:content,
            
        }).where(eq(HistoryTable.recordId,recordId))
       
        return NextResponse.json(response)
    }
    catch(e){
        return NextResponse.json(e);
    }
}

export async function GET(req:any){
    const {searchParams} = new URL(req.url);
    const recordId = searchParams.get('recordId');
    const user = await currentUser();
    try{
        
        if(recordId) {
            const response = await db.select().from(HistoryTable).where(eq(HistoryTable.recordId,recordId))
        
        return NextResponse.json(response[0])
        }
        else{
        // @ts-ignore
        const response = await db.select().from(HistoryTable).where(eq(HistoryTable.userEmail,user?.primaryEmailAddress?.emailAddress))
        return NextResponse.json(response)
    }
        
    }
    
    catch(e){
        return NextResponse.json(e);
    }
}