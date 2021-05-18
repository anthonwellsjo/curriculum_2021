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
    from: { ...positions[0] },
    to: [...positions.map((p, i) => { if (i != 0) return { left: p.left, top: p.top } })],
    config: {
      duration: 1000
    }
  })


  return (
    <animated.div style={{ ...style, position: "fixed", }}>
      <div style={{ position: "absolute", width: "100px", height: "100px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: "-30px" }}>
        <div>
          <animated.div style={{ width: "40px", height: "40px", borderRadius:"40px", border: "1px solid black", position: "fixed", backgroundColor: "white" }} />
        </div>
      </div>
    </animated.div>
  )
}

export default SplashingSpruts;