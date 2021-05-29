import React, { useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { useViewport } from '../../hooks/useViewPort';

const ProjectsButton: React.FC = () => {
  const { width, height } = useViewport();
  const [clicked, setClicked] = useState(false);
  const style = useSpring({
    from: { transform: "scale(0)" },
    to: { transform: "scale(1)" },
    config: {
      mass: 1,
      tension: 300,
      friction: 30
    },
    delay: 2000
  }
  )
  const clickEventHandler = (e) => {
    setClicked(true);
  }
  if (clicked) return null;
  return (
    <div onClick={clickEventHandler} style={{ width: "100vw", height: `${height - 100}px`, position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", userSelect: "none", top: "100px", backdropFilter: "blur(2px)" }}>
      <animated.h1 style={{ ...style, fontFamily: "Trochut, cursive", fontSize: "1em", textTransform: "uppercase", marginTop: "-100px", color: "grey" }}>Click To See Projects</animated.h1>
    </div>
  )
}

export default ProjectsButton;