import { inngest } from "@/inngest/client";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req:any) {
    const {userInput} = await req.json();
    const resultIds = await inngest.send({
        name:'AiCareerAgent',
        data:{
            userInput:userInput
        }
    });
    const runId = resultIds?.ids[0];
    // console.log(runId)
    let runStatus;
    while (true) {
        runStatus = await getRuns(runId);
        // console.log(runStatus)
        // if (runStatus.status === 'success') {
        //     break;
        
        if (runStatus?.data[0]?.status === 'Completed') {
        break;
    }
        await new Promise(resolve=>setTimeout(resolve,500))
    }
    return NextResponse.json(runStatus.data?.[0].output?.output[0])
    
}

async function getRuns(runId:string){
    // console.log('hi');
    const response = await axios.get(process.env.INNGEST_SERVER_HOST+'/v1/events/'+runId+'/runs',
        {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    }
    });
    return response.data;
}
