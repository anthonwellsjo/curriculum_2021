import React, { useContext, useEffect, useState } from 'react';
import { useTransition, animated } from 'react-spring'
import useSound from 'use-sound';
import { PageContext } from '../../contexts/pageContext';

interface props {
  tech: tech[],
  onFinishedAnimation: () => void,
  itemsPerRow: number
}

const TechContainer = ({ tech, onFinishedAnimation, itemsPerRow }: props) => {
  const [items, setItems] = useState<tech[]>([]);
  const [page, setPage] = useContext(PageContext);
  const [playClick] = useSound("/pop.wav");
  let x = 0;
  const [sound, setSound] = useState(0.1);

  useEffect(() => {
    let interval = setInterval(() => {
      if (tech[x] !== undefined) {
        setItems(prev => ([...prev, tech[x]]));
        x++;
      } else {
        clearInterval(interval);
      }
      if (tech.length - 1 === x) {
        onFinishedAnimation();
      }
    }, 100);

    return () => { 
      clearInterval(interval) 
    };
  }, [])

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    config: { mass: 1, tension: 200 },
    onStart: () => { if (page.audio) { playClick({ playbackRate: sound }); setSound(sound + (3 / tech.length)) } }
  })


  return (
    <div style={{
      display: "grid",
      height: `${Math.ceil(tech.length / itemsPerRow) * 60}px`,
      maxWidth: "80%",

      width: "auto",
      gridColumnGap: "10px",
      gridRowGap: "10px",
      gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
      gridTemplateRows: `repeat(${Math.ceil(tech.length / itemsPerRow)}, 1fr)`,
      padding: "10px",
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