//Since our backend is still only local, baseURL is port 4000 for now.
//Just change baseURL whenever we deploy our backend somewhere
let baseURL = "http://localhost:4000/";

export const postUsers = (formData) => {
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
    }),
  }).then((res) => res.json());
};

export const getUsers = () => {
  return fetch(baseURL + "users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};

export const getUsersById = (id) => {
  return fetch(baseURL + "users", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
};
