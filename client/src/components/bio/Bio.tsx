import React, { createRef, useContext, useEffect, useState } from 'react';
import CSS from 'csstype';
import useSound from 'use-sound';
import { PageContext } from '../../contexts/pageContext';
import { useSpring } from '@react-spring/core';
import { animated } from 'react-spring';
import Image from 'next/image';
import { useViewport } from '../../hooks/useViewPort';
import useGetColor from '../../hooks/useGetColor';


const Bio: React.FC = () => {
  const [playClose] = useSound("/closepage.wav", { volume: 0.4 });
  const [showImage, setShowImage] = useState(false);
  const { width: viewWidth, height: viewHeight } = useViewport();
  const vwLimit = 750;
  const styles: CSS.Properties = {
    position: "absolute",
    width: viewWidth > vwLimit ? "60vw" : "100%",
    height: viewWidth > vwLimit ? "60vw" : "80%",
    maxHeight: "70vh",
    maxWidth: "70vh",
    borderRadius: "20px",
    boxShadow: "10px 10px 100px lightgrey",
    top: viewWidth > vwLimit ? "50px" : "100px",
    marginTop: "120px"
  }
  const [page, setPage] = useContext(PageContext);
  const [closing, setClosing] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const animStyle = useSpring({
    reverse: closing,
    to: { transform: "scale(1)", opacity: 1 },
    from: { transform: "scale(0)", opacity: 0 }
  })
  const logoStyle = useSpring({
    reverse: closing,
    to: { transform: showImage && showContent ? "translateY(0px) scale(1)" : "translateY(100px) scale(0)", opacity: showImage && showContent ? 1 : 0 },
    from: { transform: "translateY(100px) scale(0)", opacity: 0 }
  })
  const textStyle = useSpring({
    to: { transform: showContent ? "translateY(0px)" : "translateY(100px)", opacity: showContent ? 1 : 0 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 400
  })
  const hobbyStyle = useSpring({
    to: { opacity: showContent ? 1 : 0 },
    from: { opacity: 0 },
    config: { mass: 1 },
    delay: 1000
  })
  const onClickEventHandler = (e) => {
    if (page.audio) playClose();
    e.stopPropagation();
    setClosing(true);
    setTimeout(() => {
      setShowContent(false);
      setPage(prev => ({ ...prev, currentPage: "main", slowMo: false }));
    }, 300)
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 200);
    () => { clearTimeout(timer) }
  }, []);

  return (
    <div onClick={onClickEventHandler} style={{width: "100%", height: "100%", position: "absolute", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none", overflowY: "hidden", top: "0", zIndex: 0, backdropFilter:"blur(5px)", backgroundColor:"rgba(256,256,256,0.3)" }}>
      <animated.div className="noScrollBar" style={{ ...styles, ...animStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-evenly", overflowY: "scroll" }}>
        {showContent &&
          <>
            <animated.div style={{ ...textStyle, textAlign: "justify", borderRadius: "5px", width: "80%", marginTop: viewWidth < 750 ? "-20px" :"50px" }}>
              <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: "1.1em", marginBottom: "0" }}>Hej,</p>
              <p>my name is Anthon and I'm a swedish <strong>full stack web developer</strong> based in Perugia, Italy with my wife and three kids.</p>
              <p><strong>I speak four languages </strong> fluently (swedish, french, italian and english) and other than passionately developing the web, I love garden work, kite surfing and playing the guitar.</p>
              <p>If you consider hiring me, then you can count on <strong>an effective and open minded coworker</strong>. I love learning, and arriving at the best solutions, no matter who had the idea.</p>
            </animated.div>
            <animated.div style={{ ...hobbyStyle, display: "flex", width: "100%", justifyContent: "center", position: "absolute", bottom: "40px" }}>
              <div>
                <svg stroke="currentColor" fill="grey" strokeWidth="0" viewBox="0 0 512 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M247 21.074c0 10.508 7.18 18.167 14.71 23.412 7.532 5.246 16.41 9.202 24.698 13.15 8.287 3.95 15.954 7.94 20.332 11.657 4.378 3.717 5.225 5.25 4.46 8.82-.497 2.315-1.215 3.316-2.612 4.46-1.397 1.146-3.766 2.287-7.15 3.107-6.77 1.64-17.084 1.778-27.94 1.722-10.856-.055-22.27-.272-32.76 1.975-10.49 2.246-21.296 8.173-25.252 19.7-2.59 7.548-.236 15.34 3.37 20.804 3.605 5.464 8.328 9.71 12.857 13.696 2.997 2.638 5.89 5.126 8.355 7.424h22.875c-1.575-3.354-3.862-6.223-6.168-8.754-4.138-4.544-8.918-8.44-13.17-12.182-4.25-3.74-7.917-7.357-9.726-10.1-1.81-2.74-1.9-3.496-1.368-5.044 1.518-4.425 4.565-6.35 11.996-7.94 7.43-1.593 18.006-1.633 28.898-1.578 10.892.056 22.087.24 32.27-2.228 5.09-1.234 10.058-3.184 14.322-6.678 4.264-3.494 7.53-8.68 8.8-14.61 2.275-10.606-3.357-20.327-10.41-26.314-7.052-5.987-15.765-10.15-24.238-14.185-8.472-4.037-16.733-7.896-22.152-11.67-5.42-3.775-6.998-6.34-6.998-8.643h-18zM41 169v174h430V169H41zm7 14h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm48 0h48v18h-48v-18zm96 0h32v18h-32v-18zM48 215h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h32v18h-32v-18zm48 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-127.87 25h18v57h-25v-18h7v-39zM48 247h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm96 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-96 16h16v18h-16v-18zM48 279h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm112 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zM48 311h16v18H48v-18zm32 0h16v18H80v-18zm32 0h144v18H112v-18zm160 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h48v18h-48v-18zm64 0h16v18h-16v-18z"></path></svg>
              </div>
            </animated.div>
          </>
        }
      </animated.div>
      <animated.div style={{ ...logoStyle, width: viewWidth > vwLimit || viewHeight > 570 ? "150px" : "120px", height: viewWidth > vwLimit || viewHeight > 570 ? "150px" : "120px", minHeight: "100px", borderRadius: "100%", top: "0px", position: "absolute", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "1px 1px 30px lightgrey", marginTop: "120px" }}>
        <img onLoad={() => { setShowImage(true); }} src={"/profile.jpg"} style={{ height: "180px", width: "180px", marginTop: "20px" }} alt="Image of Anthon" />
      </animated.div>
    </div >
  )
}

export default Bio; <div></div>