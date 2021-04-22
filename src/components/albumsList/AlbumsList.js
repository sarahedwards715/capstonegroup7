import "./AlbumList.scss";
import React from "react";
import AlbumCard from "../albumCard/AlbumCard";

function AlbumsList(props) {
  return (
    <div className="albumsListWrapper">
      <div className="artistPageSubBanner">albums</div>
      <div className="artistPageCardContainer">
        {props.albums.map((album) => {
          return <AlbumCard album={album} key={album.id} />;
        })}
      </div>
    </div>
  );
}

export default AlbumsList;
