
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import { JobType } from "@/data/jobs";
import { calculateSkillMatch } from "@/utils/skillMatching";
import { useToast } from "@/hooks/use-toast";

interface SkillMatchProps {
  job: JobType;
  userSkills?: string[];
}

const SkillMatch = ({ job, userSkills }: SkillMatchProps) => {
  const [resume, setResume] = useState<File | null>(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [missingSkills, setMissingSkills] = useState<string[]>([]);
  const [matchedSkills, setMatchedSkills] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Don't show anything if user has not set any skills (must be at least 1)
  if (!userSkills || userSkills.length === 0 || userSkills.every((s) => !s.trim())) {
    return (
      <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-4">Skill Match Analysis</h3>
        <p className="text-gray-600">
          Complete your skills section in your profile to analyze your fit for this job.
        </p>
      </div>
    );
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setResume(file);
      
      toast({
        title: "Resume Selected",
        description: `${file.name} is ready to be analyzed.`,
      });
    }
  };

  const handleUpload = () => {
    if (!resume) return;
    
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // For demo: calculate skill match using provided userSkills
      const { matchPercentage, missing, matched } = calculateSkillMatch(job, userSkills);
      setMatchScore(matchPercentage);
      setMissingSkills(missing);
      setMatchedSkills(matched);
      setResumeUploaded(true);
      setIsLoading(false);
      
      toast({
        title: "Resume Analyzed",
        description: `Your match score is ${matchPercentage}%`,
      });
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
      <h3 className="text-xl font-semibold mb-4">Skill Match Analysis</h3>
      
      {!resumeUploaded ? (
        <div className="space-y-4">
          <p className="text-gray-600">
            Upload your resume to see how well your skills match this job and get personalized recommendations.
          </p>
          
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-primary hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => document.getElementById('resume-upload')?.click()}>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">
              PDF, DOCX or TXT file (max 5MB)
            </p>
            <input 
              type="file" 
              accept=".pdf,.docx,.txt" 
              onChange={handleFileChange}
              className="hidden" 
              id="resume-upload"
            />
            <label htmlFor="resume-upload">
              <Button 
                variant="outline" 
                className="mt-4" 
              >
                Browse Files
              </Button>
            </label>
          </div>
          
          {resume && (
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded">
              <span className="text-sm text-gray-700">{resume.name}</span>
              <Button 
                onClick={handleUpload}
                disabled={isLoading}
              >
                {isLoading ? "Analyzing..." : "Analyze Resume"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {matchScore !== null && (
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Your Match Score</span>
                <span className="text-sm font-medium">{matchScore}%</span>
              </div>
              <div className="skill-match-progress">
                <Progress 
                  value={matchScore} 
                  className={`h-3 ${
                    matchScore >= 80 ? 'bg-green-500' :
                    matchScore >= 60 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
              </div>
            </div>
          )}
          
          {matchedSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Matched Skills ({matchedSkills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchedSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {missingSkills.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                <AlertCircle className="h-4 w-4 text-red-500" />
                Missing Skills ({missingSkills.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {missingSkills.length > 0 && (
            <Alert className="bg-blue-50 text-blue-800 border-blue-200">
              <AlertDescription>
                We've found courses and resources that can help you learn the missing skills. 
                Check out the <a href="/resources" className="font-medium underline">recommended resources</a>.
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            variant="outline" 
            onClick={() => setResumeUploaded(false)}
            className="w-full"
          >
            Upload a Different Resume
          </Button>
        </div>
      )}
    </div>
  );
};

export default SkillMatch;
