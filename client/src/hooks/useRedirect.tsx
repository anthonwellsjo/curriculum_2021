import React, { useContext } from 'react';
import { PageContext } from '../contexts/pageContext';

const useRedirect = (url: string) => {
  const [page, setPage] = useContext(PageContext);
  if (url != null) {
    console.log("url", url.split("/")[1], url.split("/")[2]);
    const uv1 = url.split("/")[1];
    const uv2 = url.split("/")[2];

    if (uv1 === "bio" || uv1 === "work" || uv1 === "social") {
      if (page.currentPage != uv1) {
        setPage(prev => ({ ...prev, currentPage: uv1 }));
        console.log("setting page");
      }
    }
  }

  return null;
}

export default useRedirect;