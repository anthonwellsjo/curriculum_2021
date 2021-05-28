import React, { useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring'

interface props {
  tech: tech[]
}

const TechContainer = ({ tech }: props) => {
  const [items, setItems] = useState<tech[]>([]);

  let x = 0;

  useEffect(() => {
    let interval = setInterval(() => {
      console.log("interval");
      if (tech[x] !== undefined) {
        setItems(prev => ([...prev, tech[x]]));
        x++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => { clearInterval(interval) };
  }, [])

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  })


  return (
    <div style={{
      display: "grid",
      maxWidth:"80%",
      minWidth:"300px",
      width: "400px",
      gridColumnGap: "10px",
      gridRowGap: "10px",
      gridTemplateColumns: "repeat(5, 1fr)",
      padding: "10px",
      // backgroundColor: "yellow"
    }}>
      { transitions(({ opacity, transform }, items) => (
        <animated.div
          style={{
            opacity: opacity.to(y => y),
            transform: transform.to(z => z)
          }}>
          <div style={{
            // backgroundColor: "red",
            width: "50px",
            display: "inline"
          }}>
            {/* <p style={{ textAlign: "center", fontFamily: "Martel", fontWeight: 800, fontSize: "1.8em", marginTop: "2px" }}>{items.techlogo.asset.url}</p> */}
            <img src={`${items.techlogo.asset.url}`} style={{ width: "50px" }} />
          </div>

        </animated.div>
      ))}
    </div >
  )
}

export default TechContainer;