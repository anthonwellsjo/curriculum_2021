import React, { createContext, useState } from 'react';

let page = {};
let setPage;

const PageContext = createContext([page, setPage])

const PageProvider: React.FC = ({ children }) => {
  const [page, setPage] = useState<PageContextData>({
    slowMo: false,
    splashASprut: { letsDoIt: false, position: { left: "", top: "" } },
    projects: [],
    somethingHovering: false,
    showProjects: false,
    currentProject: null,
    showBalls: true,
    currentPage: "main",
    showHeaderButtons: false,
    renderHeaderButtons: false,
    audio: true,
    firstStartDone: false,
    techModal: { open: false, tech: null }
  });
  return (
    <PageContext.Provider value={[page, setPage]}>
      {children}
    </PageContext.Provider>
  )
};

export { PageContext };
export { PageProvider };

