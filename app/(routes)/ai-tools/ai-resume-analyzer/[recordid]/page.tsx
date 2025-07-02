"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import ResumeAnalysisPage, { ResumeAnalysisData } from './_component/ResumeAnalysisFullResult';
import { Button } from '@/components/ui/button';

const AiResumeAnalyzer = () => {
  const {recordid} = useParams();
  const [pdfUrl, setPdfUrl] = React.useState();
  const [aiReport, setAiReport] = React.useState<ResumeAnalysisData | undefined>();
  useEffect(()=>{
    recordid && GetResumeAnalyzerRecord()
    // console.log(aiReport);
  },[recordid])
  const GetResumeAnalyzerRecord = async() =>{
        const result = await axios.get('/api/history/?recordId='+recordid)
        // console.log(result.data);
        setPdfUrl(result.data?.metaData);
        setAiReport(result.data?.content);
        
    }
    // console.log(aiReport);
  return (
    // <div className='grid lg:grid-cols-5 grid-cols-1'>
    //   <div className="col-span-2">
    //   {aiReport ? (
    //     <ResumeAnalysisPage data={aiReport} />
    //   ) : (
    //     <p className="text-gray-600 p-4">Loading resume analysis...</p>
    //   )}
    // </div>
    //   <div className='col-span-3'>
    //     <h2 className='font-bold text-4xl mb-3'>Resume Preview</h2>
    //     <iframe src={pdfUrl+'#toolbar=0&&navpanes=0&&scrollbar=0'} width={'800'} height={1200} className='min-w-lg'style={{border:'none'}}></iframe>
    //   </div>
      
    // </div>
    <div className="grid lg:grid-cols-5 grid-cols-1 gap-4 p-4">
  {/* Left: Resume Analysis */}
  <div className="col-span-2 overflow-y-auto h-[calc(100vh-40px)] pr-4">
    {aiReport ? (
      <ResumeAnalysisPage data={aiReport} />
    ) : (
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center space-y-2 text-gray-500">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span>Analyzing resume...</span>
        </div>
      </div>
    )}
  </div>

  {/* Right: Resume Preview */}
  <div className="col-span-3 sticky top-4">
  <h2 className="font-bold text-4xl mb-3">Resume Preview</h2>
  <iframe
    src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=1"}
    width="100%"
    height="1000"
    className="w-full rounded-md shadow-md"
    style={{
      border: "none",
      overflow: "auto",     // enable scroll only inside iframe
      display: "block"
    }}
  />
</div>
</div>
  )
}

export default AiResumeAnalyzer