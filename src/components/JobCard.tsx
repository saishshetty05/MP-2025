
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign 
} from "lucide-react";
import { JobType } from "@/data/jobs";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface JobCardProps {
  job: JobType;
  matchScore?: number;
}

const JobCard = ({ job, matchScore }: JobCardProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isApplied, setIsApplied] = useState(() => {
    // Check if user has already applied to this job
    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    return applications.some((app: any) => app.jobId === job.id && app.userId === user?.id);
  });

  const handleApply = () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to apply for jobs",
        variant: "destructive"
      });
      return;
    }

    if (user.role !== "job-seeker") {
      toast({
        title: "Not Authorized",
        description: "Only job seekers can apply for jobs",
        variant: "destructive"
      });
      return;
    }

    // Save application to localStorage
    const newApplication = {
      id: Math.random().toString(36).substring(2, 15),
      jobId: job.id,
      userId: user.id,
      jobTitle: job.title,
      company: job.company,
      appliedDate: new Date().toISOString(),
      status: "pending"
    };

    const applications = JSON.parse(localStorage.getItem("applications") || "[]");
    applications.push(newApplication);
    localStorage.setItem("applications", JSON.stringify(applications));
    
    // Update UI
    setIsApplied(true);
    
    // Show success message
    toast({
      title: "Application Submitted!",
      description: `You've successfully applied to ${job.title} at ${job.company}.`,
    });
  };

  return (
    <div className="job-card bg-white rounded-lg shadow-md p-6 border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
            <Briefcase className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-gray-600">{job.company}</p>
          </div>
        </div>
        
        {matchScore !== undefined && (
          <Badge className={`text-white ${matchScore >= 80 ? 'bg-green-500' : matchScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}>
            {matchScore}% Match
          </Badge>
        )}
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin size={14} className="mr-1" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <DollarSign size={14} className="mr-1" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Briefcase size={14} className="mr-1" />
          <span>{job.type}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>Posted {job.postedDays} days ago</span>
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2">
        {job.skills.slice(0, 4).map((skill, index) => (
          <Badge key={index} variant="outline" className="bg-gray-50">
            {skill}
          </Badge>
        ))}
        {job.skills.length > 4 && (
          <Badge variant="outline" className="bg-gray-50">
            +{job.skills.length - 4} more
          </Badge>
        )}
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button 
          className="bg-primary hover:bg-primary/90" 
          disabled={isApplied}
          onClick={handleApply}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
    </div>
  );
};

export default JobCard;
