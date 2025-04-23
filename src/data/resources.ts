
export interface ResourceType {
  id: string;
  title: string;
  description: string;
  provider: string;
  resourceType: "Course" | "Article" | "Video" | "Tool";
  image: string;
  duration: string;
  skills: string[];
  url: string;
}

export const resources: ResourceType[] = [
  {
    id: "1",
    title: "Modern React with Hooks",
    description: "Learn how to build modern React applications using hooks, context, and the latest best practices in React development.",
    provider: "Udemy",
    resourceType: "Course",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80",
    duration: "15 hours",
    skills: ["React", "JavaScript", "Hooks", "Context API"],
    url: "https://example.com/course"
  },
  {
    id: "2",
    title: "Complete Python Developer in 2024",
    description: "Learn Python from scratch. This course covers everything from basics to advanced topics including web development, data science, and automation.",
    provider: "Coursera",
    resourceType: "Course",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80",
    duration: "30 hours",
    skills: ["Python", "Django", "Flask", "Data Analysis"],
    url: "https://example.com/course"
  },
  {
    id: "3",
    title: "The Complete Node.js Developer",
    description: "Build, test, and launch Node applications. Learn Node.js by building real-world applications with MongoDB, Express, and more.",
    provider: "Pluralsight",
    resourceType: "Course",
    image: "https://images.unsplash.com/photo-1598425237654-4fc758e50a93?auto=format&fit=crop&q=80",
    duration: "20 hours",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
    url: "https://example.com/course"
  },
  {
    id: "4",
    title: "Docker and Kubernetes: The Complete Guide",
    description: "Master Docker and Kubernetes to deploy and scale your applications. Learn container technology and orchestration from the ground up.",
    provider: "LinkedIn Learning",
    resourceType: "Course",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80",
    duration: "18 hours",
    skills: ["Docker", "Kubernetes", "CI/CD", "DevOps"],
    url: "https://example.com/course"
  },
  {
    id: "5",
    title: "UI/UX Design Principles",
    description: "Learn the fundamental principles of UI/UX design. This course covers user research, wireframing, prototyping, and user testing.",
    provider: "Design+Code",
    resourceType: "Course",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80",
    duration: "12 hours",
    skills: ["UI Design", "UX Design", "Wireframing", "Prototyping"],
    url: "https://example.com/course"
  },
  {
    id: "6",
    title: "How to Write a Great Resume for Software Engineers",
    description: "Learn how to create a resume that stands out to recruiters and hiring managers in the tech industry. Includes templates and examples.",
    provider: "CareerFoundry",
    resourceType: "Article",
    image: "https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?auto=format&fit=crop&q=80",
    duration: "15 min read",
    skills: ["Career Development", "Resume Building", "Job Hunting"],
    url: "https://example.com/article"
  },
  {
    id: "7",
    title: "Mastering SQL for Data Analysis",
    description: "Learn advanced SQL techniques for data analysis. This course covers complex queries, optimization, and working with large datasets.",
    provider: "DataCamp",
    resourceType: "Course",
    image: "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&q=80",
    duration: "10 hours",
    skills: ["SQL", "Database Design", "Data Analysis"],
    url: "https://example.com/course"
  },
  {
    id: "8",
    title: "Acing the Technical Interview",
    description: "Prepare for technical interviews with this comprehensive guide. Covers algorithms, data structures, system design, and behavioral questions.",
    provider: "Pramp",
    resourceType: "Video",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&q=80",
    duration: "2 hours",
    skills: ["Algorithms", "Data Structures", "Interview Prep"],
    url: "https://example.com/video"
  }
];

export const getRecommendedResources = (skills: string[]): ResourceType[] => {
  // Find resources that match the given skills
  return resources.filter(resource => 
    resource.skills.some(skill => skills.includes(skill))
  );
};
