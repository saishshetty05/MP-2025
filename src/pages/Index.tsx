
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JobCard from "@/components/JobCard";
import ResourceCard from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Star, Briefcase, Upload } from "lucide-react";
import { jobs } from "@/data/jobs";
import { resources } from "@/data/resources";
import { getSkillMatchScores } from "@/utils/skillMatching";

const Index = () => {
  // Get featured jobs and resources
  const featuredJobs = jobs.slice(0, 3);
  const featuredResources = resources.slice(0, 3);
  
  // For demo purposes, simulate match scores
  const matchScores = getSkillMatchScores(featuredJobs);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      
      {/* Featured Jobs Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Featured Jobs</h2>
              <p className="text-gray-600">Discover opportunities that match your skills</p>
            </div>
            <Link to="/jobs">
              <Button variant="ghost" className="flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map(job => (
              <JobCard 
                key={job.id} 
                job={job} 
                matchScore={matchScores[job.id]}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold">How SkillSync Works</h2>
            <p className="text-gray-600 mt-2">Get matched to jobs and resources in just a few steps</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Upload className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Upload Your Resume</h3>
              <p className="text-gray-600">Upload your resume and our AI will analyze your skills and experience</p>
            </div>
            
            <div className="text-center p-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Get Matched</h3>
              <p className="text-gray-600">Receive personalized job matches with detailed skill gap analysis</p>
            </div>
            
            <div className="text-center p-6">
              <div className="rounded-full bg-primary/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Apply and Upskill</h3>
              <p className="text-gray-600">Apply to matching jobs and access resources to improve your skills</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Resources Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">Learning Resources</h2>
              <p className="text-gray-600">Upskill with these recommended courses and resources</p>
            </div>
            <Link to="/resources">
              <Button variant="ghost" className="flex items-center">
                View All <ChevronRight size={16} className="ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to advance your career?</h2>
          <p className="text-white/90 mb-8 max-w-lg mx-auto">
            Upload your resume now to discover job matches and get personalized recommendations to bridge your skill gaps.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            Upload Resume Now
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">SkillSync</h3>
              <p className="text-gray-400">
                Your career companion for finding jobs and bridging skill gaps.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link to="/jobs" className="text-gray-400 hover:text-white">Jobs</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
                <li><Link to="/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Courses</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Articles</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Videos</Link></li>
                <li><Link to="/resources" className="text-gray-400 hover:text-white">Tools</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@skillsync.com</li>
                <li className="text-gray-400">1-800-SKILL-UP</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SkillSync. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
