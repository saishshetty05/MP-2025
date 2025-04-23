
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export const SkillsList = ({ editing }: { editing: boolean }) => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<string[]>([]); // Start empty!
  const [newSkill, setNewSkill] = useState("");

  // Load from localStorage on mount
  useEffect(() => {
    const savedSkills = localStorage.getItem("jobseeker_skills");
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    } else {
      // Fallback default if nothing is set, so old users see *something*; can remove if not needed.
      setSkills([
        "JavaScript", "React", "TypeScript", "Node.js", 
        "HTML", "CSS", "Git", "UI/UX Design"
      ]);
    }
  }, []);

  // Save to localStorage whenever skills change
  useEffect(() => {
    localStorage.setItem("jobseeker_skills", JSON.stringify(skills));
  }, [skills]);
  
  const handleAddSkill = () => {
    if (newSkill.trim() !== "" && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      
      toast({
        title: "Skill Added",
        description: `${newSkill.trim()} has been added to your skills.`,
      });
    }
  };
  
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    
    toast({
      title: "Skill Removed",
      description: `${skillToRemove} has been removed from your skills.`,
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          {editing && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Plus size={16} className="mr-1" /> Add Skill
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add a new skill</DialogTitle>
                  <DialogDescription>
                    Add a skill to showcase your expertise.
                  </DialogDescription>
                </DialogHeader>
                <Input 
                  value={newSkill} 
                  onChange={(e) => setNewSkill(e.target.value)} 
                  placeholder="e.g. JavaScript, Project Management"
                  onKeyDown={e => e.key === 'Enter' && handleAddSkill()}
                />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setNewSkill("")}>Cancel</Button>
                  <Button onClick={handleAddSkill}>Add Skill</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} className="px-3 py-1">
              {skill}
              {editing && (
                <X 
                  size={14} 
                  className="ml-2 cursor-pointer" 
                  onClick={() => handleRemoveSkill(skill)} 
                />
              )}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
