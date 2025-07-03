"use client"
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { helloWorld } from "@/inngest/functions";
import { v4 as uuidv4 } from 'uuid'
import axios from "axios";
import { useRouter } from "next/navigation";


const ResumeUploadDialogue = ({openResumeUpload,setOpenResumeUpload}:any) => {
    const [file,setFile] = useState<any>();
    const [loading,setLoading] = useState(false);
    const router = useRouter();
const onFileChange=(event:any)=>{
    const file = event.target.files?.[0];
    
    if (file){
        // console.log(file.name)
        setFile(file);
    }
}
const onUpload=async ()=>{
    setLoading(true);
    const recordId = uuidv4();
    const formData = new FormData();
    formData.append('recordId', recordId);
    formData.append('resumeFile', file);
    // formData.append('aiAgentType','/ai-tools/ai-resume-analyzer')
    const result = await axios.post('/api/ai-resume-agent',formData)
    // console.log(result.data)
    setLoading(false);
    router.push('/ai-tools/ai-resume-analyzer/'+recordId)
    setOpenResumeUpload(false);

}

  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeUpload}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your Resume PDF file</DialogTitle>
          <DialogDescription>
            <div>
                <label htmlFor="resumeupload" className="flex items-center flex-col justify-center p-7 border border-dashed rounded-xl hover:bg-slate-200 cursor-pointer">
                    <File className="h-10 w-10"/>
                    {file?<h2 className="mt-3 text-blue-700">{file.name}</h2>:<h2 className="mt-3">Click Here to Upload Pdf File</h2>}
                </label>
                <input type="file" id="resumeupload" className="hidden" accept="application/pdf" onChange={onFileChange}/>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
            <Button variant={'outline'} onClick={setOpenResumeUpload}>Cancel</Button>
            <Button disabled={!file || loading} onClick={onUpload}>
            {loading?<Loader2Icon className="animate-spin"/>:'Upload'}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialogue;
