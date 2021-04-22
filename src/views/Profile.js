import React from "react";
import UserProfile from "../components/userProfile/UserProfile";
import "./Profile.scss";

const Profile = () => {
  return (
    <div>
      <div className="profileWrapper">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
