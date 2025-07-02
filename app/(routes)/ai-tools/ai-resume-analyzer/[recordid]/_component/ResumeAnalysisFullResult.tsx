import React from "react";
import { Button } from "@/components/ui/button";
import ResumeUploadDialogue from "@/app/(routes)/dashboard/_components/ResumeUploadDialogue";

// Section data interface
export interface SectionDetail {
  score: number;
  comment: string;
  tips_for_improvement: string[];
  "what's_good": string[];
  needs_improvement: string[];
}

// Resume analysis structure interface
export interface ResumeAnalysisData {
  overall_score: number;
  overall_feedback: string;
  summary_comment: string;
  sections: {
    contact_info: SectionDetail;
    experience: SectionDetail;
    education: SectionDetail;
    skills: SectionDetail;
  };
  tips_for_improvement: string[];
  "what's_good": string[];
  needs_improvement: string[];
}

// Component props
interface Props {
  data: ResumeAnalysisData;
}

// Main component
const ResumeAnalysisPage: React.FC<Props> = ({ data }) => {
  const {
    overall_score,
    overall_feedback,
    summary_comment,
    sections,
    tips_for_improvement,
    "what's_good": whatsGood,
    needs_improvement,
  } = data;

  // Get Tailwind color class based on score
  const getSectionColor = (score: number): string => {
    if (score >= 85) return "bg-green-50 text-green-600";
    if (score >= 70) return "bg-yellow-50 text-yellow-500";
    return "bg-red-50 text-red-500";
  };
  const [openResumeUpload, setOpenResumeUpload] = React.useState(false);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <ResumeUploadDialogue openResumeUpload={openResumeUpload} setOpenResumeUpload={()=>setOpenResumeUpload(false)}/>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-blue-800">AI Analysis Results</h2>
        <Button onClick={()=>{setOpenResumeUpload(true)}}>Re-analyze</Button>
      </div>

      {/* Overall Score */}
      <div className="bg-gray-50 border rounded-lg p-6 shadow-sm">
        <p className="text-lg font-semibold text-gray-700">Overall Score</p>
        <div className="flex items-center justify-between mt-2 mb-1">
          <h1 className="text-5xl font-bold text-blue-600">
            {overall_score}
            <span className="text-2xl text-gray-700">/100</span>
          </h1>
          <span className="text-green-600 font-semibold text-lg">{overall_feedback}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${overall_score}%` }}
          ></div>
        </div>
        <p className="mt-2 text-gray-600 text-sm">{summary_comment}</p>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(sections).map(([key, section]) => {
          const [bgClass, textClass] = getSectionColor(section.score).split(" ");
          return (
            <div key={key} className={`border rounded-lg p-4 shadow-sm ${bgClass}`}>
              <p className="text-sm text-gray-600 font-semibold capitalize">{key.replace("_", " ")}</p>
              <h2 className={`text-3xl font-bold ${textClass}`}>{section.score}%</h2>
              <p className="text-sm text-gray-700 mt-1">{section.comment}</p>
              <ul className="mt-2 text-sm list-disc list-inside text-gray-700 space-y-1">
                {section["what's_good"].map((good, idx) => (
                  <li key={`good-${idx}`}>✅ {good}</li>
                ))}
                {section.needs_improvement.map((bad, idx) => (
                  <li key={`bad-${idx}`}>⚠️ {bad}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Tips for Improvement */}
      <div className="border rounded-lg p-6 shadow-sm bg-white space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">Tips for Improvement</h3>
        <div className="space-y-3">
          {tips_for_improvement.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-3 h-3 mt-2 rounded-full bg-blue-200" />
              <p className="text-sm text-gray-600">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Lists */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-5 bg-green-50">
          <h4 className="font-semibold text-gray-800 mb-2">What's Good</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {whatsGood.map((item, idx) => (
              <li key={`good-summary-${idx}`}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="border rounded-lg p-5 bg-red-50">
          <h4 className="font-semibold text-gray-800 mb-2">Needs Improvement</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {needs_improvement.map((item, idx) => (
              <li key={`bad-summary-${idx}`}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-xl p-6 text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
        <h3 className="text-xl font-semibold mb-2">Ready to refine your resume? 💪</h3>
        <p className="text-sm mb-4">Make your application stand out with our premium insights and features.</p>
        <Button className="bg-white text-blue-600 hover:bg-blue-100">Upgrade to Premium</Button>
      </div>
    </div>
  );
};

export default ResumeAnalysisPage;
