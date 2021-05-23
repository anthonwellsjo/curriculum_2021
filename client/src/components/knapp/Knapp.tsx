import React, { ReactNode, useContext } from 'react';
import CSS from 'csstype';
import { PageContext } from '../../contexts/pageContext';
import useSound from 'use-sound';

const btnStyle: CSS.Properties = {
  height: "50px",
  width: "50px",
  borderRadius: "50px",
  border: "1px solid black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer"
}

interface props {
  children: ReactNode,
}


const Knapp = ({ children }: props) => {
  const [page, setPage] = useContext(PageContext);
  const [playClick] = useSound("/click.wav");

  const onClickEventHandler = () => {
    setPage(prev => ({ ...prev, slowMo: !prev.slowMo }));
    playClick();
  }

  return (
    <div style={btnStyle} onClick={onClickEventHandler}>
      {children}
    </div>
  )
}

export default Knapp;