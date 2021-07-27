import React, { useContext } from 'react';
import useSound from 'use-sound';
import { PageContext } from '../contexts/pageContext';

const useMenuButtons = () => {
  const [playClose] = useSound("/closepage.wav");
  const [playOpen] = useSound("/click.wav");
  const [page, setPage] = useContext(PageContext);

  const clickBio = () => {
    console.log("clicked bio");
    if (page.currentPage === "bio") {
        const newState = { ...page, currentPage: "main" };
        setPage(prev => ({ ...newState }));
        window.history.pushState({ ...newState }, newState.currentPage, `/${newState.currentPage}`);
      if (page.audio) playClose({ playbackRate: 1.8 });
    }
    if (page.currentPage !== "bio") {
      const newState = { ...page, currentPage: "bio" };
      setPage(prev => ({ ...newState }));
      window.history.pushState({ ...newState }, newState.currentPage, `/${newState.currentPage}`);
      if (page.audio) playOpen();
    }
  }
  const clickSocial = () => {
    console.log("clicked social");
    if (page.currentPage === "social") {
      const newState = { ...page, currentPage: "main" };
      setPage(prev => ({ ...newState }));
      window.history.pushState({ ...newState }, newState.currentPage, `/${newState.currentPage}`);
      if (page.audio) playClose({ playbackRate: 1.8 });
    }
    if (page.currentPage !== "social") {
      const newState = { ...page, currentPage: "social" };
      setPage(prev => ({ ...newState }));
      window.history.pushState({ ...newState }, newState.currentPage, `/${newState.currentPage}`);
      if (page.audio) playOpen();
    }
  }
  const clickWork = () => {
    console.log("clicked work");
    if (page.currentPage === "work") {
      const newState = { ...page, currentPage: "main" };
      setPage(prev => ({ ...newState }));
      window.history.pushState({ ...newState }, newState.currentPage, `/${newState.currentPage}`);
      if (page.audio) playClose({ playbackRate: 1.8 });
    }
    if (page.currentPage !== "work") {
      const newState = { ...page, currentPage: "work" };
      setPage(prev => ({ ...newState }));
      window.history.pushState({ ...newState }, newState.currentPage, `/${newState.currentPage}`);
      if (page.audio) playOpen();
    }
  }



  return { clickBio, clickSocial, clickWork }
}

export default useMenuButtons;