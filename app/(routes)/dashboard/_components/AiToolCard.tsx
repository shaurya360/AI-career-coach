"use client"
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import ResumeUploadDialogue from './ResumeUploadDialogue'

import RoadmapGeneratorDialog from './RoadmapGeneratorDialog'
interface TOOL{
    name:string,
    desc:string,
    icon:string,
    button:string,
    path:string
}

type AiToolProps={
    tool:TOOL
}

const AiToolCard = ({tool}:AiToolProps) => {
    const id = uuidv4();
    const {user} = useUser();
    const router = useRouter();
    const [openResumeUpload, setOpenResumeUpload] = React.useState(false);
    const [openRoadmapDialog,setOpenRoadmapDialog] = React.useState(false);
    const onClickButton=async()=>{
        if(tool.name=='AI Resume Analyzer'){
            setOpenResumeUpload(true);
            return;
        }
        if(tool.name=='Career Roadmap Generator'){
            setOpenRoadmapDialog(true);
            return;
        }
        const result = await axios.post('/api/history',{
            recordId:id,
            content:[],
            aiAgentType:tool.path
        })
        console.log(result);
        router.push(tool.path+'/'+id);
    }

  return (
    <div className='p-3 border rounded-lg'>
        <Image src={tool.icon} width={40} height={40} alt={tool.name}/>
        <h2 className='font-bold mt-2'>{tool.name}</h2>
        <p className='text-gray-400'>{tool.desc}</p>
        <Button className='w-full mt-3' onClick={onClickButton}>{tool.button }</Button>
        <ResumeUploadDialogue openResumeUpload={openResumeUpload} setOpenResumeUpload={setOpenResumeUpload} />
        <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog} setOpenRoadmapDialog={()=>setOpenRoadmapDialog(false)}/>
    </div>
  )
}

export default AiToolCard