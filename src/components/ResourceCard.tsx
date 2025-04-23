
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";
import { ResourceType } from "@/data/resources";

interface ResourceCardProps {
  resource: ResourceType;
}

const ResourceCard = ({ resource }: ResourceCardProps) => {
  return (
    <div className="resource-card bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
      <div 
        className="h-40 bg-cover bg-center" 
        style={{ backgroundImage: `url(${resource.image})` }}
      >
        <div className="h-full w-full bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
          <Badge className={`
            ${resource.resourceType === 'Course' 
              ? 'bg-primary' 
              : resource.resourceType === 'Article' 
                ? 'bg-secondary' 
                : 'bg-purple-500'
            } text-white`}
          >
            {resource.resourceType}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{resource.title}</h3>
        <p className="text-sm text-gray-500 mb-3">By {resource.provider}</p>
        
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {resource.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.skills.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="outline" className="bg-gray-50 text-xs">
              {skill}
            </Badge>
          ))}
          {resource.skills.length > 3 && (
            <Badge variant="outline" className="bg-gray-50 text-xs">
              +{resource.skills.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <BookOpen size={14} className="mr-1 text-gray-500" />
            <span className="text-gray-500">
              {resource.duration}
            </span>
          </div>
          <Button size="sm" variant="outline" className="flex items-center gap-1">
            <ExternalLink size={14} />
            <span>Learn</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
