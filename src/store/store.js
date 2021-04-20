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
  moodifyUserInfo: { displayName: "", createdAt: "", _id: "" },
  setMoodifyUserInfo: (displayName, createdAt, _id) => {
    set({
      moodifyUserInfo: {
        displayName: displayName,
        createdAt: createdAt,
        _id: _id,
      },
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
      createdPlaylistData: {
        title: "",
        description: "",
        songs: [],
      },
    });
  },
  createdPlaylistData: {
    title: "",
    description: "",
    songs: [],
  },
  clearCreatedPlaylistData: () => {
    set({
      createdPlaylistData: {
        title: "",
        description: "",
        songs: [],
      },
    });
  },
  setCreatedPlaylistData: formData => {
    let currentData = get().createdPlaylistData;
    set({
      createdPlaylistData: {
        ...currentData,
        title: formData.title,
        description: formData.description,
      },
    });
  },
  addCreatedPlaylistSongs: newSongObj => {
    let currentData = get().createdPlaylistData;
    let currentSongs = get().createdPlaylistData.songs;
    set({
      createdPlaylistData: {
        ...currentData,
        songs: [...currentSongs, newSongObj],
      },
    });
  },
  deleteCreatedPlaylistSongs: songId => {
    let currentData = get().createdPlaylistData;
    let indexForDeletion = get().createdPlaylistData.songs.findIndex(
      song => song.id === songId
    );
    let newArray = [...get().createdPlaylistData.songs];
    newArray.splice(indexForDeletion, 1);
    set({
      createdPlaylistData: { ...currentData, songs: newArray },
    });
  },
  createdPlaylistEditMode: { active: false, playlist_id: null },
  setCreatedPlaylistEditMode: playlist_id => {
    get().createdPlaylistEditMode?.active
      ? set({ createdPlaylistEditMode: { active: false, playlist_id: null } })
      : set({
          createdPlaylistEditMode: { active: true, playlist_id: playlist_id },
        });
  },
  setCreatedPlaylistEditData: playlist => {
    set({
      createdPlaylistData: {
        title: playlist.title,
        description: playlist.description,
        songs: playlist.songs,
      },
    });
  },
});

//Define zustand's useStore hook
export default create(devtools(useStore));
