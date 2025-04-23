import { JobType } from "@/data/jobs";
import { ResourceType, resources } from "@/data/resources";

// For normal use, userSkills must be explicitly passed instead of hardcoding.
// If nothing passed, fall back to empty (no skill match).

export const calculateSkillMatch = (job: JobType, userSkills?: string[]) => {
  const skillSet = Array.isArray(userSkills) ? userSkills : [];
  // Find skills that match between the job and the user
  const matchedSkills = job.skills.filter(skill => 
    skillSet.includes(skill)
  );
  
  // Find skills that are missing
  const missingSkills = job.skills.filter(skill => 
    !skillSet.includes(skill)
  );
  
  // Calculate match percentage
  const matchPercentage = job.skills.length > 0 ?
    Math.round((matchedSkills.length / job.skills.length) * 100) : 0;
  
  return {
    matchPercentage,
    matched: matchedSkills,
    missing: missingSkills
  };
};

// Remain unchanged except use calculateSkillMatch with skills passed
export const getRecommendedResourcesForJob = (job: JobType, userSkills?: string[]): ResourceType[] => {
  // Get the skills the user is missing for this job
  const { missing } = calculateSkillMatch(job, userSkills);
  
  // Find resources that teach those missing skills
  return resources.filter(resource => 
    resource.skills.some(skill => missing.includes(skill))
  );
};

export const getSkillMatchScores = (jobs: JobType[], userSkills?: string[]): Record<string, number> => {
  const scores: Record<string, number> = {};
  
  jobs.forEach(job => {
    const { matchPercentage } = calculateSkillMatch(job, userSkills);
    scores[job.id] = matchPercentage;
  });
  
  return scores;
};
