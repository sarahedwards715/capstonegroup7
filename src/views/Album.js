import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Placeholder } from "semantic-ui-react";
import AlbumsList from "../components/albumsList/AlbumsList";
import SongList from "../components/songList/SongList";
import {
  getAlbum,
  getAlbumTracks,
  getArtistAlbums,
} from "../services/spotAPIRequests";
import useStore from "../store/store";

function Album(props) {
  const [albumInfo, setAlbumInfo] = useState({
    name: "",
    artist: {},
    image: null,
    genres: [],
  });
  const [albumTracks, setAlbumTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);

  const album_id = props.match.params.album_id;
  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAlbum(accessToken, album_id).then((data) => {
      console.log(data);
      setAlbumInfo({
        name: data.name,
        artist: data.artists[0],
        image: data.images[0].url,
        genres: data.genres,
      });
    });
    getAlbumTracks(accessToken, album_id).then((data) => {
      console.log("TRACKS", data);
      setAlbumTracks(data.items);
    });
  }, [props]);

  useEffect(() => {
    if (albumInfo.artist?.id) {
      getArtistAlbums(accessToken, albumInfo.artist.id).then((data) => {
        console.log("ALBUMS", data);
        setArtistAlbums(data.items);
      });
    }
  }, [albumInfo]);

  return (
    <div className="albumPageWrapper">
      <div className="albumPageHeader">
        <div className="albumPageBanner">{albumInfo.name}</div>
        <div className="viewsSubBanner">
          <Link to={"/artists/" + albumInfo.artist.id}>
            {albumInfo.artist.name}
          </Link>
        </div>
      </div>
      <div className="albumPageBody">
        <div className="bodyLeftRow">
          {albumInfo.image ? (
            <div className="albumPageMainArt">
              <img
                className="albumPageMainArt"
                src={albumInfo.image}
                alt="cover_art"
              />
            </div>
          ) : (
            <Placeholder.Image />
          )}
        </div>
        <div className="bodyRightRow">
          {albumTracks.length ? (
            <SongList songs={albumTracks} albumName={albumInfo.name} />
          ) : (
            <Loader active size="big">
              Loading . . .
            </Loader>
          )}
        </div>
      </div>
      <div className="albumPageAlbumsColumn">
        <div className="viewsSubBanner">Albums By {albumInfo.artist.name} </div>
        <AlbumsList albums={artistAlbums} />
      </div>
    </div>
  );
}

export default Album;
