
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export const ExperienceList = ({ editing }: { editing: boolean }) => {
  const [experiences, setExperiences] = useState([
    {
      id: "1",
      role: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      startDate: "Jan 2021",
      endDate: "Present",
      description: "Led development of the company's flagship web application using React, TypeScript, and Redux. Improved performance by 40% and implemented CI/CD pipelines."
    },
    {
      id: "2",
      role: "Frontend Developer",
      company: "WebSolutions LLC",
      location: "Remote",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      description: "Developed responsive web applications for various clients using modern JavaScript frameworks and libraries."
    }
  ]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Experience</h3>
          {editing && (
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-1" /> Add Experience
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{exp.role}</h4>
                  <p className="text-gray-600">{exp.company} • {exp.location}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                </div>
                {editing && (
                  <Button variant="ghost" size="sm">
                    <X size={16} />
                  </Button>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
