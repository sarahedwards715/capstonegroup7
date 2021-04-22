import React from "react";
import UserProfile from "../components/userProfile/UserProfile";
import "./Profile.scss";
import useStore from "../store/store";

const Profile = () => {
  const selectedTrackToPlay = useStore(state => state.selectedTrackToPlay);

  return (
    <>
      <div className="profileWrapper">
        <UserProfile />
      </div>
    </>
  );
};

export default Profile;
