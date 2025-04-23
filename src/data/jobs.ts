
export interface JobType {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  postedDays: number;
  skills: string[];
}

export const jobs: JobType[] = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$90,000 - $120,000",
    type: "Full-time",
    description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building responsive web applications using modern JavaScript frameworks and libraries.",
    postedDays: 2,
    skills: ["React", "JavaScript", "TypeScript", "CSS", "HTML", "Tailwind CSS", "Git"],
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "DataSystems",
    location: "Remote",
    salary: "$95,000 - $130,000",
    type: "Full-time",
    description: "Join our backend team to build scalable APIs and services. You'll work with cloud technologies and modern frameworks to deliver robust solutions.",
    postedDays: 5,
    skills: ["Node.js", "Express", "Python", "Django", "PostgreSQL", "AWS", "Docker"],
  },
  {
    id: "3",
    title: "UX/UI Designer",
    company: "CreativeLabs",
    location: "New York, NY",
    salary: "$85,000 - $110,000",
    type: "Full-time",
    description: "We're seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our products. You'll work closely with product managers and developers to deliver exceptional user experiences.",
    postedDays: 1,
    skills: ["Figma", "Sketch", "Adobe XD", "Wireframing", "Prototyping", "User Research", "UI Design"],
  },
  {
    id: "4",
    title: "Full Stack Developer",
    company: "GrowthStartup",
    location: "Austin, TX",
    salary: "$100,000 - $140,000",
    type: "Full-time",
    description: "Looking for a Full Stack Developer to help build our SaaS platform from the ground up. You should be comfortable with frontend and backend technologies.",
    postedDays: 3,
    skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript", "AWS", "Git"],
  },
  {
    id: "5",
    title: "DevOps Engineer",
    company: "CloudSolutions",
    location: "Remote",
    salary: "$110,000 - $150,000",
    type: "Full-time",
    description: "Join our DevOps team to build and maintain our cloud infrastructure. You'll work with modern CI/CD pipelines and ensure scalability and reliability of our systems.",
    postedDays: 7,
    skills: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux", "Python"],
  },
  {
    id: "6",
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Boston, MA",
    salary: "$120,000 - $160,000",
    type: "Full-time",
    description: "We are looking for a Data Scientist to help us extract insights from our data. You'll build machine learning models and work with large datasets to drive business decisions.",
    postedDays: 4,
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization", "Statistics", "Pandas", "TensorFlow"],
  }
];
