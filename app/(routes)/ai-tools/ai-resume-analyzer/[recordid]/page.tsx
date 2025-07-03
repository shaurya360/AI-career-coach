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
  <div className="col-span-1 md:col-span-3 sticky top-4"> {/* Changed col-span-3 to col-span-1 for mobile, md:col-span-3 for medium screens and up */}
  <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-3 text-center md:text-left">Resume Preview</h2> {/* Adjusted text size for responsiveness and added text alignment */}
  <div className="relative" style={{ paddingBottom: '141.42%', height: 0, overflow: 'hidden' }}> {/* Aspect ratio container for responsive height */}
    <iframe
      src={pdfUrl + "#toolbar=0&navpanes=0&scrollbar=1"}
      // Removed fixed height. The height will be controlled by the aspect ratio container.
      width="100%"
      // height="1000" // Removed this fixed height
      className="absolute top-0 left-0 w-full h-full rounded-md shadow-md" // Absolute positioning within the relative container
      style={{
        border: "none",
        overflow: "auto",
        display: "block"
      }}
    />
  </div>
</div>
</div>
  )
}

export default AiResumeAnalyzer