import React from "react";
import { Container } from "react-bootstrap";

let client_ID = "";
let redirect_uri = "";

const AUTH_URL2 = `https://accounts.spotify.com/authorize?client_id=15dca225b3034de3b3c9ded97b8ec63f&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`;

if (window.location.host === "localhost:3000") {
  client_ID = "30bda40009804cc0b810a094d8653182";
  redirect_uri = "http://localhost:3000/capstonegroup7/";
} else {
  client_ID = "7a4ffd2d4afc4f4d876826b6d369ab66";
  redirect_uri = "https://sarahedwards715.github.io/capstonegroup7/";
}

export default function SpotifyLogin() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <a className="btn btn-success btn-lg" href={AUTH_URL2}>
        Login With Spotify
      </a>
    </Container>
  );
}
