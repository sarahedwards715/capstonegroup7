import React, { useEffect, useState } from "react";
import placeholder from "./../assets/images/albumPlaceholder.jpg";
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
import "./views.scss";

function Album(props) {
  const [albumInfo, setAlbumInfo] = useState({
    name: "",
    artist: {},
    image: null,
    genres: [],
  });
  const [albumTracks, setAlbumTracks] = useState([]);
  const [artistAlbums, setArtistAlbums] = useState([]);
  const [artistTotalAlbums, setArtistTotalAlbums] = useState(0);
  const [artistAlbumsOffset, setArtistAlbumsOffset] = useState(0);

  const album_id = props.match.params.album_id;
  const accessToken = useStore((state) => state.accessToken);

  useEffect(() => {
    window.scrollTo(0, 0);
    getAlbum(accessToken, album_id).then((data) => {
      console.log(data);
      setAlbumInfo({
        name: data.name,
        artist: data.artists[0],
        image: data.images[0]?.url || placeholder,
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
        setArtistAlbums(data.items);
        setArtistTotalAlbums(data.total);
      });
    }
  }, [albumInfo]);

  function infiniteScrollAlbums() {
    if (artistAlbums.length < artistTotalAlbums) {
      return getArtistAlbums(
        accessToken,
        albumInfo.artist.id,
        10,
        artistAlbumsOffset
      )
        .then((data) => {
          let newAlbums = data.items.filter((album) =>
            artistAlbums.some((oldAlbum) => oldAlbum.id !== album.id)
          );

          let moreAlbums = [...artistAlbums, ...newAlbums];

          console.log(newAlbums);

          setArtistAlbums(moreAlbums);
        })
        .then(
          setArtistAlbumsOffset(
            (artistAlbumsOffset) => (artistAlbumsOffset += 10)
          )
        );
    }
  }

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
        <AlbumsList
          albums={artistAlbums}
          infiniteScrollCallback={infiniteScrollAlbums}
        />
      </div>
    </div>
  );
}

export default Album;
