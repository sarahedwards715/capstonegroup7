//Let's Define Base Spotify API URL
const baseURL = "https://api.spotify.com/v1/"

export const getMoods = (accessToken) => {
    return fetch(baseURL + "recommendations/available-genre-seeds", {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization":  "Bearer " + accessToken
        }
    })
      .then((res) => res.json())
}