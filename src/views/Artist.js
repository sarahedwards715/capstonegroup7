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

function Artist(props) {
  const accessToken = useStore((state) => state.accessToken);
  const artist_id = props.match.params.artist_id;

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
    getArtist(accessToken, artist_id).then((data) => {
      setArtistInfo({
        genres: data.genres,
        name: data.name,
        image: data.images[1].url,
        followers: data.followers,
      });
    });
    getArtistAlbums(accessToken, artist_id).then((data) => {
      setArtistAlbums(data.items);
    });
    getArtistTracks(accessToken, artist_id).then((data) => {
      setArtistTracks(data.tracks);
    });
    getRelatedArtists(accessToken, artist_id).then((data) => {
      setArtistRelatedArtists(data.artists);
    });
  }, [props]);

  return (
    <div className="artistPageWrapper">
      <div className="artistPageHeader">
        <div className="headerLeftRow">
          {artistInfo.image ? (
            <img
              className="artistPageMainImage"
              src={artistInfo.image}
              alt="img"
            />
          ) : (
            <Placeholder.Image />
          )}
          <div className="artistPageBanner">{artistInfo.name}</div>
        </div>
        <div className="headerRightRow">
          {artistTracks.length ? (
            <SongList songs={artistTracks} />
          ) : (
            <Loader active size="big">
              Loading . . .
            </Loader>
          )}
        </div>
      </div>
      <AlbumsList albums={artistAlbums} />
      <div className="artistPageSubBanner">top tracks</div>
      <ArtistsList artists={artistRelatedArtists} />
    </div>
  );
}

export default Artist;
