import React, { useContext } from 'react';
import { PageContext } from '../src/contexts/pageContext';

const projects: React.FC = () => {
  const [page, setPage] = useContext(PageContext);
  console.log("current project", page.currentProject);
  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default projects;