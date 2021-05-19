
import { useSpring } from '@react-spring/core';
import React, { useContext, useState } from 'react';
import { animated } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useGetRandomPosition from '../../hooks/useGetRandomPosition';
import classes from './BouncingBall.module.scss';
import useMaybe from '../../hooks/useMaybe';
import ToProjectsFromBallTransition from '../toProjectsFromBallTransition/toProjectsFromBallTransition';


interface state {
  position: { top: string, left: string },
  tension: number
}

interface props {
  project: Project
}

const BouncingBall = ({ project }: props) => {


  const [hovering, setHovering] = useState(false);
  const [showProject, setShowProject] = useState(false);
  const [page, setPage] = useContext(PageContext);
  const splashStrut = useMaybe();
  const randomPosition = useGetRandomPosition();
  const firstPosition = { left: "50%", top: "50%" };
  const spanStyle = useSpring({
    to: { opacity: page.slowMo || hovering ? 1 : 0 },
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
      tension: page.slowMo || hovering ? 2 : 300,
    },
    delay: Math.floor(Math.random() * 4000),
    onRest: () => setPage(prev => ({ ...prev, splashASprut: { letsDoIt: splashStrut, position: randomPosition }, projects: { ...prev.projects, [`${project._id}`]: hovering ? prev.projects[`${project._id}`] : { ...project, ...randomPosition } } })),
  })

  const onMouseEnterEventHandler = () => {
    setHovering(true);
    setPage(prev => ({ ...prev, somethingHovering: true }));
  }
  const onMouseLeaveEventHandler = () => {
    setHovering(false);
    setPage(prev => ({ ...prev, somethingHovering: false }));
  }

  const onClickEventHandler = () => {
    setPage(prev => ({ ...prev, showProjects: true, currentProject: project }));
    setShowProject(true);
  }

  return (
    <animated.div style={{ ...styles, position: "fixed", }}>
      <div style={{ position: "absolute", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div>
          <animated.div onClick={onClickEventHandler} onMouseEnter={onMouseEnterEventHandler} onMouseLeave={onMouseLeaveEventHandler}
            style={{
              backgroundColor: page.slowMo || hovering ? project.projectColor : "black",
              transform: page.slowMo || hovering ? "scale(7)" : "scale(1)",
              cursor: "pointer"
            }}
            className={classes.ball} >
            {page.showProjects && showProject && <ToProjectsFromBallTransition color={project.projectColor} />}
          </animated.div>
        </div>
        <animated.div style={{ overflow: "hidden", whiteSpace: "nowrap", ...spanStyle, zIndex: 2, marginTop: "30px" }}>
          <span >{project.title}</span>
        </animated.div>
      </div>
    </animated.div>
  )
}


export default BouncingBall;