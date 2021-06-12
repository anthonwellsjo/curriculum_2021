import React, { useContext } from 'react';
import { PageContext } from '../contexts/pageContext';

const useRedirect = () => {
  const [page, setPage] = useContext(PageContext);
  const url: string = history.state.as;
  if (url != null) {
    console.log("url", url.split("/")[1], url.split("/")[2]);
    const uv1 = url.split("/")[1];


    if (uv1 === "bio" || uv1 === "work" || uv1 === "social") {
      if (page.currentPage != uv1) {
        setPage(prev => ({ ...prev, currentPage: uv1 }));
        console.log("setting page", uv1);
      }
    }
    if (uv1 === "main") {
      if (page.currentPage != uv1) {
        setPage(prev => ({ ...prev, currentPage: uv1 }));
        console.log("setting main page");
      }
    }

    // const uv2 = url.split("/")[2];
    // if (uv1 === "project" && uv2 != null) {
    //   if (page.currentPage != `project/${uv2}`) {
    //     setPage(prev => ({ ...prev, currentPage: `project/${uv2}`, currentProject: [`${uv2}`] }));
    //     console.log("setting main page");
    //   }
    // }
  }

  return null;
}

export default useRedirect;