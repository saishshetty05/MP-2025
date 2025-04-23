
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User, ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const JobsList = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [expandedJobs, setExpandedJobs] = useState<Record<string, boolean>>({});
  const { user } = useAuth();

  useEffect(() => {
    try {
      // Load jobs
      const savedJobs = localStorage.getItem("jobs");
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        setJobs(parsedJobs);
      }

      // Load applications
      const savedApplications = localStorage.getItem("applications");
      if (savedApplications) {
        const parsedApplications = JSON.parse(savedApplications);
        setApplications(parsedApplications);
      }
    } catch (error) {
      console.error("Error loading jobs or applications:", error);
    }
  }, []);

  const toggleJobExpand = (jobId: string) => {
    setExpandedJobs(prev => ({
      ...prev,
      [jobId]: !prev[jobId]
    }));
  };

  const getJobApplications = (jobId: string) => {
    return applications.filter(app => app.jobId === jobId);
  };

  if (jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <FileText className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs posted</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by posting your first job.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => {
        const jobApplications = getJobApplications(job.id);
        const hasApplications = jobApplications.length > 0;
        const isExpanded = expandedJobs[job.id] || false;
        
        return (
          <div key={job.id} className="border rounded-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-white">
              <div>
                <h4 className="font-medium">{job.title}</h4>
                <p className="text-sm text-gray-500">{job.location} • {job.type}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {job.skills.slice(0, 3).map((skill: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {skill}
                    </Badge>
                  ))}
                  {job.skills.length > 3 && (
                    <Badge variant="outline" className="bg-gray-50">
                      +{job.skills.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {hasApplications && (
                  <Badge className="bg-primary">
                    {jobApplications.length} {jobApplications.length === 1 ? "Applicant" : "Applicants"}
                  </Badge>
                )}
                <Button variant="outline" size="sm">Edit</Button>
                {hasApplications && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1" 
                    onClick={() => toggleJobExpand(job.id)}
                  >
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </Button>
                )}
              </div>
            </div>
            
            {/* Applications section (expandable) */}
            {hasApplications && isExpanded && (
              <div className="p-4 bg-gray-50 border-t">
                <h5 className="text-sm font-medium mb-3">Applications</h5>
                <div className="space-y-2">
                  {jobApplications.map(application => (
                    <div key={application.id} className="p-3 bg-white rounded border flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <User size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{application.userId}</p>
                          <p className="text-xs text-gray-500">Applied {new Date(application.appliedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div>
                        <Badge className={
                          application.status === "pending" ? "bg-yellow-500" :
                          application.status === "accepted" ? "bg-green-500" :
                          "bg-red-500"
                        }>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
