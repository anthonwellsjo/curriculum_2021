import React, { useContext, useEffect, useState } from 'react';
import CSS from 'csstype';
import useSound from 'use-sound';
import { PageContext } from '../../contexts/pageContext';
import { useSpring } from '@react-spring/core';
import { animated } from 'react-spring';

const styles: CSS.Properties = {
  position: "absolute",
  marginTop: "10%",
  width: "70vw",
  height: "70vw",
  maxHeight: "70vh",
  maxWidth: "70vh",
  borderRadius: "20px",
  boxShadow: "10px 10px 100px lightgrey"
}
const Bio: React.FC = () => {
  const [page, setPage] = useContext(PageContext);
  const [closing, setClosing] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const animStyle = useSpring({
    reverse: closing,
    to: { transform: "scale(1)" },
    from: { transform: "scale(0)" }
  })
  const logoStyle = useSpring({
    to: { transform: showContent ? "translateY(0px)" : "translateY(100px)", opacity: showContent ? 1 : 0 },
    from: { transform: "translateY(100px)", opacity: 0 }
  })
  const headerStyle = useSpring({
    to: { transform: showContent ? "translateY(0px)" : "translateY(100px)", opacity: showContent ? 1 : 0 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 200
  })
  const textStyle = useSpring({
    to: { transform: showContent ? "translateY(0px)" : "translateY(100px)", opacity: showContent ? 1 : 0 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 400
  })
  const [playClose] = useSound("/closePage.wav", { playbackRate: 1.8 });
  const onClickEventHandler = (e) => {
    e.stopPropagation();
    setClosing(true);
    playClose();
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
  }, [])
  return (
    <div onClick={onClickEventHandler} style={{ width: "100%", height: "100%", position: "absolute", top: 0, display: "flex", alignItems: "center", justifyContent: "center", }}>
      <animated.div style={{ ...styles, ...animStyle, display: "flex", flexDirection: "column", alignItems: "center", }}>
        {showContent &&
          <>
            <animated.div style={{ ...logoStyle, width: "30%", height: "30%", borderRadius: "100%", marginTop: "-15%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "1px 1px 30px lightgrey" }}>
              {/* <iframe src="https://giphy.com/embed/6LJEZhdIcbBIhCs5TI" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/6LJEZhdIcbBIhCs5TI">via GIPHY</a></p> */}
            </animated.div>
            <animated.div style={headerStyle}>
              <h1>Hej!</h1>
            </animated.div>
            <animated.div style={{ ...textStyle, textAlign: "justify", borderRadius: "5px", width: "80%", fontFamily: "Roboto" }}>
              <p>My name is Anthon and I grew up in close to Gotheburg, Sweden. Nowadays I live close to Perugia, Italy with my wife and three kids.</p>
              <p>Other than passionately developing the web, I love kite surfing and playing the guitar. I speak four languages fluently (swedish, french, italian and english) and I consider myself a good coworker and friend.</p>
              <p>If you consider hiring me, then you can count on a passionate and open minded </p>
            </animated.div>
          </>
        }
      </animated.div>
    </div >
  )
}

export default Bio; <div></div>