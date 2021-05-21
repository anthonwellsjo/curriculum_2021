import React, { ReactNode } from 'react';
import CSS from 'csstype';

const btnStyle: CSS.Properties = {
  height: "50px",
  width: "50px",
  borderRadius: "50px",
  border: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor:"pointer"
}

interface props {
  clicky: () => void,
  children: ReactNode,
  aktiv: boolean,

}


const Knapp = ({ clicky, children, aktiv }: props) => {
  return (
    <div style={btnStyle} onClick={clicky}>
      {children}
    </div>
  )
}

export default Knapp;