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
  const onClickEventHandler = (event) => {
    event.stopPropagation();
    if (page.audio) playClick();
    setPage(prev => ({ ...prev, currentProject: null, showProjects: false, slowMo: false }));
  }

  const currentProject: Project = page.currentProject;

  return (
    <animated.div onClick={onClickEventHandler}
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
        overflowX: "hidden"
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
        <div style={{ position: "absolute", left: "-30px", height: `${height}px`, display:"flex",alignItems:"center" }}>
          <TechContainer itemsPerRow={1} onFinishedAnimation={() => { return }} tech={currentProject.tech} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <animated.div style={{ ...titleStyle, textAlign: "center", }}>
            <h1 style={{ fontSize: width > 400 ? "3em" : "2em" }}>{currentProject.title}</h1>
          </animated.div>
          <div style={{ display: "flex", justifyContent: "center", }}>
            <animated.div style={{ ...mobileGifStyle, position: "relative", width: "480px", height: "288px", marginBottom: "20px" }}>
              <iframe src={currentProject.gifLinkDesktop} style={{ position: "absolute" }} width="480" height="288" frameBorder="0" ></iframe>
              <div style={{ width: "480px", height: "288px", position: "absolute", outline: "solid 10px black" }} />
            </animated.div >
          </div>
          <animated.div style={{ ...descStyle, textAlign: "justify", width: "600px" }}>
            {currentProject.descriptionRaw.map((b: BlockText) => {
              // console.log(b.children[0]._type, b.children[0].text);
              if (b.style == "h2") return React.createElement(b.style, { key: b._key, style: { textAlign: "center" } }, b.children[0].text);
              return React.createElement(b.style, { key: b._key }, b.children[0].text);
              // return React.createElement("h1",null, "apa");
            })}
          </animated.div>

          <div style={{ display: "flex", justifyContent: "center", }}>
            <animated.div style={{ ...deskGifStyle, position: "relative", width: "480px", height: "480px", marginTop: "50px", display: "flex", justifyContent: "center" }}>
              <iframe src={currentProject.gifLinkMobile} style={{ position: "absolute" }} width="268" height="480" frameBorder="0" ></iframe>
              <div style={{ width: "268px", height: "480px", position: "absolute", outline: "solid 10px black" }} />
            </animated.div>
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