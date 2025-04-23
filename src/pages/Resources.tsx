import { useState } from "react";
import Navbar from "@/components/Navbar";
import ResourceCard from "@/components/ResourceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, BookOpen, Video, FileText, Wrench, Filter, SlidersHorizontal, PenTool } from "lucide-react";
import { resources, ResourceType } from "@/data/resources";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [selectedResourceType, setSelectedResourceType] = useState<string>("all");
  
  const filteredResources = resources.filter(resource => {
    // Apply search term filter
    const matchesSearch = 
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Apply resource type filter
    const matchesType = 
      selectedResourceType === "all" || 
      resource.resourceType.toLowerCase() === selectedResourceType.toLowerCase();
    
    return matchesSearch && matchesType;
  });
  
  const resourcesByCategory = {
    courses: filteredResources.filter(r => r.resourceType === "Course"),
    articles: filteredResources.filter(r => r.resourceType === "Article"),
    videos: filteredResources.filter(r => r.resourceType === "Video"),
    tools: filteredResources.filter(r => r.resourceType === "Tool"),
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Resources Header */}
      <div className="bg-secondary text-white py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4">Learning Resources</h1>
          <p className="mb-6">Upskill yourself with courses, articles, videos and tools</p>
          
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Search resources, skills, or topics"
              className="pl-10 pr-4 py-6 rounded-lg w-full text-gray-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Section - Mobile Toggle */}
          <div className="lg:hidden mb-4">
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
          
          {/* Filters Section */}
          <div className={`${filtersVisible ? 'block' : 'hidden'} lg:block w-full lg:w-64 space-y-6`}>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Resource Type</h3>
              <div className="space-y-2">
                <Button 
                  variant={selectedResourceType === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedResourceType("all")}
                >
                  <BookOpen size={16} className="mr-2" />
                  All Resources
                </Button>
                <Button 
                  variant={selectedResourceType === "course" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedResourceType("course")}
                >
                  <BookOpen size={16} className="mr-2" />
                  Courses
                </Button>
                <Button 
                  variant={selectedResourceType === "article" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedResourceType("article")}
                >
                  <FileText size={16} className="mr-2" />
                  Articles
                </Button>
                <Button 
                  variant={selectedResourceType === "video" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedResourceType("video")}
                >
                  <Video size={16} className="mr-2" />
                  Videos
                </Button>
                <Button 
                  variant={selectedResourceType === "tool" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedResourceType("tool")}
                >
                  <Wrench size={16} className="mr-2" />
                  Tools
                </Button>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-semibold mb-4">Popular Skills</h3>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" className="rounded-full">
                  JavaScript
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  React
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  Python
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  AWS
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  UI Design
                </Button>
                <Button size="sm" variant="outline" className="rounded-full">
                  SQL
                </Button>
              </div>
            </div>
          </div>
          
          {/* Resources Content */}
          <div className="flex-1">
            <Tabs defaultValue="all" className="mb-8">
              <TabsList className="grid grid-cols-5 mb-8">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="articles">Articles</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <ResourcesGrid resources={filteredResources} />
              </TabsContent>
              
              <TabsContent value="courses">
                <ResourcesGrid resources={resourcesByCategory.courses} />
              </TabsContent>
              
              <TabsContent value="articles">
                <ResourcesGrid resources={resourcesByCategory.articles} />
              </TabsContent>
              
              <TabsContent value="videos">
                <ResourcesGrid resources={resourcesByCategory.videos} />
              </TabsContent>
              
              <TabsContent value="tools">
                <ResourcesGrid resources={resourcesByCategory.tools} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* Career Tips Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center">Career Development Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
                <PenTool className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Resume Building</h3>
              <p className="text-gray-600 mb-4">
                Learn how to create a standout resume that highlights your skills and experience.
              </p>
              <Button variant="link" className="p-0">Read More</Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Video className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Interview Preparation</h3>
              <p className="text-gray-600 mb-4">
                Master technical and behavioral interviews with these expert tips and practice guides.
              </p>
              <Button variant="link" className="p-0">Read More</Button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="rounded-full bg-secondary/10 w-12 h-12 flex items-center justify-center mb-4">
                <BookOpen className="text-secondary h-6 w-6" />
              </div>
              <h3 className="font-bold text-lg mb-2">Skill Development</h3>
              <p className="text-gray-600 mb-4">
                Strategic approaches to acquire new skills efficiently and stay relevant in your industry.
              </p>
              <Button variant="link" className="p-0">Read More</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ResourcesGridProps {
  resources: ResourceType[];
}

const ResourcesGrid = ({ resources }: ResourcesGridProps) => {
  if (resources.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow">
        <BookOpen size={48} className="text-gray-300 mb-4" />
        <h3 className="text-xl font-medium mb-2">No resources found</h3>
        <p className="text-gray-500 text-center">
          Try adjusting your search or filters to see more results.
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map(resource => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};

export default Resources;
