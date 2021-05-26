import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';
import useSound from 'use-sound';


const FullProject = () => {
  const [playClick] = useSound("/click.wav");
  const [page, setPage] = useContext(PageContext);
  const style = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 }
  })
  const titleStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(-100px)", opacity: 0 },
    delay: 300
  })
  const descStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(-100px)", opacity: 0 },
    delay: 500
  })
  const onClickEventHandler = (event) => {
    event.stopPropagation();
    playClick();
    setPage(prev => ({ ...prev, currentProject: null, showProjects: false, slowMo: false }));
  }


  return (
    <animated.div onClick={onClickEventHandler} style={{ ...style, position: "absolute", left: 0, top: 0, right: 0, bottom: 0, backgroundColor: page.currentProject.projectColor, zIndex: 1, userSelect: "none", paddingLeft: "10%", paddingRight: "10%" }}>
      <animated.div style={{ ...titleStyle, textAlign: "center" }}>
        <h1 style={{ fontSize: "3em" }}>{(page.currentProject as Project).title}</h1>
      </animated.div>
      <animated.div style={{ ...descStyle, textAlign: "justify" }}>
        {(page.currentProject as Project).descriptionRaw.map((b: BlockText) => {
          // console.log(b.children[0]._type, b.children[0].text);
          return React.createElement(b.children[0]._type, { key: b._key }, b.children[0].text);
          // return React.createElement("h1",null, "apa");
        })}
      </animated.div>
    </animated.div >
  )
}

export default FullProject;