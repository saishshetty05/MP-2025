
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Upload, Briefcase, BookOpen } from "lucide-react";

const JobSeekerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || (user && user.role !== "job-seeker")) {
      navigate("/auth");
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Job Seeker Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
              <p className="text-gray-600 mb-4">Update your profile to improve job matches and showcase your skills to employers.</p>
              <Button onClick={() => navigate("/profile")} className="w-full">
                View Profile
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resume</h2>
              <p className="text-gray-600 mb-4">Upload or update your resume to apply for jobs faster.</p>
              <Button className="w-full flex items-center justify-center gap-2">
                <Upload size={16} /> Upload Resume
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Job Search</h2>
              <p className="text-gray-600 mb-4">Browse available jobs and find your perfect match.</p>
              <Button onClick={() => navigate("/jobs")} className="w-full flex items-center justify-center gap-2">
                <Briefcase size={16} /> Browse Jobs
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Skill Development</h2>
              <p className="text-gray-600 mb-4">Explore resources to improve your skills and job prospects.</p>
              <Button onClick={() => navigate("/resources")} className="w-full flex items-center justify-center gap-2">
                <BookOpen size={16} /> Explore Resources
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Applications</h2>
              <p className="text-gray-600 mb-4">Track your job applications and interview status.</p>
              <Button variant="outline" className="w-full">
                View Applications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
