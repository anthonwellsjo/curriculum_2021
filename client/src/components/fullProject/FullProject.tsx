import React, { useContext, useEffect, useRef, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useSound from 'use-sound';
import { useViewport } from '../../hooks/useViewPort';
import TechContainer from '../techContainer/TechContainer';


const FullProject = () => {
  const { width, height } = useViewport();
  const [playClick] = useSound("/click.wav");
  const [page, setPage] = useContext(PageContext);
  const [pageDone, setPageDone] = useState(false);
  const reference = useRef<HTMLDivElement>();
  const [scrollPos, setScrollPos] = useState(0);


  const style = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
  })
  const deskGifStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 800
  })
  const bigBlob = useSpring({
    to: { transform: `translateY(${scrollPos / 100}px)` }
  })
  const smallBlob = useSpring({
    to: { transform: `translateY(${scrollPos / 8}px)` }
  })
  const smallBlob2 = useSpring({
    to: { transform: `translateY(${scrollPos / 15}px)` }
  })
  const smallBlob3 = useSpring({
    to: { transform: `translateY(${scrollPos / 10}px)` }
  })
  const smallBlob4 = useSpring({
    to: { transform: `translateY(${scrollPos / 7}px)` }
  })
  const titleStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 300
  })
  const descStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 500,
    onRest: () => setPageDone(true)
  })
  const onCloseClickedEvent = (event) => {
    event.stopPropagation();
    if (pageDone) {
      const newState = { ...page, currentProject: null, showProjects: false, currentPage: "main", showHeaderButtons: false };
      setPage(prev => ({ ...newState }));
      window.history.pushState({ ...newState }, newState.currentPage, `/${newState.currentPage}`);
      if (page.audio) playClick();
    }
  }

  const scrollHandler = () => {
    setScrollPos(reference.current.scrollTop);
  }

  useEffect(() => {
    console.log("adding scrolls", window.pageYOffset);
    reference.current.addEventListener("scroll", scrollHandler);
    return () => {
      if (reference.current != null) {
        reference.current.removeEventListener("scroll", scrollHandler);
      }
    }
  }, [])

  const currentProject: Project = page.currentProject;

  return (
    <animated.div
      ref={reference}
      onClick={e => e.stopPropagation()}
      style={{
        ...style,
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "white",
        zIndex: 3,
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
        <animated.div style={{ ...bigBlob, marginTop: "0", position: "absolute", }}>
          {/* <svg height="1600" width="1900" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={page.currentProject.projectColor} d="M47,-74.3C60,-64.8,69,-50.2,76.1,-34.7C83.3,-19.2,88.6,-2.9,84.9,11.1C81.2,25.1,68.4,36.6,57.3,50C46.2,63.3,36.9,78.5,24.2,82.1C11.4,85.8,-4.6,78,-18,70.1C-31.4,62.1,-42.2,54,-53.7,44.5C-65.3,34.9,-77.6,23.9,-81.8,10.3C-86.1,-3.3,-82.3,-19.6,-76.1,-35.5C-70,-51.4,-61.5,-66.9,-48.4,-76.4C-35.3,-85.9,-17.7,-89.3,-0.3,-88.8C17,-88.3,34,-83.8,47,-74.3Z" transform="translate(100 100)" />
          </svg> */}
          <svg height={height * 3} width={width * 4.5} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill={page.currentProject.projectColor} d="M38,-70C46.7,-60.8,49.5,-45.5,46.2,-32.8C42.9,-20.1,33.5,-10.1,26.3,-4.1C19.2,1.8,14.2,3.6,15.5,12.8C16.9,22,24.4,38.7,22.9,42.1C21.3,45.5,10.7,35.6,0,35.5C-10.6,35.5,-21.2,45.3,-33.6,48.2C-46.1,51.1,-60.4,47.1,-60.1,37.9C-59.9,28.7,-45.1,14.4,-34.1,6.4C-23,-1.6,-15.7,-3.3,-18.9,-17.5C-22.1,-31.7,-35.7,-58.6,-34.3,-72.1C-32.9,-85.5,-16.4,-85.5,-0.9,-84C14.6,-82.4,29.3,-79.2,38,-70Z" transform="translate(100 100)" />
          </svg>
        </animated.div>
        <animated.div style={{ ...smallBlob, left: "-25%", top: "50%", position: "absolute", }}>
          <svg height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path fill="#e6e6e6" d="M43.1,-70.8C56.1,-67.1,67.1,-56.1,71.8,-43.1C76.5,-30.1,74.8,-15,70.5,-2.5C66.2,10.1,59.3,20.2,51.4,27.5C43.4,34.9,34.4,39.4,25.7,50.2C16.9,61,8.5,78.1,-3.7,84.4C-15.8,90.8,-31.6,86.4,-40.4,75.7C-49.3,64.9,-51.1,47.8,-58.2,34.1C-65.3,20.4,-77.7,10.2,-76.1,0.9C-74.6,-8.4,-59.1,-16.8,-50.8,-28.4C-42.5,-40.1,-41.4,-55,-34.2,-62C-26.9,-69,-13.5,-68.1,0.8,-69.4C15,-70.8,30.1,-74.4,43.1,-70.8Z" transform="translate(100 100)" />
          </svg>
        </animated.div>
        <animated.div style={{ ...smallBlob2, right: "-25%", bottom: "-80%", position: "absolute", }}>
          <svg height={height} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EBCC90" d="M41.8,-43.5C57.7,-36.6,76.4,-26.7,78.3,-14.1C80.1,-1.5,65.1,13.7,54.2,29.9C43.2,46,36.2,63.1,22.8,72C9.4,80.9,-10.3,81.7,-28,75.7C-45.6,69.8,-61.2,57.1,-71.3,40.6C-81.5,24.2,-86.1,4.1,-81.7,-13.3C-77.3,-30.7,-63.9,-45.4,-48.7,-52.4C-33.6,-59.5,-16.8,-58.9,-1.9,-56.6C13,-54.4,26,-50.4,41.8,-43.5Z" transform="translate(100 100)" />
            </svg>
          </svg>
        </animated.div>
        <animated.div style={{ ...smallBlob3, bottom: "45%", right: "-25%", position: "absolute", }}>
          <svg height={height * 0.7} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffdada" d="M43.6,-77.7C54.5,-69.2,60,-53.5,64,-39.4C68.1,-25.2,70.6,-12.6,69.8,-0.5C69,11.7,64.8,23.3,57.3,31.5C49.8,39.6,39,44.2,28.9,49C18.8,53.7,9.4,58.6,-0.3,59.1C-9.9,59.6,-19.9,55.6,-33.3,52.8C-46.8,50,-63.8,48.3,-68.1,39.7C-72.4,31.1,-64,15.6,-61.2,1.6C-58.5,-12.4,-61.4,-24.8,-59.6,-37.7C-57.8,-50.5,-51.2,-63.9,-40.5,-72.5C-29.7,-81.2,-14.9,-85.1,0.7,-86.4C16.3,-87.6,32.7,-86.3,43.6,-77.7Z" transform="translate(100 100)" />
            </svg>
          </svg>
        </animated.div>
        <animated.div style={{ ...smallBlob4, bottom: "-55%", left: "15%", position: "absolute", }}>
          <svg height={height * 0.2} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#EBCC90" d="M47.7,28.3C39.1,42.4,-6.1,36,-20.2,18.8C-34.3,1.5,-17.1,-26.7,5.5,-23.5C28.1,-20.3,56.2,14.2,47.7,28.3Z" transform="translate(100 100)" />
            </svg>
          </svg>
        </animated.div>
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
        <button onClick={onCloseClickedEvent} style={{ position: "fixed", right: "30px", top: "30px" }}>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
        </button>
        <div style={{ position: "absolute", left: "-30px", height: `${height}px`, display: "flex", alignItems: "center" }}>
          <TechContainer itemsPerRow={currentProject.tech.length > 10 ? 2 : 1} onFinishedAnimation={() => { return }} tech={currentProject.tech} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <animated.div style={{ ...titleStyle, textAlign: "center", }}>
            {currentProject.mainImage != null ? <img src={currentProject.mainImage.asset.url} style={{ backgroundColor: "transparent", maxHeight: "150px", marginTop: "20px" }} /> :
              <h1 style={{ fontSize: width > 400 ? "3em" : "2em" }}>{currentProject.title}</h1>}
          </animated.div>
          <animated.div style={{ ...descStyle, textAlign: "justify", width: "600px", marginTop: "50px" }}>
            {currentProject.descriptionRaw.map((b: BlockText) => {
              // console.log(b.children[0]._type, b.children[0].text);
              if (b.style == "h2") return React.createElement(b.style, { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
              if (b.style == "normal") return React.createElement("p", { key: b._key }, b.children[0].text);
              // return React.createElement("h1",null, "apa");
            })}
          </animated.div>
          {currentProject.videoDesktop ? <div style={{ display: "flex", justifyContent: "center", marginTop: "150px", marginBottom: "50px" }}>
            <img src="../../computerFrame.svg" style={{ position: "absolute", width: `${width / 4 * 3}px`, maxWidth: "800px", marginTop: "-100px" }} alt="screen" />
            <animated.div style={{ ...deskGifStyle, position: "relative", width: "100%", marginTop: "-75px", display: "flex", justifyContent: "center", marginBottom: "100px", }}>
              <a href={currentProject.deployUrl ? currentProject.deployUrl : null} target="_blank">
                <div style={{ width: `${(width / 4 * 3) - (width / 18 * 3)}px`, maxWidth: "620px" }}>
                  <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                    <source src={currentProject.videoDesktop.asset.url} type="video/mp4" />
                  </video>
                  {/* <div style={{ position: "absolute", backgroundColor: currentProject.projectColor, top: 0, height: "16%", width: "80%" }} />*/}
                  <div style={{ position: "absolute", bottom: "-25px", height: "30px", backgroundColor: "black", width: "100%" }} />
                  <div style={{ position: "absolute", top: "-10px", height: "10px", backgroundColor: "black", width: "100%" }} />
                </div>
              </a>
            </animated.div>
          </div> : null}

          {currentProject.videoMobile ? <div style={{ display: "flex", justifyContent: "center", marginTop: "80px", }}>
            <img src="../../mobileFrame.svg" style={{ position: "absolute", width: `${width / 3.5}px`, maxWidth: "290px", marginTop: "0px" }} alt="screen" />
            <animated.div style={{ ...deskGifStyle, position: "relative", width: "100%", marginTop: "25px", display: "flex", justifyContent: "center" }}>
              <a href={currentProject.deployUrl ? currentProject.deployUrl : null} target="_blank">
                <div style={{ width: `${width / 3.9}px`, maxWidth: "265px", borderRadius: "15px", overflow: "hidden" }}>
                  <video muted width={"100%"} height="auto" autoPlay playsInline loop>
                    <source src={currentProject.videoMobile.asset.url} type="video/mp4" />
                  </video>
                  {/* <div style={{ position: "absolute", backgroundColor: currentProject.projectColor, top: 0, height: "16%", width: "80%", maxWidth: "350px" }} />
                <div style={{ position: "absolute", backgroundColor: currentProject.projectColor, bottom: 0, height: "12%", width: "80%", maxWidth: "350px" }} /> */}
                </div>
              </a>
            </animated.div>
          </div> : null}
          {currentProject.githubRepositoryLink ?
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "150px" }}>
              <a className="buttidybuttbutt" onClick={(e) => { e.stopPropagation() }} href={currentProject.githubRepositoryLink} target="_blank" >
                Go to github repo
              </a>
            </div>
            : null}
          {currentProject.deployUrl ?
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <a className="buttidybuttbutt" onClick={e => e.stopPropagation()} target="_blank" href={currentProject.deployUrl}>
                Go to live build </a>
            </div> : null}
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