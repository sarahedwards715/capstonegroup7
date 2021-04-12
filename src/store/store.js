import create from "zustand";
import { devtools } from "zustand/middleware";
import { buildLoginURL } from "../services/authSpot";
import { getPlaylists } from "../services/backendRequests";
import { getMoods } from "../services/spotAPIRequests";

const authURL = buildLoginURL();

const useStore = (set, get) => ({
  user: { username: "", moodifyToken: "" },
  accessToken: "",
  setAccessToken: (token) => {
    set({ accessToken: token });
  },
  accessExpiresIn: null,
  setExpiresIn: (time) => {
    set({ accessExpiresIn: time });
  },
  authURL: authURL,
  moodsArray: [],
  setMoodsArray: () => {
    if (get().accessToken) {
      getMoods(get().accessToken).then((data) => {
        console.log(data);
        set({ moodsArray: data.genres });
      });
    }
  },
  playlists: [],
  setPlaylists: () => {
    if (get().accessToken) {
      getPlaylists().then((data) => {
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
});

//Define zustand's useStore hook
export default create(devtools(useStore));
