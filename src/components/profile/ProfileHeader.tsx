
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

interface ProfileHeaderProps {
  fullName: string;
  title: string;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  onSave: () => void;
}

export const ProfileHeader = ({ 
  fullName, 
  title, 
  editing, 
  setEditing, 
  onSave 
}: ProfileHeaderProps) => {
  return (
    <>
      <Navbar />
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{fullName}</h1>
              <p className="text-gray-600">{title}</p>
            </div>
            <div className="flex gap-2">
              {editing ? (
                <>
                  <Button variant="outline" onClick={() => setEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={onSave}>
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
