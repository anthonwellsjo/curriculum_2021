import React, { useContext, useEffect, useState } from 'react';
import CSS from 'csstype';
import useSound from 'use-sound';
import { PageContext } from '../../contexts/pageContext';
import { useSpring } from '@react-spring/core';
import { animated } from 'react-spring';
import Image from 'next/image';
import { useViewport } from '../../hooks/useViewPort';


const Bio: React.FC = () => {
  const [playClose] = useSound("/closepage.wav");
  const { width: viewWidth, height: viewHeight } = useViewport();
  const vwLimit = 565;
  const styles: CSS.Properties = {
    position: "absolute",
    marginTop: "50px",
    width: viewWidth > vwLimit ? "60vw" : "100%",
    height: viewWidth > vwLimit ? "60vw" : "80%",
    maxHeight: "70vh",
    maxWidth: "70vh",
    borderRadius: "20px",
    boxShadow: "10px 10px 100px lightgrey",
    top: viewWidth > vwLimit ? "50px" : "100px",
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
    to: { transform: showContent ? "translateY(0px) scale(1)" : "translateY(100px) scale(0)", opacity: showContent ? 1 : 0 },
    from: { transform: "translateY(100px) scale(0)", opacity: 0 }
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
  const hobbyStyle = useSpring({
    to: { transform: showContent ? "translateY(0px)" : "translateY(100px)", opacity: showContent ? 1 : 0 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 600
  })
  const onClickEventHandler = (e) => {
    playClose({ playbackRate: 1.8 });
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
    <div onClick={onClickEventHandler} style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none" }}>
      <animated.div className="noScrollBar" style={{ ...styles, ...animStyle, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflowY: "scroll" }}>
        {showContent &&
          <>
            <animated.div style={{ ...textStyle, textAlign: "justify", borderRadius: "5px", width: "80%", fontFamily: "Roboto", marginTop: viewHeight > 700 ? "0" : "100px" }}>
              <p><strong>Hej,</strong> my name is Anthon and I'm a swedish full stack web developer. Nowadays I live in Perugia, Italy with my wife and three kids.</p>
              <p>I speak four languages fluently (swedish, french, italian and english) and other than passionately developing the web, I love garden work, kite surfing and playing the guitar.</p>
              <p>If you consider hiring me, then you can count on an effective and open minded cooworker. I love learning, and arriving at the best solutions, no matter who hade the idea.</p>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </animated.div>
            <animated.div style={{ ...hobbyStyle, position: "absolute", display: "flex", flexDirection: "row", width: "300px", justifyContent: "space-between", bottom: "50px" }}>
              <div>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M272.56 37.535c-2.73 9.522-7.43 19.245-13.263 29.092-10.537 17.786-25.074 35.97-40.424 52.674-15.35 16.705-31.498 31.88-45.318 43.393-1.636 1.363-3.232 2.664-4.797 3.92 73.788-1.87 129.856-10.404 172.217-21.527-16.666-35.65-38.964-71.863-68.414-107.55zm25.792 3.518c25.297 32.908 44.98 66.205 60.097 99.062 20.755-6.355 37.728-13.287 51.486-20.166 23.195-11.598 37.367-23.02 45.66-31.313.56-.56 1.02-1.055 1.523-1.578-24.93-3.32-85.136-14.01-158.768-46.007zm171.416 58.832c-.47.488-.944.98-1.444 1.478-9.707 9.707-25.535 22.285-50.34 34.688-14.265 7.133-31.51 14.208-52.26 20.673C385.457 204.35 399.3 267.8 402.54 315.27c3.912 62.24-4.2 114.432-13.243 149.023 6.263-8.047 12.805-17.732 19.22-28.805 15.812-27.3 31.415-62.77 43.772-102.18 22.904-73.052 34.377-159.596 17.478-233.423zm-121.395 61.86c-45.878 12.342-106.803 21.565-187.478 23.042 31.007 29.097 61.39 64.16 89.17 100.188-26.307 30.073-54.772 57.992-82.956 82.58-3.816 3.33-7.626 6.592-11.424 9.797l-8.08-17.502-22.487 2.498 2.497 22.488 15.117 3.24c-12.492 10.146-24.77 19.552-36.617 28.13l-4.922-16.608-22.613-.762-.762 22.615 13.672 5.075c-6.067 4.17-11.992 8.106-17.724 11.766-6.105 3.9-12 7.478-17.66 10.76l.238-15.46-21.354-7.483-7.482 21.354 13.086 10.132c-13.478 6.994-24.8 11.673-32.82 13.678l4.367 17.46c3.664-.916 7.605-2.17 11.78-3.718l-.146-.582c2.415-.604 5.167-1.5 8.19-2.647 5.216-2.243 10.77-4.91 16.607-7.945l-.258 16.88 21.354 7.48 7.484-21.352-14.133-10.942c6.522-3.762 13.337-7.91 20.433-12.44 2.273-1.452 4.58-2.956 6.902-4.484 4.84-3.31 9.815-6.832 14.893-10.527l5.352 18.06 22.615.762.762-22.615-15.776-5.853c12.51-9.533 25.545-20.078 38.827-31.473l8.07 17.488 22.49-2.498-2.5-22.488-15.634-3.352c4.477-3.976 8.97-8.032 13.473-12.183 63.37-58.424 128.223-133.68 166.674-209.6-.408-.986-.81-1.97-1.227-2.956zm9.815 25.288c-23.644 43.21-54.687 85.363-88.528 124.104 10.784 14.773 21.07 29.505 30.692 43.85 21.597 32.21 39.898 62.39 53.326 86.656 6.17 11.15 11.17 20.653 15.084 28.812 9.33-31.65 20.007-87.328 15.814-154.055-2.504-39.857-10.188-83.775-26.39-129.367z"></path></svg>
              </div>
              <div>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"></path></svg>
              </div>
              <div>
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M502.63 39L473 9.37a32 32 0 0 0-45.26 0L381.46 55.7a35.14 35.14 0 0 0-8.53 13.79L360.77 106l-76.26 76.26c-12.16-8.76-25.5-15.74-40.1-19.14-33.45-7.78-67-.88-89.88 22a82.45 82.45 0 0 0-20.24 33.47c-6 18.56-23.21 32.69-42.15 34.46-23.7 2.27-45.73 11.45-62.61 28.44C-16.11 327-7.9 409 47.58 464.45S185 528 230.56 482.52c17-16.88 26.16-38.9 28.45-62.71 1.76-18.85 15.89-36.13 34.43-42.14a82.6 82.6 0 0 0 33.48-20.25c22.87-22.88 29.74-56.36 22-89.75-3.39-14.64-10.37-28-19.16-40.2L406 151.23l36.48-12.16a35.14 35.14 0 0 0 13.79-8.53l46.33-46.32a32 32 0 0 0 .03-45.22zM208 352a48 48 0 1 1 48-48 48 48 0 0 1-48 48z"></path></svg>
              </div>
            </animated.div>
          </>
        }
      </animated.div>
      {showContent && <animated.div style={{ ...logoStyle, width: viewWidth > vwLimit || viewHeight > 550 ? "150px" : "100px", height: viewWidth > vwLimit || viewHeight > 550 ? "150px" : "100px", minHeight: "100px", borderRadius: "100%", top: "50px", position: "absolute", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "1px 1px 30px lightgrey" }}>
        <Image src={"/profile.jpg"} height="300px" width="300px" alt="Image of Anthon" />
        {/* <iframe src="https://giphy.com/embed/6LJEZhdIcbBIhCs5TI" width="480" height="270" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/6LJEZhdIcbBIhCs5TI">via GIPHY</a></p> */}
      </animated.div>
      }

    </div >
  )
}

export default Bio; <div></div>