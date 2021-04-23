import "./UserProfile.scss";
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
import { useHistory } from "react-router";
import useForm from "../../customHooks/useForm";
import patchUserValidation from "../../validationInfo/patchUserValidation";

const UserProfile = () => {
  let user = useStore((state) => state.user);
  let moodifyUserInfo = useStore((state) => state.moodifyUserInfo);
  let setMoodifyUserInfo = useStore((state) => state.setMoodifyUserInfo);
  let setUserPlaylists = useStore((state) => state.setUserPlaylists);
  let userPlaylists = useStore((state) => state.userPlaylists);
  const logout = useStore((state) => state.logout);

  let history = useHistory();

  const [displayName, setDisplayName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [
    editDisplayNameInputVisibility,
    setEditDisplayNameInputVisibility,
  ] = useState(false);

  useEffect(async () => {
    let moodifyUser = await getUserByUsername(user.username);
    console.log(moodifyUser, "inside useEffect");
    setMoodifyUserInfo(
      moodifyUser[0].displayName,
      moodifyUser[0].createdAt,
      moodifyUser[0]._id
    );
  }, [displayName]);

  useEffect(async () => {
    let selectedUserPlaylist = await getPlaylistByUsername(user.username);
    setUserPlaylists(selectedUserPlaylist);
  }, []);

  function handleDelete(event) {
    deleteUser(moodifyUserInfo._id, user.moodifyToken).then((data) => {
      if (data.statusCode === 200) {
        history.push("/");
        logout();
      }
    });
  }

  function handleEditDisplayName() {
    patchUser(moodifyUserInfo._id, displayName, user.moodifyToken).then(
      (data) => {
        if (data.statusCode === 200) {
          console.log(data);

          let updatedDisplayName = data.displayName;

          console.log(updatedDisplayName);

          let newMoodifyUserInfo = {
            displayName: updatedDisplayName,
            ...moodifyUserInfo,
          };
          setMoodifyUserInfo(
            newMoodifyUserInfo.displayName,
            newMoodifyUserInfo.createdAt,
            newMoodifyUserInfo._id
          );
          setDisplayName(moodifyUserInfo.displayName);
          setEditDisplayNameInputVisibility(!editDisplayNameInputVisibility);
        }
      }
    );
  }

  function toggleEditDisplayName() {
    setEditDisplayNameInputVisibility(
      (editDisplayNameInputVisibility) => !editDisplayNameInputVisibility
    );
  }

  const { handleValidate, errors, setErrors } = useForm(
    handleEditDisplayName,
    patchUserValidation,
    displayName
  );

  return (
    <div>
      <div className="userProfileWrapper">
        <div className="userProfileHeader">
          <div className="userProfileBanner">{user.username}'s profile</div>
          <Button
          className="deleteUserButton"
          onClick={(e) => setModalVisible(true)}
        >
          Delete User
        </Button>
        </div>
        <div className="userProfileDisplayNameColumn">
          <div className="displayNameBanner">
            {" "}
            @{moodifyUserInfo.displayName}
          </div>
          {editDisplayNameInputVisibility ? (
            <div className="editDisplayNameWrapper">
              <InputGroup className="mb-3 displayNameInputWrapper ">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  isInvalid={errors.displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <FormControl.Feedback type="invalid">
                  {errors.displayName}
                </FormControl.Feedback>
                <InputGroup.Append>
                  <Button
                    onClick={toggleEditDisplayName}
                    className="inputGroupCloseButton"
                  >
                    X
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Button
                variant="success"
                className="submitDisplayNameButton"
                onClick={(e) => handleValidate(e)}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Button
              onClick={toggleEditDisplayName}
              className="editDisplayNameButton"
            >
              Edit Display Name
            </Button>
          )}
        </div>
      

        <div className="userPlaylistsBanner">my playlists</div>

        <UserPlaylists  userPlaylists={userPlaylists} />
        <DeletionModal
          deleteTarget="User"
          deleteFunction={handleDelete}
          setVisible={setModalVisible}
          visible={modalVisible}
        />
      </div>
    </div>
  );
};

export default UserProfile;
