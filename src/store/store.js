import create from "zustand";
import { devtools, redux } from "zustand/middleware";
import { buildLoginURL } from "../services/authSpot";

//Global State
const initialState = {
  user: { username: "" },
  accessToken: "",
  accessExpiresIn: null,
  authUrl: buildLoginURL(),
};

//Action Types
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_ACCESS_TOKEN = "GET_ACCESS_TOKEN";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_ACCESS_EXPIRES_IN = "SET_ACCESS_EXPIRES_IN";

//Reducer State Changing Function
const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.payload };
    case LOGOUT:
      return { user: {}, accessToken: "", accessExpiresIn: null };
    case GET_ACCESS_TOKEN:
      return {};
    case SET_ACCESS_TOKEN:
      return { accessToken: action.payload };
    case SET_ACCESS_EXPIRES_IN:
      return { accessExpiresIn: action.payload };
    default:
      return state;
  }
};

//Define zustand's useStore hook
export const useStore = create(devtools(redux(reducer, initialState)));
