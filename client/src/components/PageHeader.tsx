import React from 'react';
import CSS from 'csstype';

const styles: CSS.Properties = {
  fontFamily: "Trochut, cursive",
  fontSize: "3em",
  textAlign: "center",
  marginTop: "10px",
  userSelect: "none"
}

const PageHeader: React.FC = ({ children }) => {
  return (
    <h1 style={styles}>
      {children}
    </h1>
  )
}

export default PageHeader;