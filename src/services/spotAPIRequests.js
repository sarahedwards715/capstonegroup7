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

export const getRecommendations = (accessToken, mood, limit = 15) => {
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

export const getArtist = (accessToken, artist_id) => {
  let reqURL = baseURL + "artists/" + artist_id;

  return fetch(reqURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};

export const getArtistAlbums = (
  accessToken,
  artist_id,
  limit = 10,
  offset = 0
) => {
  let reqURL =
    baseURL +
    "artists/" +
    artist_id +
    "/albums?market=US&limit=" +
    encodeURIComponent(limit) +
    "&offset=" +
    encodeURIComponent(offset);

  return fetch(reqURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};

export const getArtistTracks = (accessToken, artist_id) => {
  let reqURL = baseURL + "artists/" + artist_id + "/toptracks?market=US";

  return fetch(reqURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};

export const getRelatedArtists = (accessToken, artist_id) => {
  let reqURL = baseURL + "artists/" + artist_id + "/related-artists";

  return fetch(reqURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};

export const getAlbum = (accessToken, album_id) => {
  let reqURL = baseURL + "albums/" + album_id;

  return fetch(reqURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};

export const getAlbumTracks = (accessToken, album_id) => {
  let reqURL = baseURL + "albums/" + album_id + "/tracks?limit=50";

  return fetch(reqURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};

export const searchQuery = (
  accessToken,
  query,
  type,
  limit = 10,
  offset = 0
) => {
  let qryURL =
    baseURL +
    "search?query=" +
    encodeURIComponent(query) +
    "&type=" +
    encodeURIComponent(type) +
    "&offset=" +
    encodeURIComponent(offset) +
    "&limit=" +
    encodeURIComponent(limit);

  return fetch(qryURL, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  }).then((res) => res.json());
};
