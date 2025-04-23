
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Upload, Briefcase, BookOpen, User, LogIn, LogOut, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    navigate("/");
  };

  const handleUploadClick = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in or sign up to upload your resume.",
      });
      navigate("/auth");
    } else if (user?.role === "job-seeker") {
      navigate("/profile");
    } else {
      navigate("/recruiter/post-job");
    }
  };

  const getDashboardLink = () => {
    if (!isAuthenticated) return "/auth";
    return user?.role === "recruiter" ? "/recruiter/dashboard" : "/job-seeker/dashboard";
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-4 md:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-2xl text-primary">SkillSync</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-primary font-medium">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-primary font-medium">Jobs</Link>
          <Link to="/resources" className="text-gray-700 hover:text-primary font-medium">Resources</Link>
          
          {isAuthenticated && (
            <Link 
              to={getDashboardLink()} 
              className="text-gray-700 hover:text-primary font-medium"
            >
              Dashboard
            </Link>
          )}
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-primary font-medium">Profile</Link>
              <Button 
                onClick={handleLogout} 
                variant="outline"
                className="bg-white hover:bg-gray-100 text-primary"
              >
                <LogOut size={16} className="mr-2" /> Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="bg-white hover:bg-gray-100 text-primary">
                <LogIn size={16} className="mr-2" /> Login
              </Button>
            </Link>
          )}
          
          <Button className="bg-primary hover:bg-primary/90" onClick={handleUploadClick}>
            {user?.role === "recruiter" ? (
              <>
                <PlusCircle size={16} className="mr-2" /> Post Job
              </>
            ) : (
              <>
                <Upload size={16} className="mr-2" /> Upload Resume
              </>
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-50 md:hidden">
            <div className="flex flex-col p-4 space-y-4">
              <Link 
                to="/" 
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/jobs" 
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <Briefcase size={18} className="mr-2" /> Jobs
              </Link>
              <Link 
                to="/resources" 
                className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen size={18} className="mr-2" /> Resources
              </Link>
              
              {isAuthenticated && (
                <Link 
                  to={getDashboardLink()} 
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
              
              {isAuthenticated && (
                <Link 
                  to="/profile" 
                  className="flex items-center p-2 text-gray-700 hover:bg-gray-100 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User size={18} className="mr-2" /> Profile
                </Link>
              )}
              
              {isAuthenticated ? (
                <Button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }} 
                  variant="outline"
                  className="w-full justify-start"
                >
                  <LogOut size={18} className="mr-2" /> Logout
                </Button>
              ) : (
                <Link 
                  to="/auth"
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button 
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <LogIn size={18} className="mr-2" /> Login
                  </Button>
                </Link>
              )}
              
              <Button 
                className="bg-primary hover:bg-primary/90 w-full justify-start"
                onClick={() => {
                  handleUploadClick();
                  setIsMenuOpen(false);
                }}
              >
                {user?.role === "recruiter" ? (
                  <>
                    <PlusCircle size={18} className="mr-2" /> Post Job
                  </>
                ) : (
                  <>
                    <Upload size={18} className="mr-2" /> Upload Resume
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
