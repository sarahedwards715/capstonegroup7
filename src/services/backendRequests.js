//Since our backend is still only local, baseURL is port 4000 for now.
//Just change baseURL whenever we deploy our backend somewhere
let baseURL = "http://localhost:4000/";

export const postUsers = formData => {
  //Maybe Password Later??
  return fetch(baseURL + "users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.username,
      displayName: formData.displayName,
      password: formData.password,
    }),
  }).then(res => res.json());
};

export const loginUser = formData => {
  return fetch(baseURL + "users/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: formData.username,
      password: formData.password,
    }),
  }).then(res => res.json());
};

export const premiumLogin = code => {
  return fetch(baseURL + "login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  }).then(res => {
    console.log(res.data, "from premium login");
  });
};

export const getUsers = () => {
  return fetch(baseURL + "users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(data => console.log(data));
};

export const patchUser = (id, displayName, moodifyToken) => {
  return fetch(baseURL + "users/" + id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + moodifyToken,
    },
    body: JSON.stringify({
      displayName,
    }),
  }).then(res => res.json());
};

export const deleteUser = (id, moodifyToken) => {
  return fetch(baseURL + "users/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + moodifyToken,
    },
  }).then(res => res.json());
};

export const getUsersById = id => {
  console.log(id);
  return fetch(baseURL + "users/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then(res => res.json())
    .then(data => console.log(data));
};

export const getUserByUsername = username => {
  let name = username;

  console.log(name, "from backend");
  return fetch(baseURL + "userProfile/" + username, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(res => res.json());
};

export const getPlaylists = () => {
  return fetch(baseURL + "playlists", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(res => res.json());
};

export const getPlaylistById = id => {
  return fetch(baseURL + "playlists/" + id, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(res => res.json());
};

export const getPlaylistByUsername = (username, moodifyToken) => {
  return fetch(baseURL + "userPlaylists/" + username, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + moodifyToken,
    },
  }).then(res => res.json());
};

export const postPlaylists = (createdPlaylistData, username, moodifyToken) => {
  return fetch(baseURL + "playlists", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + moodifyToken,
    },
    body: JSON.stringify({
      ...createdPlaylistData,
      username: username,
    }),
  }).then(res => res.json());
};

export const patchPlaylists = (
  playlist_id,
  createdPlaylistData,
  username,
  moodifyToken
) => {
  let updateData = {};
  if (createdPlaylistData.title) updateData.title = createdPlaylistData.title;
  if (createdPlaylistData.description)
    updateData.description = createdPlaylistData.description;
  if (createdPlaylistData.songs) updateData.songs = createdPlaylistData.songs;
  console.log(updateData);

  return fetch(baseURL + "playlists/" + playlist_id, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + moodifyToken,
    },
    body: JSON.stringify({
      ...updateData,
      username: username,
    }),
  }).then(res => res.json());
};

export const deletePlaylists = (playlist_id, moodifyToken) => {
  return fetch(baseURL + "playlists/" + playlist_id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + moodifyToken,
    },
  }).then(res => res.json());
};
