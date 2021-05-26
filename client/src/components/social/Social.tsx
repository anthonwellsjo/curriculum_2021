import React, { useContext } from 'react';
import useSound from 'use-sound';
import { PageContext } from '../../contexts/pageContext';

const Social: React.FC = () => {
  const [playClose] = useSound("/closepage.wav");
  const [page, setPage] = useContext(PageContext);
  const onClickEventHandler = (e) => {
    playClose({ playbackRate: 1.8 });
    e.stopPropagation();
    setTimeout(() => {
      setPage(prev => ({ ...prev, currentPage: "main", slowMo: false }));
    }, 300)
  }
  return (
    <div onClick={onClickEventHandler} style={{ width: "100%", height: "100%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", userSelect: "none" }}>
      <h1>social</h1>
    </div>
  )
}

export default Social;