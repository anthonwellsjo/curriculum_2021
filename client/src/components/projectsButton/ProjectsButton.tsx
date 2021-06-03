import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useViewport } from '../../hooks/useViewPort';

const ProjectsButton: React.FC = () => {
  const { width, height } = useViewport();
  const [fontsize, setFontsize] = useState(50);
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

  useEffect(() => {
    setFontsize(Math.floor(width / 5));
  }, [width])

  const clickEventHandler = (e) => {
    setClicked(true);
  }
  if (clicked) return null;
  return (
    <div onClick={clickEventHandler} style={{ position: "absolute", top: "100px", left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none" }}>
      <animated.h1 style={{ ...style, fontFamily: "Trochut", fontSize: `${fontsize}px`, textTransform: "lowercase", marginTop: "-100px", color: "lightgrey" }}>Projects</animated.h1>
    </div>
  )
}

export default ProjectsButton;