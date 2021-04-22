import "./AlbumList.scss";
import React from "react";
import AlbumCard from "../albumCard/AlbumCard";
import useInfiniteScroll from "../../customHooks/useInfiniteScroll";

function AlbumsList(props) {
  function handleScroll(event) {
    const scrollable = event.target;

    if (
      scrollable.scrollWidth - scrollable.scrollLeft ===
      scrollable.clientWidth
    ) {
      setAtBottom(true);
    }
  }

  const [atBottom, setAtBottom] = useInfiniteScroll(
    props.infiniteScrollCallback
  );

  return (
    <div className="albumsListWrapper">
      <div
        onScroll={(e) => handleScroll(e)}
        className="albumsListCardContainer"
      >
        {props.albums.map((album) => {
          return <AlbumCard album={album} key={album.id} />;
        })}
      </div>
    </div>
  );
}

export default AlbumsList;
