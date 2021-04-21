import "./ArtistsList.scss";
import React from "react";
import ArtistsCard from "../artistsCard/ArtistsCard";

function ArtistsList(props) {
  return (
    <div className="artistsListWrapper">
      <div className="artistPageSubBanner">related artists</div>
      <div className="artistPageCardContainer">
        {props.artists.map((artist) => {
          return <ArtistsCard artist={artist} key={artist.id} />;
        })}
      </div>
    </div>
  );
}

export default ArtistsList;
