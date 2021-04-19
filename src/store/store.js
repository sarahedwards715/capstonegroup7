import create from "zustand";
import { devtools } from "zustand/middleware";
import { buildLoginURL } from "../services/authSpot";
import {
  getPlaylists,
  getPlaylistByUsername,
} from "../services/backendRequests";
import { getMoods } from "../services/spotAPIRequests";

const authURL = buildLoginURL();

const useStore = (set, get) => ({
  user: { username: "", moodifyToken: "" },
  setUser: (username, token) => {
    set({ user: { username: username, moodifyToken: token } });
  },
  userPlaylists: [],
  setUserPlaylists: () => {
    if (get().accessToken) {
      getPlaylistByUsername(get().user.username).then(data =>
        set({ userPlaylists: data })
      );
    }
  },
  moodifyUserInfo: { displayName: "", createdAt: "" },
  setMoodifyUserInfo: (displayName, createdAt) => {
    set({
      moodifyUserInfo: { displayName: displayName, createdAt: createdAt },
    });
  },
  accessToken: "",
  setAccessToken: token => {
    set({ accessToken: token });
  },
  accessExpiresIn: null,
  setExpiresIn: time => {
    set({ accessExpiresIn: time });
  },
  authURL: authURL,
  moodsArray: [],
  setMoodsArray: () => {
    if (get().accessToken) {
      getMoods(get().accessToken).then(data => {
        set({ moodsArray: data.genres });
      });
    }
  },
  playlists: [],
  setPlaylists: () => {
    if (get().accessToken) {
      getPlaylists().then(data => {
        console.log("Playlists", data);
        set({ playlists: data });
      });
    }
  },
  logout: () => {
    set({
      user: { username: "", moodifyToken: "" },
      accessToken: "",
      accessExpiresIn: "",
    });
  },
  createdPlaylistSongs: [],
  addCreatedPlaylistSongs: newSongObj => {
    let currentSongs = get().createdPlaylistSongs;
    set({
      createdPlaylistSongs: [...currentSongs, newSongObj],
    });
  },
  deleteCreatedPlaylistSongs: songId => {
    let indexForDeletion = get().createdPlaylistSongs.findIndex(
      song => song.id === songId
    );
    let newArray = [...get().createdPlaylistSongs];
    newArray.splice(indexForDeletion, 1);
    set({
      createdPlaylistSongs: newArray,
    });
  },
});

//Define zustand's useStore hook
export default create(devtools(useStore));
