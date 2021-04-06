// GET https://accounts.spotify.com/authorize?response_type=token&redirect_uri=https:%2F%2Fsarahedwards715.github.io%2Fcapstonegroup7%2F&client_id=7a4ffd2d4afc4f4d876826b6d369ab66&state=123

// CITATION: Most of this authorization code is taken from the Spotify Official Thirtify Example - https://github.com/possan/webapi-player-example
// Credits to Per-Olov Jernberg, Jose M. Perez, Michael Thelin, and asmitter
let redirect_uri = "";
let client_ID = "";

if (window.location.host === "localhost:3000") {
  client_ID = "30bda40009804cc0b810a094d8653182";
  redirect_uri = "http://localhost:3000/capstonegroup7/";
} else {
  client_ID = "7a4ffd2d4afc4f4d876826b6d369ab66";
  redirect_uri = "https://sarahedwards715.github.io/capstonegroup7/";
}

export function buildLoginURL() {
  return (
    "https://accounts.spotify.com/authorize?client_id=" +
    client_ID +
    "&redirect_uri=" +
    encodeURIComponent(redirect_uri) +
    "&response_type=token" +
    "&state=standUpLazerous"
  );
}

export function launchLoginSpot() {
  let url = buildLoginURL();

  let dimensions = {
    height: 800,
    width: 400,
    left: window.screen.width / 2 - 400,
    top: window.screen.height / 2 - 200,
  };

  let authPopup = window.open(
    url,
    "Spotify Authentication",
    `menubar=no,location=no,resizable=no,scrollbars=no,width=${dimensions.width},height=${dimensions.height},top=${dimensions.top},left=${dimensions.left}`
  );
}

export function setAccessToken(token, expires_in) {
  localStorage.setItem("access_token", token);
  localStorage.setItem("expires_in", expires_in);
}
