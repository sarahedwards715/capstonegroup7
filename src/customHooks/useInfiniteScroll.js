import { useState, useEffect } from "react";

const useInfiniteScroll = (callback) => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    if (atBottom) {
      setTimeout(() => {
        if (callback) callback();
        console.log("AT BOTTOM FROM HOOK");
        setAtBottom(false);
      }, 1000);
    }
  }, [atBottom]);

  return [atBottom, setAtBottom];
};

export default useInfiniteScroll;
