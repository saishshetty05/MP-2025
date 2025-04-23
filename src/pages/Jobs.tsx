import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import SkillMatch from "@/components/SkillMatch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Briefcase, 
  MapPin, 
  DollarSign,
  Clock,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import { jobs as defaultJobs } from "@/data/jobs";
import { getSkillMatchScores } from "@/utils/skillMatching";
import { JobType } from "@/data/jobs";

const Jobs = () => {
  const [selectedJob, setSelectedJob] = useState<JobType | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [allJobs, setAllJobs] = useState<JobType[]>([]);
  const [userSkills, setUserSkills] = useState<string[]>([]);

  useEffect(() => {
    const savedSkills = localStorage.getItem("jobseeker_skills");
    setUserSkills(savedSkills ? JSON.parse(savedSkills) : []);
  }, []);

  useEffect(() => {
    try {
      const savedJobs = localStorage.getItem("jobs");
      let combinedJobs = [...defaultJobs];
      
      if (savedJobs) {
        const parsedJobs = JSON.parse(savedJobs);
        const formattedCustomJobs = parsedJobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.company || "Unknown Company",
          location: job.location || "Remote",
          salary: job.salary || "Competitive",
          type: job.type || "Full-time",
          description: job.description || "",
          postedDays: 0,
          skills: Array.isArray(job.skills) ? job.skills : job.skills.split(',').map((s: string) => s.trim())
        }));
        
        combinedJobs = [...formattedCustomJobs, ...combinedJobs];
      }
      
      setAllJobs(combinedJobs);
      if (combinedJobs.length > 0 && !selectedJob) {
        setSelectedJob(combinedJobs[0]);
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      setAllJobs(defaultJobs);
      if (defaultJobs.length > 0) {
        setSelectedJob(defaultJobs[0]);
      }
    }
  }, []);

  const matchScores = getSkillMatchScores(allJobs, userSkills);

  const filteredJobs = allJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleApplyNow = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr || !selectedJob) return;
    const user = JSON.parse(userStr);
    const applications: any[] = JSON.parse(localStorage.getItem("applications") || "[]");

    const alreadyApplied = applications.some(
      (app) => app.userId === user.id && app.jobId === selectedJob.id
    );
    if (alreadyApplied) {
      window.alert("You have already applied for this job!");
      return;
    }

    const application = {
      userId: user.id,
      userName: user.name,
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      company: selectedJob.company,
      appliedAt: Date.now()
    };
    localStorage.setItem(
      "applications",
      JSON.stringify([...applications, application])
    );
    window.alert("Application submitted!");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="bg-primary text-white py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Job Match</h1>
          <p className="mb-6">Discover opportunities aligned with your skills and career goals</p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search jobs, skills, or companies"
              className="pl-10 pr-4 py-6 rounded-lg w-full text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="w-full flex justify-between items-center"
            >
              <span className="flex items-center">
                <Filter size={16} className="mr-2" /> Filters
              </span>
              <SlidersHorizontal size={16} />
            </Button>
          </div>
          
          <div className={`${filtersVisible ? 'block' : 'hidden'} md:block w-full md:w-64 space-y-6`}>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Job Type</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="full-time" />
                  <label htmlFor="full-time" className="ml-2 text-sm">Full-time</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="part-time" />
                  <label htmlFor="part-time" className="ml-2 text-sm">Part-time</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="contract" />
                  <label htmlFor="contract" className="ml-2 text-sm">Contract</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="remote" />
                  <label htmlFor="remote" className="ml-2 text-sm">Remote</label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Experience Level</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="entry" />
                  <label htmlFor="entry" className="ml-2 text-sm">Entry Level</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mid" />
                  <label htmlFor="mid" className="ml-2 text-sm">Mid Level</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="senior" />
                  <label htmlFor="senior" className="ml-2 text-sm">Senior Level</label>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Skills</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="javascript" />
                  <label htmlFor="javascript" className="ml-2 text-sm">JavaScript</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="react" />
                  <label htmlFor="react" className="ml-2 text-sm">React</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="python" />
                  <label htmlFor="python" className="ml-2 text-sm">Python</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="sql" />
                  <label htmlFor="sql" className="ml-2 text-sm">SQL</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="aws" />
                  <label htmlFor="aws" className="ml-2 text-sm">AWS</label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {filteredJobs.length} Jobs Available
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  onClick={() => setSelectedJob(job)}
                  className={`cursor-pointer transition-all ${selectedJob && selectedJob.id === job.id ? 'ring-2 ring-primary' : ''}`}
                >
                  <JobCard job={job} matchScore={matchScores[job.id]} />
                </div>
              ))}
              
              {filteredJobs.length === 0 && (
                <div className="col-span-full flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow">
                  <Briefcase size={48} className="text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                  <p className="text-gray-500 text-center">
                    Try adjusting your search or filters to see more results.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-full md:w-80 space-y-6">
            {selectedJob && <SkillMatch job={selectedJob} userSkills={userSkills} />}
            
            {selectedJob && (
              <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button className="w-full" onClick={handleApplyNow}>Apply Now</Button>
                  <Button variant="outline" className="w-full">Save Job</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
