
import { Button } from "@/components/ui/button";
import { Search, Upload } from "lucide-react";

const Hero = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find Your Perfect Job Match
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Upload your resume, discover your skill gaps, and get personalized recommendations to boost your career.
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="relative w-full md:w-1/2 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for jobs, skills, or companies"
              className="pl-10 pr-4 py-3 rounded-lg w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Upload className="mr-2 h-5 w-5" /> Upload Resume
          </Button>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8">
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
            <p className="text-2xl font-bold">1000+</p>
            <p className="text-sm">Available Jobs</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm">Companies</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
            <p className="text-2xl font-bold">250+</p>
            <p className="text-sm">Learning Resources</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
