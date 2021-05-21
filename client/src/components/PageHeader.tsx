import React, { useEffect, useState } from 'react';
import CSS from 'csstype';
import { useSpring } from '@react-spring/core';
import { animated } from 'react-spring';

const styles: CSS.Properties = {
  fontFamily: "Trochut, cursive",
  fontSize: "3em",
  textAlign: "center",
  marginTop: "10px",
  userSelect: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100px"
}

const PageHeader = () => {
  const [showHoverStuff, setShowHoverStuff] = useState(false);
  const [renderButtons, setRenderButtons] = useState(false);

  const style = useSpring({
    to: { transform: showHoverStuff ? "translateY(-100px)" : "translateY(0px)" },
    from: { transform: "translateY(0px)" }
  })
  const styleLeft = useSpring({
    reverse: !showHoverStuff,
    to: { opacity: showHoverStuff ? 1 : 0, transform: showHoverStuff ? "translateX(100px)" : "translateX(0px)" },
    from: { opacity: 0, transform: "translateX(0px)" }
  })
  const styleMiddle = useSpring({
    reverse: !showHoverStuff,
    to: { opacity: showHoverStuff ? 1 : 0, transform: showHoverStuff ? "translateY(-150px)" : "translateY(0px)" },
    from: { opacity: 0, transform: "translateY(0px)" }
  })
  const styleRight = useSpring({
    reverse: !showHoverStuff,
    to: { opacity: showHoverStuff ? 1 : 0, transform: showHoverStuff ? "translateX(-100px)" : "translateX(0px)" },
    from: { opacity: 0, transform: "translateX(0px)" }
  })

  const onHoverEventHandler = () => {
    setShowHoverStuff(true);
    setRenderButtons(true);
  }
  const onHoverOutEventHandler = () => {
    setShowHoverStuff(false);
    setTimeout(() => {
      setRenderButtons(false);
    }, 400)
  }

  return (
    <div  style={styles}>
      <div onMouseEnter={onHoverEventHandler} onMouseLeave={onHoverOutEventHandler} style={{ height: "100px", width: "320px", display: "flex", alignItems: "center", flexDirection: "column", position: "relative" }}>
        <animated.h4 style={{ ...style, position: "absolute", width: "400px", top: "-30px" }}>Anthon Wellsjö</animated.h4>
        {renderButtons &&
          <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", top: "50px", width: "400px" }}>
            <animated.div className="buttidybutt" style={{...styleLeft}}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"></path></svg>
            </animated.div>
            <animated.div className="buttidybutt" style={{ ...styleMiddle, marginTop: "100px" }}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><path d="M946.5 505L534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z"></path></svg>
            </animated.div>
            <animated.div className="buttidybutt" style={{...styleRight}}>
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><path d="M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"></path></svg>
            </animated.div>
          </div>
        }
      </div>
    </div>
  )
}

export default PageHeader;