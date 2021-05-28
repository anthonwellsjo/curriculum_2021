import { useSpring } from '@react-spring/core';
import React, { useContext, useEffect, useState } from 'react';
import { animated } from 'react-spring';
import useSound from 'use-sound';
import { PageContext } from '../../contexts/pageContext';
import { useViewport } from '../../hooks/useViewPort';

const Social: React.FC = () => {
  const { width, height } = useViewport();
  const [playClose] = useSound("/closepage.wav", { volume: 0.4 });
  const [playClick] = useSound("/click.wav");
  const [playPop] = useSound("/pop.wav");
  const [page, setPage] = useContext(PageContext);
  const [closeIt, setCloseIt] = useState(false);
  const style1 = useSpring({
    reverse: closeIt,
    to: { transform: "scale(1)" },
    from: { transform: "scale(0)" },
    config: {
      mass: 1,
      friction: 15,
      tension: 100
    },
    delay: 500,
    onStart: () => playPop({ playbackRate: (Math.random() + 0.5) })
  })
  const style2 = useSpring({
    reverse: closeIt,
    to: { transform: "scale(1)" },
    from: { transform: "scale(0)" },
    delay: 800,
    config: {
      mass: 1,
      friction: 15,
      tension: 100
    },
    onStart: () => playPop({ playbackRate: (Math.random() + 0.5) })
  })
  const style3 = useSpring({
    reverse: closeIt,
    to: { transform: "scale(1)" },
    from: { transform: "scale(0)" },
    delay: 100,
    config: {
      mass: 1,
      friction: 15,
      tension: 100
    },
    onStart: () => playPop({ playbackRate: (Math.random() + 0.5) })
  })

  let timeout;
  const onClickEventHandler = (e) => {
    playClose();
    e.stopPropagation();
    setCloseIt(true);
    timeout = setTimeout(() => {
      setPage(prev => ({ ...prev, currentPage: "main", slowMo: false }));
    }, 1000)
  }

  useEffect(() => {
    return () => { clearTimeout(timeout); }
  }, []);


  return (
    <div onClick={onClickEventHandler} style={{ width: "100%", height: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", userSelect: "none", }}>
      <div onClick={(e) => { playClick(); e.stopPropagation(); }} style={{ display: "flex", flexDirection: width < 400 ? "column" : "row", alignItems: "center", height: width < 401 ? "40%" : "auto", width: width > 401 ? "40%" : "auto", minWidth: "250px", justifyContent: "space-between", marginTop: "-200px" }}>
        <a href="" target="_blank">
          <animated.svg className="socialIcon" style={style1} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" height={width > 400 ? "5em" : "4em"} width={width > 400 ? "5em" : "4em"} xmlns="http://www.w3.org/2000/animated.svg"><path d="M13.641 2.325c-1.497-1.5-3.488-2.325-5.609-2.325-4.369 0-7.925 3.556-7.925 7.928 0 1.397 0.366 2.763 1.059 3.963l-1.125 4.109 4.203-1.103c1.159 0.631 2.463 0.966 3.787 0.966h0.003c0 0 0 0 0 0 4.369 0 7.928-3.556 7.928-7.928 0-2.119-0.825-4.109-2.322-5.609zM8.034 14.525v0c-1.184 0-2.344-0.319-3.356-0.919l-0.241-0.144-2.494 0.653 0.666-2.431-0.156-0.25c-0.663-1.047-1.009-2.259-1.009-3.506 0-3.634 2.956-6.591 6.594-6.591 1.759 0 3.416 0.688 4.659 1.931 1.244 1.247 1.928 2.9 1.928 4.662-0.003 3.637-2.959 6.594-6.591 6.594zM11.647 9.588c-0.197-0.1-1.172-0.578-1.353-0.644s-0.313-0.1-0.447 0.1c-0.131 0.197-0.512 0.644-0.628 0.778-0.116 0.131-0.231 0.15-0.428 0.050s-0.838-0.309-1.594-0.984c-0.588-0.525-0.987-1.175-1.103-1.372s-0.013-0.306 0.088-0.403c0.091-0.088 0.197-0.231 0.297-0.347s0.131-0.197 0.197-0.331c0.066-0.131 0.034-0.247-0.016-0.347s-0.447-1.075-0.609-1.472c-0.159-0.388-0.325-0.334-0.447-0.341-0.116-0.006-0.247-0.006-0.378-0.006s-0.347 0.050-0.528 0.247c-0.181 0.197-0.694 0.678-0.694 1.653s0.709 1.916 0.809 2.050c0.1 0.131 1.397 2.134 3.384 2.991 0.472 0.203 0.841 0.325 1.128 0.419 0.475 0.15 0.906 0.128 1.247 0.078 0.381-0.056 1.172-0.478 1.338-0.941s0.166-0.859 0.116-0.941c-0.047-0.088-0.178-0.137-0.378-0.238z"></path></animated.svg>
        </a>
        <a href="https://www.linkedin.com/in/anthonwellsjo/" target="_blank">
          <animated.svg className="socialIcon" style={style2} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height={width > 400 ? "5em" : "4em"} width={width > 400 ? "5em" : "4em"} xmlns="http://www.w3.org/2000/animated.svg"><path d="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM349.3 793.7H230.6V411.9h118.7v381.8zm-59.3-434a68.8 68.8 0 1 1 68.8-68.8c-.1 38-30.9 68.8-68.8 68.8zm503.7 434H675.1V608c0-44.3-.8-101.2-61.7-101.2-61.7 0-71.2 48.2-71.2 98v188.9H423.7V411.9h113.8v52.2h1.6c15.8-30 54.5-61.7 112.3-61.7 120.2 0 142.3 79.1 142.3 181.9v209.4z"></path></animated.svg>
        </a>
        <a href="https://github.com/anthonwellsjo/" target="_blank">
          <animated.svg className="socialIcon" style={style3} stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height={width > 400 ? "5em" : "4em"} width={width > 400 ? "5em" : "4em"} xmlns="http://www.w3.org/2000/animated.svg"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path></animated.svg>
        </a>
      </div>
    </div >
  )
}

export default Social;