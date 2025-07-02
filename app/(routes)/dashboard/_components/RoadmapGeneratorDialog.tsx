import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
const RoadmapGeneratorDialog = ({openRoadmapDialog,setOpenRoadmapDialog}:any) => {
  
  const [userInput,setUserInput] = useState<string>();
  const [loading,setLoading] = useState(false);
  const router = useRouter();
  const GenerateRoadmap=async()=>{
    const roadmapId= uuidv4();
    setLoading(true);
    try{
      const result = await axios.post('/api/ai-roadmap-agent',{
        roadmapId:roadmapId,
        userInput:userInput
      })
      // console.log(result.data)
      router.push('/ai-tools/ai-roadmap-agent/'+ roadmapId)
      setLoading(false);
    }
    catch(e){
      setLoading(false);
      console.log("Error")
    }
  }
  return (
    <Dialog open={openRoadmapDialog} onOpenChange={setOpenRoadmapDialog}>
  {/* <DialogTrigger>Open</DialogTrigger> */}
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Enter Position/Skillls to Generate Roadmap</DialogTitle>
      <DialogDescription asChild>
        <div className='mt-5'>
            <Input placeholder='e.g Full Stack Developer' onChange={(event)=>{setUserInput(event.target.value)}} />
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <Button variant={'outline'}>Cancel</Button>
            <Button onClick={GenerateRoadmap} disabled={loading || !userInput}>
             {loading?<Loader2 className='animate-spin'/>:'Generate Roadmap'}
            </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
  )
}

export default RoadmapGeneratorDialog