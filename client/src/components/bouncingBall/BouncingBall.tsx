
import { useSpring } from '@react-spring/core';
import React, { useContext, useEffect, useState } from 'react';
import { animated } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import classes from './BouncingBall.module.scss';
import useMaybe from '../../hooks/useMaybe';
import ToProjectsFromBallTransition from '../toProjectsFromBallTransition/ToProjectsFromBallTransition';
import useGetRandomPosition from '../../hooks/useGetRandomPosition';


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
  const firstPosition = { left: "50%", top: "50%" };
  let timerPositioner = null;
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
      mass: page.slowMo ? 2 : 1,
      friction: page.slowMo ? 100 : 20,
      tension: page.slowMo ? 500 : 100,
    },
    delay: !page.slowMo ? Math.floor((Math.random() * 1000) + 300) : 0,
    onRest: () => { if (!page.slowMo) setPage(prev => ({ ...prev, splashASprut: { letsDoIt: splashStrut, position: useGetRandomPosition() }, projects: { ...prev.projects, [`${project._id}`]: hovering ? prev.projects[`${project._id}`] : { ...project, ...useGetRandomPosition() } } })) },
  })

  const onMouseEnterEventHandler = () => {
    if (page.slowMo) {
      setHovering(true);
      setPage(prev => ({ ...prev, somethingHovering: true }));
    } else {
      setPage(prev => ({ ...prev, projects: { ...prev.projects, [`${project._id}`]: hovering ? prev.projects[`${project._id}`] : { ...project, ...useGetRandomPosition() } } }))
    }
  }
  const onMouseLeaveEventHandler = () => {
    setHovering(false);
    setPage(prev => ({ ...prev, somethingHovering: false }));
  }

  const onClickEventHandler = (event) => {
    event.stopPropagation();
    if (page.slowMo) {
      const newState = { ...page, currentProject: project };
      setPage(prev => ({ ...newState }));
      window.history.pushState({ ...newState }, page.currentPage, `/project/${project.slug.current}`);
      setShowProject(true);
    }
  }

  useEffect(() => {
    timerPositioner = () => {
      setInterval(()=>{
        
      })
    }
  })


  return (
    <animated.div onClick={onClickEventHandler} onMouseEnter={onMouseEnterEventHandler} onMouseLeave={onMouseLeaveEventHandler} style={{ ...styles, width: "100px", height: "100px", marginTop: "-50px", marginLeft: "-50px", position: "fixed", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div>
          <animated.div style={{ position: "absolute", overflow: "hidden", whiteSpace: "nowrap", ...spanStyle, transform: hovering ? "rotate(0deg)" : "rotate(10deg)", zIndex: 2, marginLeft: hovering ? "0" : "20px", bottom: hovering ? "60px" : "50px", transition: "all .3s" }}>
            <span style={{ fontFamily: "'Lato', sans-serif", textTransform: "lowercase", }}>{project.title}</span>
          </animated.div>
          <animated.div
            style={{
              backgroundColor: page.slowMo?  project.projectColor : "black",
              height: page.slowMo ? "50px" : "5px",
              width: page.slowMo ? "50px" : "5px",
              cursor: "pointer"
            }}
            className={classes.ball} >
            {showProject && <ToProjectsFromBallTransition color={project.projectColor} />}
          </animated.div>
        </div>
      </div>
    </animated.div>
  )
}


export default BouncingBall;