import React from "react";
import UserProfile from "../components/userProfile/UserProfile";
import "./Profile.scss";
import useStore from "../store/store";

const Profile = () => {

  return (
    <>
      <div className="profileWrapper">
        <UserProfile />
      </div>
    </>
  );
};

export default Profile;
