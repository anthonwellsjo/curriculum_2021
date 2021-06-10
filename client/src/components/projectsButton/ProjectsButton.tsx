import React, { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import { useViewport } from '../../hooks/useViewPort';

const ProjectsButton: React.FC = () => {
  const { width, height } = useViewport();
  const [page, setPage] = useContext(PageContext);
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: !page.slowMo && page.showBalls ? 1 : 0 },
    config: {
      mass: 1,
      tension: 500,
      friction: 40
    },
    delay: page.slowMo && page.showBalls ? 0 : 1000
  }
  )



  return (
    <div style={{ position: "fixed", top: "100px", left: "8px", right: 0, bottom: "3px", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none" }}>
      <animated.h1 style={{ ...style, fontFamily: "Trochut", fontSize: `2.5em`, textTransform: "lowercase", marginTop: "-100px" }}>Proiects</animated.h1>
      <div style={{ position: "absolute", width: "10px", height: "10px", marginBottom: "145px", marginRight: "8px", backgroundColor: "white", zIndex: 1 }} />
    </div>
  )
}

export default ProjectsButton;