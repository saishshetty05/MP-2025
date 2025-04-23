
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Plus, X } from "lucide-react";
import { ProfileHeader } from "./ProfileHeader";
import { SkillsList } from "./SkillsList";
import { ExperienceList } from "./ExperienceList";
import { EducationList } from "./EducationList";
import { CertificationList } from "./CertificationList";

export const JobSeekerProfile = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [profileTab, setProfileTab] = useState("profile");
  const { toast } = useToast();
  
  // Profile information
  const [fullName, setFullName] = useState(user?.name || "John Doe");
  const [title, setTitle] = useState("Senior Frontend Developer");
  const [location, setLocation] = useState("San Francisco, CA");
  const [email, setEmail] = useState(user?.email || "john.doe@example.com");
  const [phone, setPhone] = useState("(555) 123-4567");
  
  const handleSaveProfile = () => {
    setEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader 
        fullName={fullName}
        title={title}
        editing={editing}
        setEditing={setEditing}
        onSave={handleSaveProfile}
      />
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left sidebar */}
          <div className="w-full md:w-80">
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{fullName}</h2>
                  <p className="text-gray-500 mb-4">{title}</p>
                  
                  <div className="w-full flex gap-2 mt-2">
                    {editing ? (
                      <Button className="w-full" onClick={handleSaveProfile}>
                        Save Profile
                      </Button>
                    ) : (
                      <Button className="w-full" onClick={() => setEditing(true)}>
                        Edit Profile
                      </Button>
                    )}
                  </div>
                  
                  <div className="w-full flex gap-2 mt-2">
                    {editing ? (
                      <Button className="w-full" variant="outline" onClick={() => setEditing(false)}>
                        Cancel
                      </Button>
                    ) : (
                      <Button className="w-full" variant="outline">
                        Download Resume
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <Tabs defaultValue={profileTab} onValueChange={setProfileTab} className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="resume">Resume</TabsTrigger>
                  <TabsTrigger value="applications">Applications</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">About</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-3 text-gray-500" />
                        {editing ? (
                          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                        ) : (
                          <span>{email}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-3 text-gray-500" />
                        {editing ? (
                          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                        ) : (
                          <span>{phone}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                        {editing ? (
                          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
                        ) : (
                          <span>{location}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <SkillsList editing={editing} />
                <ExperienceList editing={editing} />
                <EducationList editing={editing} />
                <CertificationList editing={editing} />
              </TabsContent>
              
              <TabsContent value="resume">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Your Resume</h3>
                    <div className="flex flex-col items-center justify-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12">
                      <p className="text-gray-500 mb-4">Upload your resume to apply for jobs with a single click</p>
                      <Button>Upload Resume</Button>
                    </div>
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
