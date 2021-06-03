import React, { useContext, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useSound from 'use-sound';
import { useViewport } from '../../hooks/useViewPort';
import TechContainer from '../techContainer/TechContainer';


const FullProjectMobile = () => {
  const { width, height } = useViewport();
  const [playClick] = useSound("/click.wav");
  const [techAnimDone, setTechAnimDone] = useState(false);
  const [page, setPage] = useContext(PageContext);

  const style = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
  })
  const titleStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 100
  })
  const techStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 300
  })
  const deskGifStyle = useSpring({
    to: { opacity: techAnimDone ? 1 : 0 },
    from: { opacity: 0 },
    delay: 300
  })
  const descStyle = useSpring({
    to: { opacity: techAnimDone ? 1 : 0 },
    from: { opacity: 0 },
    delay: 500
  })
  const onClickEventHandler = (event) => {
    event.stopPropagation();
    if (page.audio) playClick();
    setPage(prev => ({ ...prev, currentProject: null, showProjects: false, slowMo: false }));
  }

  const currentProject: Project = page.currentProject;
  const techContRows = () => {
    if (width > 750) return 8;
    if (width > 600) return 6;
    if (width > 500) return 5;
    if (width > 400) return 4;
    if (width > 300) return 3;
    else return 2;
  }

  return (
    <animated.div className="noScrollBar"
      onClick={onClickEventHandler}
      style={{
        ...style,
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: page.currentProject.projectColor,
        zIndex: 1,
        userSelect: "none",
        paddingLeft: "10%",
        paddingRight: "10%",
        overflowY: "scroll",
        overflowX: "hidden"
      }}>
      <animated.div style={{ ...titleStyle, textAlign: "center" }}>
        <h1 style={{ fontSize: width > 400 ? "3em" : "2em" }}>{currentProject.title}</h1>
      </animated.div>
      {currentProject.tech != null &&
        <div>
          <animated.div style={{ ...techStyle }}>
            <h2 style={{ textAlign: "center" }}>Tech</h2>
          </animated.div>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <TechContainer itemsPerRow={techContRows()} tech={currentProject.tech} onFinishedAnimation={() => { setTechAnimDone(true) }} />
          </div>
        </div>
      }
      <div style={{ display: "flex", justifyContent: "center", marginTop: "40px", marginBottom: "80px", height: "288px" }}>
        <animated.div style={{ ...deskGifStyle, textAlign: "justify", display: "flex", justifyContent: "center", paddingTop: "20px" }}>
          <iframe src={currentProject.gifLinkDesktop} style={{ position: "absolute" }} width="480" height="288" frameBorder="0" ></iframe>
          <div style={{ width: "480px", height: "288px", position: "absolute", outline: "solid 5px black" }} />
        </animated.div >
      </div>
      <animated.div style={{ ...descStyle, textAlign: "justify" }}>
        {currentProject.descriptionRaw.map((b: BlockText) => {

          if (b.style == "h2") return React.createElement(b.style, { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
          if (b.style == "normal") return React.createElement("p", { key: b._key }, b.children[0].text);

        })}
      </animated.div>
      <div style={{ display: "flex", justifyContent: "center", }}>
        <animated.div style={{ ...deskGifStyle, position: "relative", width: "480px", height: "480px", marginTop: "50px", marginBottom: "80px", display: "flex", justifyContent: "center" }}>
          <iframe src={currentProject.gifLinkMobile} style={{ position: "absolute" }} width="268" height="480" frameBorder="0" ></iframe>
          <div style={{ width: "268px", height: "480px", position: "absolute", outline: "solid 5px black" }} />
        </animated.div>
      </div>
      {currentProject.deployUrl ?
        <div style={{ textAlign: "center" }}>
          <a onClick={e => e.stopPropagation()} href={currentProject.deployUrl}><h3>See live</h3></a>
        </div> : null}
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <svg stroke="currentColor" fill="grey" strokeWidth="0" viewBox="0 0 512 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M247 21.074c0 10.508 7.18 18.167 14.71 23.412 7.532 5.246 16.41 9.202 24.698 13.15 8.287 3.95 15.954 7.94 20.332 11.657 4.378 3.717 5.225 5.25 4.46 8.82-.497 2.315-1.215 3.316-2.612 4.46-1.397 1.146-3.766 2.287-7.15 3.107-6.77 1.64-17.084 1.778-27.94 1.722-10.856-.055-22.27-.272-32.76 1.975-10.49 2.246-21.296 8.173-25.252 19.7-2.59 7.548-.236 15.34 3.37 20.804 3.605 5.464 8.328 9.71 12.857 13.696 2.997 2.638 5.89 5.126 8.355 7.424h22.875c-1.575-3.354-3.862-6.223-6.168-8.754-4.138-4.544-8.918-8.44-13.17-12.182-4.25-3.74-7.917-7.357-9.726-10.1-1.81-2.74-1.9-3.496-1.368-5.044 1.518-4.425 4.565-6.35 11.996-7.94 7.43-1.593 18.006-1.633 28.898-1.578 10.892.056 22.087.24 32.27-2.228 5.09-1.234 10.058-3.184 14.322-6.678 4.264-3.494 7.53-8.68 8.8-14.61 2.275-10.606-3.357-20.327-10.41-26.314-7.052-5.987-15.765-10.15-24.238-14.185-8.472-4.037-16.733-7.896-22.152-11.67-5.42-3.775-6.998-6.34-6.998-8.643h-18zM41 169v174h430V169H41zm7 14h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm48 0h48v18h-48v-18zm96 0h32v18h-32v-18zM48 215h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h32v18h-32v-18zm48 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-127.87 25h18v57h-25v-18h7v-39zM48 247h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm96 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-96 16h16v18h-16v-18zM48 279h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm112 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zM48 311h16v18H48v-18zm32 0h16v18H80v-18zm32 0h144v18H112v-18zm160 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h48v18h-48v-18zm64 0h16v18h-16v-18z"></path></svg>
      </div>
    </animated.div >
  )
}

export default FullProjectMobile;