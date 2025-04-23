
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building, MapPin, Globe, Users, Plus, User } from "lucide-react";
import { JobsList } from "./JobsList";
import { Badge } from "@/components/ui/badge";

export const RecruiterProfile = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("company");
  const [applications, setApplications] = useState<any[]>([]);
  
  // Load company information from localStorage
  const loadCompanyInfo = useCallback(() => {
    try {
      const savedCompanyInfo = localStorage.getItem("companyInfo");
      if (savedCompanyInfo) {
        const parsedInfo = JSON.parse(savedCompanyInfo);
        setCompanyName(parsedInfo.name || "Tech Innovations Inc.");
        setIndustry(parsedInfo.industry || "Technology");
        setCompanySize(parsedInfo.size || "51-200 employees");
        setCompanyWebsite(parsedInfo.website || "https://techinnovations.example.com");
        setCompanyDescription(parsedInfo.description || "Tech Innovations Inc. is a forward-thinking technology company focused on creating cutting-edge solutions for businesses. We specialize in AI-powered tools, cloud infrastructure, and enterprise software.");
        setCompanyLocation(parsedInfo.location || "San Francisco, CA");
      }
    } catch (error) {
      console.error("Error loading company info:", error);
    }
  }, []);
  
  // Company information state
  const [companyName, setCompanyName] = useState("Tech Innovations Inc.");
  const [industry, setIndustry] = useState("Technology");
  const [companySize, setCompanySize] = useState("51-200 employees");
  const [companyWebsite, setCompanyWebsite] = useState("https://techinnovations.example.com");
  const [companyDescription, setCompanyDescription] = useState("Tech Innovations Inc. is a forward-thinking technology company focused on creating cutting-edge solutions for businesses. We specialize in AI-powered tools, cloud infrastructure, and enterprise software.");
  const [companyLocation, setCompanyLocation] = useState("San Francisco, CA");
  
  useEffect(() => {
    // Load applications from localStorage
    try {
      const savedApplications = localStorage.getItem("applications");
      if (savedApplications) {
        const parsedApplications = JSON.parse(savedApplications);
        setApplications(parsedApplications);
      }
    } catch (error) {
      console.error("Error loading applications:", error);
    }
    
    // Load company info
    loadCompanyInfo();
    
    // Set active tab from location state if provided
    if (location.state && location.state.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state, loadCompanyInfo]);
  
  const handleSaveProfile = () => {
    // Save company info to localStorage
    const companyInfo = {
      name: companyName,
      industry,
      size: companySize,
      website: companyWebsite,
      description: companyDescription,
      location: companyLocation
    };
    
    localStorage.setItem("companyInfo", JSON.stringify(companyInfo));
    
    toast({
      title: "Profile Updated",
      description: "Your company profile has been successfully updated.",
    });
  };

  const updateApplicationStatus = (applicationId: string, newStatus: string) => {
    const updatedApplications = applications.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
    );
    setApplications(updatedApplications);
    localStorage.setItem("applications", JSON.stringify(updatedApplications));
    
    toast({
      title: "Application Updated",
      description: `Application status changed to ${newStatus}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full md:w-80">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Building className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{companyName}</h2>
                  <p className="text-gray-500 mb-4">{industry}</p>
                  
                  <div className="w-full flex gap-2 mt-2">
                    <Button className="w-full" onClick={handleSaveProfile}>
                      Save Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Company Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-500">Location</span>
                    <p className="flex items-center"><MapPin size={16} className="mr-2 text-gray-400" /> {companyLocation}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Website</span>
                    <p className="flex items-center"><Globe size={16} className="mr-2 text-gray-400" /> {companyWebsite}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-500">Size</span>
                    <p className="flex items-center"><Users size={16} className="mr-2 text-gray-400" /> {companySize}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex-1">
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="company">Company Profile</TabsTrigger>
                  <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
                  <TabsTrigger value="candidates">Candidates</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="company" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Company Information</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="company-name">
                          Company Name
                        </label>
                        <Input 
                          id="company-name" 
                          value={companyName} 
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="industry">
                          Industry
                        </label>
                        <Input 
                          id="industry" 
                          value={industry} 
                          onChange={(e) => setIndustry(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="company-size">
                          Company Size
                        </label>
                        <Input 
                          id="company-size" 
                          value={companySize} 
                          onChange={(e) => setCompanySize(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="company-website">
                          Website
                        </label>
                        <Input 
                          id="company-website" 
                          value={companyWebsite} 
                          onChange={(e) => setCompanyWebsite(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="company-location">
                          Location
                        </label>
                        <Input 
                          id="company-location" 
                          value={companyLocation} 
                          onChange={(e) => setCompanyLocation(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="company-description">
                          Company Description
                        </label>
                        <Textarea 
                          id="company-description" 
                          value={companyDescription} 
                          onChange={(e) => setCompanyDescription(e.target.value)}
                          rows={6}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="jobs" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Your Posted Jobs</h3>
                      <Button onClick={() => navigate('/recruiter/post-job')}>
                        <Plus size={16} className="mr-2" /> Post New Job
                      </Button>
                    </div>
                    
                    <JobsList />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="candidates" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Candidate Applications</h3>
                    
                    {applications.length > 0 ? (
                      <div className="space-y-4">
                        {applications.map(application => (
                          <div key={application.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                  <User className="h-5 w-5 text-gray-600" />
                                </div>
                                <div className="ml-3">
                                  <h4 className="font-medium">{application.userId}</h4>
                                  <p className="text-sm text-gray-500">
                                    Applied on {new Date(application.appliedDate).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              
                              <Badge className={
                                application.status === "pending" ? "bg-yellow-500" :
                                application.status === "accepted" ? "bg-green-500" :
                                "bg-red-500"
                              }>
                                {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                              </Badge>
                            </div>
                            
                            <div className="bg-gray-50 p-3 rounded-md mb-3">
                              <p className="text-sm font-medium">Applied for: {application.jobTitle}</p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant={application.status === "accepted" ? "default" : "outline"}
                                onClick={() => updateApplicationStatus(application.id, "accepted")}
                                disabled={application.status === "accepted"}
                              >
                                Accept
                              </Button>
                              <Button 
                                size="sm" 
                                variant={application.status === "rejected" ? "destructive" : "outline"}
                                onClick={() => updateApplicationStatus(application.id, "rejected")}
                                disabled={application.status === "rejected"}
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">No candidate applications yet.</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
