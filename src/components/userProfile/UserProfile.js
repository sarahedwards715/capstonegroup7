import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";
import UserPlaylists from "../userPlaylists/UserPlaylists";
import useStore from "../../store/store";
import {
  getPlaylistByUsername,
  getUserByUsername,
} from "../../services/backendRequests";

const UserProfile = () => {
  let user = useStore(state => state.user);
  let moodifyUserInfo = useStore(state => state.moodifyUserInfo);
  let setMoodifyUserInfo = useStore(state => state.setMoodifyUserInfo);
  let setUserPlaylists = useStore(state => state.setUserPlaylists);
  let userPlaylists = useStore(state => state.userPlaylists);

  useEffect(async () => {
    let moodifyUser = await getUserByUsername(user.username);
    setMoodifyUserInfo(moodifyUser[0].displayName, moodifyUser[0].createdAt);
  }, [setMoodifyUserInfo]);

  useEffect(async () => {
    let selectedUserPlaylist = await getPlaylistByUsername(user.username);
    setUserPlaylists(selectedUserPlaylist);
  }, []);

  return (
    <div>
      <Navigation />
      username: {user.username}
      displayName: {moodifyUserInfo.displayName}
      createdAt: {moodifyUserInfo.createdAt}
      <UserPlaylists userPlaylists={userPlaylists} />
    </div>
  );
};

export default UserProfile;
