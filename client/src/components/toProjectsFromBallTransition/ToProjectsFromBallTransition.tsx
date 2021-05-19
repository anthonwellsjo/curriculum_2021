import React, { useContext, useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { useRouter } from 'next/router'

interface props {
  color: string
}

const ToProjectsFromBallTransition = ({ color }: props) => {
  const router = useRouter();

  useEffect(() => {
    console.log("use effect");
    console.log("routing");
    router.push("/projects/");
  }, []);

  const styles = useSpring({
    to: [{ transform: "scale(200)" },],
    from: { transform: "scale(1)" }
  })

  return (
    < animated.div
      style={{
        ...styles,
        height: "5px",
        width: "5px",
        borderRadius: "5px",
        backgroundColor: color,
      }} />
  )
}

export default ToProjectsFromBallTransition;