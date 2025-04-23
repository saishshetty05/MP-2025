import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Building, MapPin, Globe, Users, Plus, User } from "lucide-react";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [companyName, setCompanyName] = useState(user?.companyName || "Company Name");
  const [industry, setIndustry] = useState("Industry");
  const [companySize, setCompanySize] = useState("Size");
  const [companyWebsite, setCompanyWebsite] = useState("Website");
  const [companyDescription, setCompanyDescription] = useState("Description");
  const [companyLocation, setCompanyLocation] = useState("Location");

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your company profile has been successfully updated.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        {/* Use optional chaining and fallback */}
        Welcome, {user?.companyName ?? "Company Name Not Set"}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Company Profile</h2>
            <p className="text-gray-600 mb-4">
              Manage your company profile and showcase your company to attract top talent.
            </p>
            <Button onClick={() => navigate('/profile')}>
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Post a Job</h2>
            <p className="text-gray-600 mb-4">
              Reach a wider audience and find the perfect candidate for your open positions.
            </p>
            <Button onClick={() => navigate('/recruiter/post-job')}>
              Post a Job
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">View Applications</h2>
            <p className="text-gray-600 mb-4">
              Review and manage applications from potential candidates.
            </p>
            <Button onClick={() => navigate('/profile', { state: { tab: 'candidates' } })}>
              View Applications
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="text-gray-600 mb-4">
        {/* Safely display recruiter company info */}
        Company: {user?.companyName ?? "N/A"}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
