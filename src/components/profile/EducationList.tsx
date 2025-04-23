
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export const EducationList = ({ editing }: { editing: boolean }) => {
  const [education, setEducation] = useState([
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Technology",
      location: "Boston, MA",
      startYear: "2014",
      endYear: "2018",
      description: "Specialized in software engineering and web development. Graduated with honors."
    }
  ]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Education</h3>
          {editing && (
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-1" /> Add Education
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.institution} • {edu.location}</p>
                  <p className="text-sm text-gray-500">{edu.startYear} - {edu.endYear}</p>
                </div>
                {editing && (
                  <Button variant="ghost" size="sm">
                    <X size={16} />
                  </Button>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-600">{edu.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
