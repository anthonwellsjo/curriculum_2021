
import { useSpring } from '@react-spring/core';
import React, { useContext, useState } from 'react';
import { animated } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useGetRandomPosition from '../../hooks/useGetRandomPosition';
import classes from './BouncingBall.module.scss';

interface state {
  position: { top: string, left: string },
  tension: number
}

interface props {
  color: string
}

const BouncingBall = ({ color }: props) => {
  const [page, setPage] = useContext(PageContext);
  const scale = `scale(${Math.random()})`
  const firstPosition = useGetRandomPosition();
  const [state, setState] = useState<state>({ tension: 500, position: firstPosition });
  const styles = useSpring({
    to: {...firstPosition, transform: scale},
    from: {...useGetRandomPosition(), transform: scale},
    config: {
      mass: 1,
      friction: 20,
      tension: page.slowMo ? 2 : 400,
    },
    delay: Math.floor(Math.random() * 4000),
    onRest: () => setState(prev => ({ ...prev, position: useGetRandomPosition() })),
  })

  return (
    <animated.div style={{ ...styles, position: "fixed", }}>
      <animated.div style={{ backgroundColor: page.slowMo ? color : "black", transform: page.slowMo ? "scale(3)" : "scale(1)" }} className={classes.ball} />
    </animated.div>
  )
}

export default BouncingBall;