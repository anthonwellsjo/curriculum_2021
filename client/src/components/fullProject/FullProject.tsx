import React, { useContext } from 'react';
import { PageContext } from '../../contexts/pageContext';



const FullProject = () => {
  const [page, setPage] = useContext(PageContext);
  const onClickEventHandler=(event)=>{
    event.stopPropagation();
    setPage(prev => ({ ...prev, currentProject: null, showProjects: false, slowMo: false }));
  }


  return (
    <div style={{ position: "fixed", left: 0, top: 0, right: 0, bottom: 0, backgroundColor: page.currentProject.projectColor, zIndex: 1, textAlign: "center", userSelect: "none" }}>
      <h3 onClick={onClickEventHandler}>
        X
      </h3>
      <h1>{(page.currentProject as Project).title}</h1>
    </div>
  )
}

export default FullProject;