
import { useSpring } from '@react-spring/core';
import React, { useContext, useState } from 'react';
import { animated } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useGetRandomPosition from '../../hooks/useGetRandomPosition';
import classes from './BouncingBall.module.scss';
import CSS from 'csstype';
import useMaybe from '../../hooks/useMaybe';

const spanStyle: CSS.Properties = {
  transform: "rotate(90deg 90deg)"
}

interface state {
  position: { top: string, left: string },
  tension: number
}

interface props {
  project: Project
}

const BouncingBall = ({ project }: props) => {
  const [page, setPage] = useContext(PageContext);
  const firstPosition = { left: "50%", top: "50%" };
  const spanStyle = useSpring({
    reverse: !page.slowMo,
    to: { opacity: page.slowMo ? 1 : 0 },
    from: { opacity: 0 }
  })
  const styles = useSpring({
    from: firstPosition,
    to: {
      left: page.projects[`${project._id}`].left,
      top: page.projects[`${project._id}`].top,
    },
    config: {
      mass: 1,
      friction: 20,
      tension: page.slowMo ? 2 : 400,
    },
    delay: Math.floor(Math.random() * 4000),
    onRest: () => setPage(prev => ({ ...prev, splashASprut: useMaybe(), projects: { ...prev.projects, [`${project._id}`]: { ...project, ...useGetRandomPosition() } } })),
  })

  return (
    <animated.div style={{ ...styles, position: "fixed", }}>
      <div style={{ position: "absolute", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div>
          <animated.div style={{ backgroundColor: page.slowMo ? project.projectColor : "black", transform: page.slowMo ? "scale(6)" : "scale(1)", cursor: "pointer" }} className={classes.ball} />
        </div>
        <animated.div style={{ overflow: "hidden", whiteSpace: "nowrap", ...spanStyle, zIndex: 2, marginTop: "30px" }}>
          <span >{project.title}</span>
        </animated.div>
      </div>
    </animated.div>
  )
}

export default BouncingBall;