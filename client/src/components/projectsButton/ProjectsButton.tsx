import React, { useContext, useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import { useViewport } from '../../hooks/useViewPort';
import classes from './ProjectsButton.module.scss';

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
    <>
      <div style={{ position: "fixed", top: "100px", left: "8px", right: 0, bottom: "3px", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none", backgroundColor: "transparent" }}>
        <animated.button className={classes.text} style={{ ...style, fontFamily: "'Lato', sans-serif", fontSize: `5em`, textTransform: "lowercase", marginTop: "-99px", marginLeft: "-1px"}}>See my projects!</animated.button>
      </div>
    </>
  )
}

export default ProjectsButton;