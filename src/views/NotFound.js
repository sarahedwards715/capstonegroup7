import React from "react";
import { Link } from "react-router-dom";

function NotFound(props) {
  return (
    <div className="notFoundWrapper">
      <div className="notFoundBanner">
        <p className="notFoundText">404! Page Not Found</p>
      </div>
      <Link to="/" className="notFoundReturn">
        Return to the Landing Page!
      </Link>
    </div>
  );
}

export default NotFound;
