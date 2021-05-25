import React, { useContext } from 'react';
import { animated, useSpring } from 'react-spring';
import { PageContext } from '../../contexts/pageContext';

const SplashingSpruts: React.FC = () => {
  const [page, setPage] = useContext(PageContext);
  let positions: { left: string, top: string }[] = []
  Object.keys(page.projects).forEach(k => {
    const project: ProjectPlus = page.projects[k] as ProjectPlus;
    positions.push({ left: project.left, top: project.top })
  });
  const style = useSpring({
    from: { transform: "scale(1)", opacity: 0 },
    to: [{ opacity: 1 }, { opacity: 0 }],
    config: {
      duration: 300
    }
  })


  return (
    <animated.div style={{ ...style, position: "fixed", top: page.splashASprut.position.top, left: page.splashASprut.position.left, transformOrigin: "top" }}>
      <div style={{ position: "absolute", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "-30px" }}>
        <div>
          <animated.div style={{ width: "40px", height: "40px", borderRadius: "40px", position: "fixed", border: "1px dotted orange" }} />
        </div>
      </div>
    </animated.div>
  )
}

export default SplashingSpruts;