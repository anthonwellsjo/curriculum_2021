import { gql } from '@apollo/client';
import { useSpring } from '@react-spring/core';
import React, { useContext } from 'react';
import { animated } from 'react-spring';
import useSound from 'use-sound';
import client from '../../apollo/apolloClient';
import { PageContext } from '../../contexts/pageContext';
import TechContainer from '../techContainer/TechContainer';

interface props {
  tech: allTechData
}

export default function Work({ tech }: props) {
  console.log("tech", tech);
  const [playClose] = useSound("/closepage.wav", { volume: 0.4 });
  const firstStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 100
  })
  const headStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 300
  })
  const logoStyle = useSpring({
    to: { transform: "translateY(0px)", opacity: 1 },
    from: { transform: "translateY(100px)", opacity: 0 },
    delay: 500
  })
  const [page, setPage] = useContext(PageContext);
  const onClickEventHandler = (e) => {
    playClose();
    e.stopPropagation();
    setPage(prev => ({ ...prev, currentPage: "main", slowMo: false }));
  }
  return (
    <div onClick={onClickEventHandler} style={{ width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none", marginTop: "100px" }}>
      <animated.h1 style={firstStyle}>Skills</animated.h1>
      <TechContainer tech={tech.allTech}/>
      <animated.h1 style={headStyle}>Currently student at:</animated.h1>
      <animated.div style={{ ...logoStyle, backgroundColor: "black", padding: "10px" }}>
        <img style={{ width: "200px" }} src="/varnamo.svg"></img>
      </animated.div>
    </div >
  )
}


export async function getStaticProps(context) {
  const { data } = await client.query({
    query: gql`
      query tech{
        allTech {
          title
          description
          techlogo {
            asset {
              url
            }   
          }
        }
      }
    `,
  });

  return {
    props: { data }, // will be passed to the page component as props
  }
}