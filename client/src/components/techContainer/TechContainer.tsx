import React, { useContext, useEffect, useState } from 'react';
import { useTransition, animated, useSpring } from 'react-spring'
import useSound from 'use-sound';
import { PageContext } from '../../contexts/pageContext';

interface props {
  tech: tech[],
  onFinishedAnimation: () => void,
  itemsPerRow: number
}

interface modalInfo {
  title: string,
  description: string,
  logo: string,
  link: string
}

const TechContainer = ({ tech, onFinishedAnimation, itemsPerRow }: props) => {
  const [items, setItems] = useState<tech[]>([]);
  const [page, setPage] = useContext(PageContext);
  const [playClick] = useSound("/pop.wav");
  const [modal, setModal] = useState<{ open: boolean, tech: modalInfo | null }>({ open: false, tech: null });
  let x = 0;
  const [sound, setSound] = useState(0.1);

  useEffect(() => {
    let interval = setInterval(() => {
      if (tech[x] !== undefined) {
        setItems(prev => ([...prev, tech[x]]));
        x++;
      } else {
        clearInterval(interval);
      }
      if (tech.length - 1 === x) {
        onFinishedAnimation();
      }
    }, 100);

    return () => {
      clearInterval(interval)
    };
  }, [])

  const modalTrans = useTransition(modal.open, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: modal.open,
  })

  const transitions = useTransition(items, {
    from: { opacity: 0, transform: "scale(0)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0)" },
    config: { mass: 1, tension: 200 },
    onStart: () => { if (page.audio) { playClick({ playbackRate: sound }); setSound(sound + (3 / tech.length)) } }
  })

  const onClickEventHandler = (e) => {
    e.stopPropagation();
    const logo = e.target.src
    const title = e.target.getAttribute('data-title');
    const desc = e.target.getAttribute('data-description');
    const link = e.target.getAttribute('data-link');
    const techToModal = { description: desc, title: title, logo: logo, link: link }
    setModal(prev => ({ open: true, tech: techToModal }))
  }

  const onModalClickEventHandler = (e) => {
    e.stopPropagation();
    setModal(prev => ({ ...prev, open: false }))
  }


  return (
    <div
      onClick={e => { e.stopPropagation() }}
      style={{
        display: "grid",
        height: `${Math.ceil(tech.length / itemsPerRow) * 60}px`,
        maxWidth: "80%",

        width: "auto",
        gridColumnGap: "10px",
        gridRowGap: "10px",
        gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)`,
        gridTemplateRows: `repeat(${Math.ceil(tech.length / itemsPerRow)}, 1fr)`,
        padding: "10px",
      }
      }>
      {transitions(({ opacity, transform }, items) => (
        <animated.div
          onClick={e => { e.stopPropagation(); }}
          style={{
            opacity: opacity.to(y => y),
            transform: transform.to(z => z)
          }}>
          <div
            style={{
              // backgroundColor: "red",
              width: "50px",
              display: "inline"
            }}>
            {/* <p style={{ textAlign: "center", fontFamily: "Martel", fontWeight: 800, fontSize: "1.8em", marginTop: "2px" }}>{items.techlogo.asset.url}</p> */}
            <img onClick={onClickEventHandler} data-link={items.link} data-description={items.description} data-title={items.title} src={`${items.techlogo.asset.url}`} style={{ width: "50px" }} />
          </div>
        </animated.div>
      ))}
      {
        modalTrans(
          (styles, item) => item && <animated.div style={{ ...styles, position: "fixed", zIndex: 10 }}>
            <div
              onClick={onModalClickEventHandler}
              style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                display: "flex",
                justifyContent: "center",
                backgroundColor: "rgba(256,256,256, 0.5)",
                zIndex: 10
              }}>
              <div style={{
                width: modal.tech.description != null ? "90%" : "none",
                maxWidth: "500px",
                position: "absolute",
                top: "20%",
                backgroundColor: "rgba(256,256,256,0.8)",
                borderRadius: "4px",
                boxShadow: "3px 3px 15px grey"
              }}>
                <div style={{ boxSizing: "content-box", padding: "25px", paddingRight: "25px" }}>
                  <div style={{
                    width: "100%", display: "flex",
                    justifyContent: "center",
                  }}>
                    <img src={modal.tech.logo} style={{ height: "80px", maxWidth: "100px" }} />
                  </div>
                  <h3 style={{ textAlign: "center" }}>{modal.tech.title}</h3>
                  <p style={{ textAlign: "justify" }}>{modal.tech.description}</p>
                  <div style={{ width: "100%", textAlign: "center", marginTop: "50px" }}>
                    <a className="buttidybuttbutt" style={{ fontSize: "2em" }} href={modal.tech.link} target={"_blanc"}>Learn more..</a>
                  </div>
                </div>
              </div>
            </div>
          </animated.div>
        )
      }
    </div >
  )
}

export default TechContainer;