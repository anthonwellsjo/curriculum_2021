import React, { useContext } from 'react';
import { PageContext } from '../contexts/pageContext';
import * as ga from '../../lib/ga';


const useRedirect = () => {
  const [page, setPage] = useContext(PageContext);
  const url: string = history.state.as;
  if (url != null) {
    const uv1 = url.split("/")[1];


    if (uv1 === "bio" || uv1 === "work" || uv1 === "social") {
      if (page.currentPage != uv1) {
        setPage(prev => ({ ...prev, currentPage: uv1 }));
      }
    }
    if (uv1 === "main") {
      if (page.currentPage != uv1) {
        setPage(prev => ({ ...prev, currentPage: uv1 }));
      }
    }
    console.log("url", uv1);

  }

  return null;
}

export default useRedirect;