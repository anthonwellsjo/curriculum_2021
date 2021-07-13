import React, { useContext, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useRouter } from 'next/router'

interface props {
  color: string
}

const ToProjectsFromBallTransition = ({ color }: props) => {
  const router = useRouter();

  useEffect(() => {

  }, []);

  const styles = useSpring({
    to: [{ transform: "scale(500)" },],
    from: { transform: "scale(1)" },
    config: {
      mass: 50
    }
  })

  return (
    < animated.div
      style={{
        ...styles,
        position:"absolute",
        left:"50%",
        marginTop:"20px",
        height: "5px",
        width: "5px",
        borderRadius: "5px",
        backgroundColor: color,
      }} />
  )
}

export default ToProjectsFromBallTransition;