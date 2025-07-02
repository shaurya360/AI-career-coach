"use client"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import RoadmapCanvas from '../_components/RoadmapCanvas';
import RoadmapGeneratorDialog from '@/app/(routes)/dashboard/_components/RoadmapGeneratorDialog';

const RoadMapGeneratorAgent = () => {
  const {roadmapid} = useParams();
  const [roadmap, setRoadmap] = React.useState<any>();
  useEffect(()=>{
    roadmapid&&GetRoadmapRecord();
  },[roadmapid])
  const [openRoadmapDialog,setOpenRoadmapDialog] = React.useState(false);
  const GetRoadmapRecord = async() =>{
        const result = await axios.get('/api/history/?recordId='+roadmapid)
        // console.log(result.data);
        setRoadmap(result.data?.content);
        console.log(roadmap)
        
    }
    console.log(roadmap)
  return (
    <div className='grid gird-cols-1 md:grid-cols-3 gap-5 '>
      <div className='border rounded-xl p-5'>
        <h2 className='font-bold text-2xl'>{roadmap?.roadmapTitle}</h2>
        <p className='mt-3 text-gray-500'><strong>Description:</strong><br></br>{roadmap?.description}</p>
        <h2 className='mt-5 font-medium text-blue-600'>Duration:{roadmap?.duration}</h2>
        <Button className='mt-5 w-full' onClick={()=>setOpenRoadmapDialog(true)}>Create Another</Button>
      </div>
      <div className='md:col-span-2 w-full h-[80vh]'>
        {roadmap && <RoadmapCanvas initialNodes={roadmap?.initialNodes} initialEdges={roadmap?.initialEdges}/>}
      </div>
      <RoadmapGeneratorDialog openRoadmapDialog={openRoadmapDialog} setOpenRoadmapDialog={()=>setOpenRoadmapDialog(false)}/>
    </div>
  )
}

export default RoadMapGeneratorAgent