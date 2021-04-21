import React from "react";
import useStore from "../store/store";

function Album() {
  const accessToken = useStore((state) => state.accessToken);

  return (
  <div className = "albumPageWrapper">
      <div className = "albumPageBanner"></div>
  </div>
  )
}

export default Album;
