import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useViewport } from '../../hooks/useViewPort';

const ProjectsButton: React.FC = () => {
  const { width, height } = useViewport();
  const [clicked, setClicked] = useState(false);
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: {
      mass: 1,
      tension: 500,
      friction: 40
    },
    delay: 1000
  }
  )
  const clickEventHandler = (e) => {
    setClicked(true);
  }
  if (clicked) return null;
  return (
    <div onClick={clickEventHandler} style={{ width: "100vw", height: `${height - 100}px`, position: "absolute", display: "flex", alignItems: "center", justifyContent: "center",  userSelect: "none", top: "100px", backdropFilter: "blur(1px)" }}>
      <animated.h1 style={{ ...style, fontFamily: "Trochut", fontSize: width > 588 ? "10em" : "5em", textTransform: "lowercase", marginTop: "-100px", color: "lightgrey" }}>Projects</animated.h1>
    </div>
  )
}

export default ProjectsButton;