import React, { useEffect, useState } from "react";
import AlbumsList from "../components/albumsList/AlbumsList";
import ArtistsList from "../components/artistsList/ArtistsList";
import SongList from "../components/songList/SongList";
import { searchQuery } from "../services/spotAPIRequests";
import useStore from "../store/store";

function Search(props) {
  const accessToken = useStore((state) => state.accessToken);
  const query = props.match.params.query;
  const [searchedTracks, setSearchedTracks] = useState([]);
  const [searchedArtists, setSearchedArtists] = useState([]);
  const [searchedAlbums, setSearchedAlbums] = useState([]);

  useEffect(() => {
    searchQuery(accessToken, query, "track").then((data) => {
      console.log("SEARCH TRACKS", data);
      setSearchedTracks(data.tracks.items);
    });
    searchQuery(accessToken, query, "artist").then((data) => {
      console.log("SEARCH ARTISTS", data);
      setSearchedArtists(data.artists.items);
    });
    searchQuery(accessToken, query, "album").then((data) => {
      console.log("SEARCH ALBUMS", data);
      setSearchedAlbums(data.albums.items);
    });
  }, [props]);

  return (
    <div className="searchPageWrapper">
      <div className="searchPageHeader">
        <div className="viewsSubBanner">Showing Results For {query}</div>
      </div>
      <div className="searchPageBody">
        <div className="searchPageArtistsColumn">
          <div className="viewsSubBanner">artists</div>
          <ArtistsList artists={searchedArtists} />
        </div>
        <div className="searchPageTracksColumn">
          <div className="viewsSubBanner">tracks</div>
          <SongList songs={searchedTracks} />
        </div>
        <div className="searchPageAlbumsColumn">
          <div className="viewsSubBanner">albums</div>
          <AlbumsList albums={searchedAlbums} />
        </div>
      </div>
    </div>
  );
}

export default Search;
