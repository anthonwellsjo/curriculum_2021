import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useSound from 'use-sound';
import { useViewport } from '../../hooks/useViewPort';
import TechContainer from '../techContainer/TechContainer';


const FullProject = () => {
  const { width, height } = useViewport();
  const [playClick] = useSound("/click.wav");
  const [page, setPage] = useContext(PageContext);

  const style = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
  })
  const deskGifStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 800
  })
  const mobileGifStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1200
  })
  const titleStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 300
  })
  const descStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 500
  })
  const onCloseClickedEvent = (event) => {
    event.stopPropagation();
    if (page.audio) playClick();
    setPage(prev => ({ ...prev, currentProject: null, showProjects: false, slowMo: false }));
  }

  const currentProject: Project = page.currentProject;

  return (
    <animated.div
      onClick={e => e.stopPropagation()}
      style={{
        ...style,
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 1,
        userSelect: "none",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        overflowY: "scroll",
        overflowX: "hidden",
        cursor: "default"
      }}>
      <div style={{
        position: "absolute",
        left: 0,
        top: "-100px",
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center"
      }}>
        <div >
          <svg height="1600" width="1900" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={page.currentProject.projectColor} d="M47,-74.3C60,-64.8,69,-50.2,76.1,-34.7C83.3,-19.2,88.6,-2.9,84.9,11.1C81.2,25.1,68.4,36.6,57.3,50C46.2,63.3,36.9,78.5,24.2,82.1C11.4,85.8,-4.6,78,-18,70.1C-31.4,62.1,-42.2,54,-53.7,44.5C-65.3,34.9,-77.6,23.9,-81.8,10.3C-86.1,-3.3,-82.3,-19.6,-76.1,-35.5C-70,-51.4,-61.5,-66.9,-48.4,-76.4C-35.3,-85.9,-17.7,-89.3,-0.3,-88.8C17,-88.3,34,-83.8,47,-74.3Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>
      <div className="noScrollBar"
        style={{
          position: "relative",
          width: "90%",
          paddingLeft: "100px",
          paddingRight: "100px",
          maxWidth: "1100px",
          display: "flex",
          justifyContent: "center"
        }}>
        <button onClick={onCloseClickedEvent} style={{ position: "absolute", right: "30px", top: "30px" }}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </button>
        <div style={{ position: "absolute", left: "-30px", height: `${height}px`, display: "flex", alignItems: "center" }}>
          <TechContainer itemsPerRow={1} onFinishedAnimation={() => { return }} tech={currentProject.tech} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <animated.div style={{ ...titleStyle, textAlign: "center", }}>
            <h1 style={{ fontSize: width > 400 ? "3em" : "2em" }}>{currentProject.title}</h1>
          </animated.div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", marginBottom: "50px" }}>
            <animated.div style={{ ...mobileGifStyle, position: "relative", width: "480px", height: "288px" }}>
              <iframe src={currentProject.gifLinkDesktop} style={{ position: "absolute" }} width="480" height="288" frameBorder="0" ></iframe>
              <div style={{ width: "480px", height: "288px", position: "absolute", outline: "solid 10px black" }} />
            </animated.div >
          </div>
          <animated.div style={{ ...descStyle, textAlign: "justify", width: "600px" }}>
            {currentProject.descriptionRaw.map((b: BlockText) => {
              // console.log(b.children[0]._type, b.children[0].text);
              if (b.style == "h2") return React.createElement(b.style, { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
              if (b.style == "normal") return React.createElement("p", { key: b._key }, b.children[0].text);
              // return React.createElement("h1",null, "apa");
            })}
          </animated.div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "80px", }}>
            <animated.div style={{ ...deskGifStyle, position: "relative", width: "480px", height: "480px", display: "flex", justifyContent: "center" }}>
              <iframe src={currentProject.gifLinkMobile} style={{ position: "absolute" }} width="268" height="480" frameBorder="0" ></iframe>
              <div style={{ width: "268px", height: "480px", position: "absolute", outline: "solid 10px black" }} />
            </animated.div>
          </div>
          {currentProject.deployUrl ?
            <div style={{ textAlign: "center", marginTop: "80px", fontSize: "2em" }}>
              <a onClick={e => e.stopPropagation()} target="_blank" href={currentProject.deployUrl}>See live</a>
            </div> : null}
          <div style={{ textAlign: "center", marginTop: "100px" }}>
            <svg stroke="currentColor" fill="grey" strokeWidth="0" viewBox="0 0 512 512" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M247 21.074c0 10.508 7.18 18.167 14.71 23.412 7.532 5.246 16.41 9.202 24.698 13.15 8.287 3.95 15.954 7.94 20.332 11.657 4.378 3.717 5.225 5.25 4.46 8.82-.497 2.315-1.215 3.316-2.612 4.46-1.397 1.146-3.766 2.287-7.15 3.107-6.77 1.64-17.084 1.778-27.94 1.722-10.856-.055-22.27-.272-32.76 1.975-10.49 2.246-21.296 8.173-25.252 19.7-2.59 7.548-.236 15.34 3.37 20.804 3.605 5.464 8.328 9.71 12.857 13.696 2.997 2.638 5.89 5.126 8.355 7.424h22.875c-1.575-3.354-3.862-6.223-6.168-8.754-4.138-4.544-8.918-8.44-13.17-12.182-4.25-3.74-7.917-7.357-9.726-10.1-1.81-2.74-1.9-3.496-1.368-5.044 1.518-4.425 4.565-6.35 11.996-7.94 7.43-1.593 18.006-1.633 28.898-1.578 10.892.056 22.087.24 32.27-2.228 5.09-1.234 10.058-3.184 14.322-6.678 4.264-3.494 7.53-8.68 8.8-14.61 2.275-10.606-3.357-20.327-10.41-26.314-7.052-5.987-15.765-10.15-24.238-14.185-8.472-4.037-16.733-7.896-22.152-11.67-5.42-3.775-6.998-6.34-6.998-8.643h-18zM41 169v174h430V169H41zm7 14h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm48 0h48v18h-48v-18zm96 0h32v18h-32v-18zM48 215h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h32v18h-32v-18zm48 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-127.87 25h18v57h-25v-18h7v-39zM48 247h16v18H48v-18zm32 0h16v18H80v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm96 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm-96 16h16v18h-16v-18zM48 279h32v18H48v-18zm48 0h16v18H96v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm112 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zM48 311h16v18H48v-18zm32 0h16v18H80v-18zm32 0h144v18H112v-18zm160 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h16v18h-16v-18zm32 0h48v18h-48v-18zm64 0h16v18h-16v-18z"></path></svg>
          </div>
        </div>


      </div>


      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </animated.div >

  )
}

export default FullProject;