import React, { useContext } from 'react';
import { PageContext } from '../../contexts/pageContext';
import BouncingBall from '../bouncingBall/BouncingBall';
import SplashingSpruts from '../splashingSpruts/SplashingSpruts';

const BouncingBalls: React.FC = () => {
  const [page, setPage] = useContext(PageContext);
  if (page.projects == null) { return null };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      {/* {page.splashASprut && !page.slowMo && <SplashingSpruts />} */}
      {Object.keys(page.projects).map((p) => {
        const project: Project = page.projects[p] as Project;
        return <BouncingBall key={project._id} project={project} />
      })}
    </div>
  )
}

export default BouncingBalls;