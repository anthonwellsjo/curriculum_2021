import React, { createRef, useContext, useEffect, useRef, useState } from 'react';
import CSS from 'csstype';
import { useSpring } from '@react-spring/core';
import { animated } from 'react-spring';
import useSound from 'use-sound';
import { PageContext } from '../contexts/pageContext';
import { useViewport } from '../hooks/useViewPort';
import useMenuButtons from '../hooks/useMenuButtons';

const styles: CSS.Properties = {
  fontFamily: "Trochut, cursive",
  fontSize: "3em",
  textAlign: "center",
  marginTop: "0",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "120px",
  flexDirection: "column",
  top: 0,
  backgroundColor: "transparent",
  zIndex: 1,
  position: "absolute"
}

const stickStyle: CSS.Properties = {
  height: "3px",
  width: "40px",
  backgroundColor: "black",
  marginBottom: "5px"
}

const PageHeaderDesktop = () => {
  const [playClose] = useSound("/closepage.wav");
  const [playOpen] = useSound("/click.wav");
  const [hoveredButton, setHoveredButton] = useState<"bio" | "work" | "social" | null>(null);
  const [page, setPage] = useContext(PageContext);
  const { clickBio, clickSocial, clickWork } = useMenuButtons();
  const { width, height } = useViewport()
  const style = useSpring({
    to: { transform: page.showHeaderButtons || page.currentPage !== "main" ? "translateY(-100px)" : "translateY(0px)" },
    from: { transform: "translateY(0px)" }
  })

  const styleWork = useSpring({
    reverse: !page.showHeaderButtons && hoveredButton !== "work" && hoveredButton !== null,
    to: { opacity: hoveredButton === "work" || page.currentPage === "work" && hoveredButton === null ? 1 : 0 },
    from: { opacity: 0 }
  })
  const styleBio = useSpring({
    reverse: !page.showHeaderButtons && hoveredButton !== "bio" && hoveredButton !== null,
    to: { opacity: hoveredButton === "bio" || page.currentPage === "bio" && hoveredButton === null ? 1 : 0 },
    from: { opacity: 0 }
  })
  const styleSocial = useSpring({
    reverse: !page.showHeaderButtons && hoveredButton !== "social" && hoveredButton !== null,
    to: { opacity: hoveredButton === "social" || page.currentPage === "social" && hoveredButton === null ? 1 : 0 },
    from: { opacity: 0 }
  })


  const onBioClickEventHandler = (e) => {
    e.stopPropagation();
    clickBio();

  }
  const onSocialClickEventHandler = (e) => {
    e.stopPropagation();
    clickSocial();
  }
  const onWorkClickEventHandler = (e) => {
    e.stopPropagation();
    clickWork();
  }

  const onClickHeaderEventHandler = (e) => {
    e.stopPropagation();
    if (page.currentPage === "main") {
      if (page.audio) playOpen();
      setPage(prev => ({ ...prev, showHeaderButtons: true, renderHeaderButtons: true }))
    }
  }

  const [flag, setFlag] = useState(true);
  let repeat;
  let unrenderTimeout;

  const mouseHoveringOnHeaderEventHandler = (e: MouseEvent) => {

    clearInterval(repeat);
    clearTimeout(unrenderTimeout);

    repeat = setTimeout(() => {
      if (e.clientY < 160) {
        setPage(prev => ({ ...prev, renderHeaderButtons: true, showHeaderButtons: true }));
      }
      if (e.clientY > 160) {
        setPage(prev => ({ ...prev, showHeaderButtons: false }));
      }
    }, 10)
  }

  useEffect(() => {
    if (!page.showHeaderButtons) {
      unrenderTimeout = setTimeout(() => {
        setPage(prev => ({ ...prev, renderHeaderButtons: false }))
      }, 500)
    }
  }, [page.showHeaderButtons])

  useEffect(() => {
    document.addEventListener("mousemove", mouseHoveringOnHeaderEventHandler);
    return () => {
      document.removeEventListener("mousemove", mouseHoveringOnHeaderEventHandler);
      clearInterval(repeat);
    }
  }, [])

  return (
    <div onClick={(e) => e.stopPropagation()} style={{ ...styles }}>
      <div
        onClick={onClickHeaderEventHandler}
        style={{ height: "100px", width: "320px", display: "flex", alignItems: "center", flexDirection: "column", position: "relative" }}>
        <animated.h4 style={{ ...style, position: "absolute", width: "400px", top: "-70px" }}>Anthon Wellsjö</animated.h4>
        <animated.h4 style={{ ...styleWork, position: "absolute", width: "400px", top: "-70px" }}>Work</animated.h4>
        <animated.h4 style={{ ...styleBio, position: "absolute", width: "400px", top: "-70px" }}>Bio</animated.h4>
        <animated.h4 style={{ ...styleSocial, position: "absolute", width: "400px", top: "-70px" }}>Social</animated.h4>
        {/* <div onClick={(e) => { e.stopPropagation(); }} style={{ position: "absolute" }}>
          <animated.div style={{ ...stickStyle, ...styleBurger1, }} />
          <animated.div style={{ ...stickStyle, ...styleBurger2 }} />
          <animated.div style={{ ...stickStyle, ...styleBurger3 }} />
        </div> */}
        <div onClick={(e) => { e.stopPropagation(); }} style={{ display: "flex", justifyContent: "space-between", position: "absolute", top: "50px", width: "400px" }}>
          <animated.div onMouseLeave={() => { setHoveredButton(null) }} onMouseEnter={() => { setHoveredButton("work") }} onClick={onWorkClickEventHandler} className="buttidybutt" >
            <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z" fill="currentColor"></path></svg>
          </animated.div>
          <animated.div onMouseLeave={() => { setHoveredButton(null) }} onMouseEnter={() => { setHoveredButton("bio") }} onClick={onBioClickEventHandler} className="buttidybutt"  >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><path d="M12,2C6.486,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.514,2,12,2z M12,4c3.213,0,5.982,1.908,7.254,4.648 c-0.302-0.139-0.581-0.301-0.895-0.498c-0.409-0.258-0.873-0.551-1.46-0.772C16.23,7.123,15.499,7,14.665,7 S13.1,7.123,12.431,7.377C11.844,7.6,11.38,7.893,10.959,8.158c-0.378,0.237-0.703,0.443-1.103,0.594C9.41,8.921,8.926,9,8.33,9 C7.735,9,7.251,8.921,6.806,8.752c-0.4-0.151-0.728-0.358-1.106-0.598C5.539,8.053,5.36,7.946,5.18,7.841C6.587,5.542,9.113,4,12,4 z M12,20c-4.411,0-8-3.589-8-8c0-0.81,0.123-1.59,0.348-2.327c0.094,0.058,0.185,0.11,0.283,0.173 c0.411,0.26,0.876,0.554,1.466,0.776C6.766,10.877,7.496,11,8.33,11c0.833,0,1.564-0.123,2.235-0.377 c0.587-0.223,1.051-0.516,1.472-0.781c0.378-0.237,0.703-0.443,1.103-0.595C13.585,9.079,14.069,9,14.665,9s1.08,0.079,1.525,0.248 c0.399,0.15,0.725,0.356,1.114,0.602c0.409,0.258,0.873,0.551,1.46,0.773c0.363,0.138,0.748,0.229,1.153,0.291 C19.966,11.271,20,11.631,20,12C20,16.411,16.411,20,12,20z"></path><circle cx="8.5" cy="13.5" r="1.5"></circle><circle cx="15.5" cy="13.5" r="1.5"></circle></svg>
          </animated.div>
          <animated.div onMouseLeave={() => { setHoveredButton(null) }} onMouseEnter={() => { setHoveredButton("social") }} onClick={onSocialClickEventHandler} className="buttidybutt" >
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height=".8em" width=".8em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.995-.944v-.002.002zM7.022 13h7.956a.274.274 0 00.014-.002l.008-.002c-.002-.264-.167-1.03-.76-1.72C13.688 10.629 12.718 10 11 10c-1.717 0-2.687.63-3.24 1.276-.593.69-.759 1.457-.76 1.72a1.05 1.05 0 00.022.004zm7.973.056v-.002.002zM11 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0zM6.936 9.28a5.88 5.88 0 00-1.23-.247A7.35 7.35 0 005 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 015 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10c-1.668.02-2.615.64-3.16 1.276C1.163 11.97 1 12.739 1 13h3c0-1.045.323-2.086.92-3zM1.5 5.5a3 3 0 116 0 3 3 0 01-6 0zm3-2a2 2 0 100 4 2 2 0 000-4z" clipRule="evenodd"></path></svg>
          </animated.div>
        </div>
      </div>
    </div>
  )
}

export default PageHeaderDesktop;