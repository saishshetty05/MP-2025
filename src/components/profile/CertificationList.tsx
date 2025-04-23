
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

export const CertificationList = ({ editing }: { editing: boolean }) => {
  const [certifications, setCertifications] = useState([
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2022",
      expiration: "2025"
    },
    {
      id: "2",
      name: "Professional Scrum Master I",
      issuer: "Scrum.org",
      issueDate: "2021",
      expiration: "N/A"
    }
  ]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Certifications</h3>
          {editing && (
            <Button variant="outline" size="sm">
              <Plus size={16} className="mr-1" /> Add Certification
            </Button>
          )}
        </div>
        
        <div className="space-y-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium">{cert.name}</h4>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-sm text-gray-500">
                    Issued: {cert.issueDate} {cert.expiration !== "N/A" && `• Expires: ${cert.expiration}`}
                  </p>
                </div>
                {editing && (
                  <Button variant="ghost" size="sm">
                    <X size={16} />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
