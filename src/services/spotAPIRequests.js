//Let's Define Base Spotify API URL
const baseURL = "https://api.spotify.com/v1/";

export const getMoods = (accessToken) => {
  return fetch(baseURL + "recommendations/available-genre-seeds", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};

export const getRecommendations = (accessToken, mood, limit = 10) => {
  let recURL =
    baseURL +
    "recommendations?limit=" +
    encodeURIComponent(limit) +
    "&seed_artists=" +
    encodeURIComponent(",") +
    "&seed_genres=" +
    encodeURIComponent(mood) +
    "&seed_tracks=" +
    encodeURIComponent(",");

  return fetch(recURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};
