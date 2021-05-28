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
    }, 300);

    return () => { clearInterval(interval) };
  }, [])

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
  })


  return (
    <div style={{ display: 'flex', flexDirection:"row" }}>
      {transitions(({ opacity, transform }, items) => (
        <animated.div
          style={{
            opacity: opacity.to(y => y),
            transform: transform.to(z => z)
          }}>
          <div style={{ width: "100%", height: "30px", borderRadius: "0 15px" }}>
            {/* <p style={{ textAlign: "center", fontFamily: "Martel", fontWeight: 800, fontSize: "1.8em", marginTop: "2px" }}>{items.techlogo.asset.url}</p> */}
            <img src={`${items.techlogo.asset.url}`} style={{width: "50px", height: "50px"}} />
          </div>
        </animated.div>
      ))}
    </div>
  )
}

export default TechContainer;