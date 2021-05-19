import React from 'react';

interface props {
  project: Project
}

const Dragon = ({ project }: props) => {
  return (
    <div style={{ width: "100px", height: "100px", backgroundColor: project.projectColor }}></div>
  )
}

export default Dragon;