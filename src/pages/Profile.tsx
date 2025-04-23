
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { JobSeekerProfile } from "@/components/profile/JobSeekerProfile";
import { RecruiterProfile } from "@/components/profile/RecruiterProfile";
import { useEffect, useState } from "react";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const [localUser, setLocalUser] = useState(user);
  const navigate = useNavigate();
  
  // Always use up-to-date user from localStorage on mount or changes to user
  useEffect(() => {
    const userDataStr = localStorage.getItem("user");
    if (userDataStr) {
      const userData = JSON.parse(userDataStr);
      setLocalUser(userData);
      
      // If it's a recruiter, check for company information to update user data
      if (userData.role === "recruiter") {
        const companyInfoStr = localStorage.getItem("companyInfo");
        if (companyInfoStr) {
          const companyInfo = JSON.parse(companyInfoStr);
          
          // Update user data in localStorage with company name
          if (companyInfo.name && companyInfo.name !== userData.companyName) {
            userData.companyName = companyInfo.name;
            localStorage.setItem("user", JSON.stringify(userData));
          }
        }
      }
    } else {
      setLocalUser(user);
    }
  }, [user]);
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/auth");
    return null;
  }
  
  return (
    <>
      {localUser?.role === "recruiter" ? (
        <RecruiterProfile user={localUser} />
      ) : (
        <JobSeekerProfile user={localUser} />
      )}
    </>
  );
};

export default Profile;
