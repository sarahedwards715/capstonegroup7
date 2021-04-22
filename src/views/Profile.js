import React from "react";
import UserProfile from "../components/userProfile/UserProfile";
import "./Profile.scss";
import PlaylistsCreation from "../components/playlistsCreation/PlaylistsCreation";
import ReactAudioPlayer from "react-audio-player";
import useStore from "../store/store";

const Profile = () => {
  const selectedTrackToPlay = useStore(state => state.selectedTrackToPlay);

  return (
    <>
      <div className="playlistCreationWrapper">
        <PlaylistsCreation />
      </div>
      <div className="profilePagePlayerWrapper">
        <ReactAudioPlayer src={selectedTrackToPlay} controls />
      </div>
      <div className="profileWrapper">
        <UserProfile />
      </div>
    </>
  );
};

export default Profile;
