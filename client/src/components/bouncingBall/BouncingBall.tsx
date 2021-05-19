
import { useSpring } from '@react-spring/core';
import React, { useContext, useState } from 'react';
import { animated } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useGetRandomPosition from '../../hooks/useGetRandomPosition';
import classes from './BouncingBall.module.scss';
import CSS from 'csstype';
import useMaybe from '../../hooks/useMaybe';
import Dragon from '../dragon/Dragon';
import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { mySanityClient } from '../../sanity/sanityClient';
import client from '../../apollo/apolloClient';
import { gql } from '@apollo/client';


interface state {
  position: { top: string, left: string },
  tension: number
}

interface props {
  project: Project
}

const BouncingBall = ({ project }: props) => {
  if (project.mainImage) { console.log("project", project.mainImage.asset.url); }


  const [hovering, setHovering] = useState(false);
  const [awakenDragon, setAwakenDragon] = useState(false);
  const splashStrut = useMaybe();
  const randomPosition = useGetRandomPosition();
  const [page, setPage] = useContext(PageContext);
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

  return (
    <animated.div style={{ ...styles, position: "fixed", }}>
      <div style={{ position: "absolute", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <div>
          <animated.div onClick={() => setAwakenDragon(true)} onMouseEnter={onMouseEnterEventHandler} onMouseLeave={onMouseLeaveEventHandler}
            style={{
              backgroundColor: page.slowMo || hovering ? project.projectColor : "black",
              transform: page.slowMo || hovering ? "scale(7)" : "scale(1)",
              cursor: "pointer",
              overflow: "hidden",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }}
            className={classes.ball} >
            {project.mainImage !== null && (page.slowMo || hovering) && <div style={{
              position: "absolute",
            }}>
              <img src={`${project.mainImage.asset.url}`} width="10px" height="10px" />
            </div>}
          </animated.div>
        </div>
        {awakenDragon && <Dragon project={project} />}
        <animated.div style={{ overflow: "hidden", whiteSpace: "nowrap", ...spanStyle, zIndex: 2, marginTop: "30px" }}>
          <span >{project.title}</span>
        </animated.div>
      </div>
    </animated.div>
  )
}


export default BouncingBall;