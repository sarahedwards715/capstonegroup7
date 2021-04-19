import React, { useState, useEffect } from "react";
import UserPlaylists from "../userPlaylists/UserPlaylists";
import useStore from "../../store/store";
import {
  getPlaylistByUsername,
  getUserByUsername,
  deleteUser,
  patchUser,
} from "../../services/backendRequests";
import DeletionModal from "../deletionModal/DeletionModal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const UserProfile = () => {
  let user = useStore(state => state.user);
  let moodifyUserInfo = useStore(state => state.moodifyUserInfo);
  let setMoodifyUserInfo = useStore(state => state.setMoodifyUserInfo);
  let setUserPlaylists = useStore(state => state.setUserPlaylists);
  let userPlaylists = useStore(state => state.userPlaylists);
  const [displayName, setDisplayName] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(async () => {
    let moodifyUser = await getUserByUsername(user.username);
    console.log(moodifyUser, "inside useEffect");
    setMoodifyUserInfo(
      moodifyUser[0].displayName,
      moodifyUser[0].createdAt,
      moodifyUser[0]._id
    );
  }, []);

  useEffect(async () => {
    let selectedUserPlaylist = await getPlaylistByUsername(user.username);
    setUserPlaylists(selectedUserPlaylist);
  }, []);

  function handleDelete(event) {
    deleteUser(moodifyUserInfo._id, user.moodifyToken);
  }

  function handleEditDisplayName() {
    patchUser(moodifyUserInfo._id, displayName, user.moodifyToken);
  }

  console.log(JSON.stringify(moodifyUserInfo), "from userprofile");
  console.log(displayName);
  return (
    <div>
      <div>username: {user.username}</div>
      <div> displayName: {moodifyUserInfo.displayName}</div>
      <div> createdAt: {moodifyUserInfo.createdAt}</div>
      <div>Id: {moodifyUserInfo._id}</div>
      <button onClick={e => setModalVisible(true)}>Delete User</button>
      <button>Edit Display Name</button>
      <UserPlaylists userPlaylists={userPlaylists} />
      <DeletionModal
        deleteTarget="User"
        deleteFunction={handleDelete}
        setVisible={setModalVisible}
        visible={modalVisible}
      />
      <div className="editDisplayNameWrapper">
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            onChange={e => setDisplayName(e.target.value)}
          />
        </InputGroup>
        <Button
          variant="success"
          className="editDisplayNameButton"
          onClick={handleEditDisplayName}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
