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
  const [artistTotalAlbums, setArtistTotalAlbums] = useState(0);
  const [artistAlbumsOffset, setArtistAlbumsOffset] = useState(0);

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
      setArtistTotalAlbums(data.total);
    });
    getArtistTracks(accessToken, artist_id).then((data) => {
      setArtistTracks(data.tracks);
    });
    getRelatedArtists(accessToken, artist_id).then((data) => {
      setArtistRelatedArtists(data.artists);
    });
  }, [props]);

  function infiniteScrollAlbums() {
    if (artistAlbums.length < artistTotalAlbums) {
      return getArtistAlbums(accessToken, artist_id, 10, artistAlbumsOffset)
        .then((data) => {
          let newAlbums = data.items.filter(
            (album) => !artistAlbums.includes(album)
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
    <div className="artistPageWrapper">
      <div className="artistPageHeader">
        <div className="headerLeftRow">
          {artistInfo.image ? (
            <div
              className="artistPageMainArt"
              style={{
                backgroundImage: `url(${artistInfo.image})`,
                backgroundSize: "cover",
              }}
            >
              {/* <img
                className="artistPageMainImage"
                src={artistInfo.image}
                alt="img"
              /> */}
            </div>
          ) : (
            <Placeholder.Image />
          )}
          <div className="artistPageBanner">{artistInfo.name}</div>
        </div>
        <div className="headerRightRow">
          <div className="viewsSubBanner">top tracks</div>

          {artistTracks.length ? (
            <SongList songs={artistTracks} />
          ) : (
            <Loader active size="big">
              Loading . . .
            </Loader>
          )}
        </div>
      </div>
      <div className="artistPageAlbumsColumn">
        <div className="viewsSubBanner">
          appears on {artistTotalAlbums} albums
        </div>
        <AlbumsList
          albums={artistAlbums}
          infiniteScrollCallback={infiniteScrollAlbums}
        />
      </div>
      <div className="artistPageArtistsColumn">
        <div className="viewsSubBanner">related artists</div>
        <ArtistsList artists={artistRelatedArtists} />
      </div>
    </div>
  );
}

export default Artist;
