import React, { useEffect, useState } from "react";
import { Loader, Placeholder } from "semantic-ui-react";
import AlbumsList from "../components/albumsList/AlbumsList";
import ArtistsList from "../components/artistsList/ArtistsList";
import SongList from "../components/songList/SongList";
import {
  getArtist,
  getArtistAlbums,
  getArtistTracks,
  getRelatedArtists,
} from "../services/spotAPIRequests";
import useStore from "../store/store";
import PlaylistsCreation from "../components/playlistsCreation/PlaylistsCreation";
import "./views.scss";
import ReactAudioPlayer from "react-audio-player";

function Artist(props) {
  const accessToken = useStore(state => state.accessToken);
  const artist_id = props.match.params.artist_id;
  const selectedTrackToPlay = useStore(state => state.selectedTrackToPlay);
  const [artistInfo, setArtistInfo] = useState({
    genres: [],
    name: "",
    image: {},
    followers: {},
  });
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistTracks, setArtistTracks] = useState([]);
  const [artistRelatedArtists, setArtistRelatedArtists] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getArtist(accessToken, artist_id).then(data => {
      setArtistInfo({
        genres: data.genres,
        name: data.name,
        image: data.images[1].url,
        followers: data.followers,
      });
    });
    getArtistAlbums(accessToken, artist_id).then(data => {
      setArtistAlbums(data.items);
    });
    getArtistTracks(accessToken, artist_id).then(data => {
      setArtistTracks(data.tracks);
    });
    getRelatedArtists(accessToken, artist_id).then(data => {
      setArtistRelatedArtists(data.artists);
    });
  }, [props]);

  return (
    <div className="artistPageWrapper">
      <div className="albumPagePlayerWrapper">
        <ReactAudioPlayer src={selectedTrackToPlay} controls />
      </div>
      <div className="artistPageHeader">
        <div className="headerLeftRow">
          {artistInfo.image ? (
            <div className="artistPageMainArt">
              <img
                className="artistPageMainImage"
                src={artistInfo.image}
                alt="img"
              />
            </div>
          ) : (
            <Placeholder.Image />
          )}
          <div className="artistPageBanner">{artistInfo.name}</div>
        </div>
        <div className="headerRightRow">
          <div className="artistPageSubBanner">top tracks</div>

          {artistTracks.length ? (
            <div className="artistSongListWrapper">
              <SongList songs={artistTracks} />
            </div>
          ) : (
            <Loader active size="big">
              Loading . . .
            </Loader>
          )}
        </div>
      </div>
      <AlbumsList albums={artistAlbums} />
      <ArtistsList artists={artistRelatedArtists} />
      <div className="artistPagePlaylistCreationWrapper">
        <PlaylistsCreation />
      </div>
    </div>
  );
}

export default Artist;
