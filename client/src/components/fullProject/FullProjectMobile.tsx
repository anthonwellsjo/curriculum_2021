import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useSound from 'use-sound';
import { useViewport } from '../../hooks/useViewPort';


const FullProjectMobile = () => {
  const { width, height } = useViewport();
  const [playClick] = useSound("/click.wav");
  const [page, setPage] = useContext(PageContext);

  const style = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
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
  const deskGifStyle = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 800
  })
  const onClickEventHandler = (event) => {
    event.stopPropagation();
    if (page.audio) playClick();
    setPage(prev => ({ ...prev, currentProject: null, showProjects: false, slowMo: false }));
  }

  const currentProject: Project = page.currentProject;

  return (
    <animated.div className="noScrollBar" onClick={onClickEventHandler} style={{ ...style, position: "absolute", left: 0, top: 0, right: 0, bottom: 0, backgroundColor: page.currentProject.projectColor, zIndex: 1, userSelect: "none", paddingLeft: "10%", paddingRight: "10%", overflowY: "scroll" }}>
      <animated.div style={{ ...titleStyle, textAlign: "center" }}>
        <h1 style={{ fontSize: width > 400 ? "3em" : "2em" }}>{currentProject.title}</h1>
      </animated.div>
      <animated.div style={{ ...deskGifStyle, textAlign: "justify", display: "flex", justifyContent: "center", paddingTop: "20px" }}>
        <iframe src={currentProject.gifLinkDesktop} style={{ userSelect: "none" }} width="480" height="288" frameBorder="0" ></iframe>
      </animated.div >
      <animated.div style={{ ...descStyle, textAlign: "justify" }}>
        {currentProject.descriptionRaw.map((b: BlockText) => {
          // console.log(b.children[0]._type, b.children[0].text);
          return React.createElement(b.style, { key: b._key }, b.children[0].text);
          // return React.createElement("h1",null, "apa");
        })}
      </animated.div>
      <animated.div style={{ ...deskGifStyle, textAlign: "justify", display: "flex", justifyContent: "center", paddingTop: "20px" }}>
        <iframe src={currentProject.gifLinkMobile} style={{ userSelect: "none" }} width="268" height="480" frameBorder="0" ></iframe>
      </animated.div >
    </animated.div >
  )
}

export default FullProjectMobile;