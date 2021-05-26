import { gql } from '@apollo/client';
import Head from 'next/head';
import { ElementRef, useContext, useEffect, useRef } from 'react';
import client from '../src/apollo/apolloClient';
import BouncingBalls from '../src/components/bouncingBalls/BouncingBalls';
import Knapp from '../src/components/knapp/Knapp';
import PageHeader from '../src/components/PageHeader';
import { PageContext } from '../src/contexts/pageContext';
import useGetRandomPosition from '../src/hooks/useGetRandomPosition';
import useSound from 'use-sound';
import FullProject from '../src/components/fullProject/FullProject';
import Bio from '../src/components/bio/Bio';



interface props {
  data: AllProjectData
}

export default function Home({ data: projects }: props) {
  const [page, setPage] = useContext(PageContext);
  const focusMe = useRef(null);
  const [playClick] = useSound("/click.wav");
  useEffect(() => {
    projects.allProject.forEach((p: Project) => {
      setPage(prev => ({ ...prev, projects: { ...prev.projects, [`${p._id}`]: { ...p, ...useGetRandomPosition() } } }))
    })
  }, [])

  useEffect(() => {
    if (page.currentProject && page.showBalls) {
      setTimeout(() => {
        setPage(prev => ({ ...prev, showProjects: true }))
      }, 300)
      setTimeout(() => {
        setPage(prev => ({ ...prev, showBalls: false }))
      }, 1000)

    }
    if (!page.currentProject && !page.showBalls) {
      setPage(prev => ({ ...prev, showBalls: true }))
    }
  }, [page.currentProject])


  const onClickEventHandler = () => {
    setPage(prev => ({ ...prev, slowMo: !prev.slowMo }));
    playClick();
  }



  return (
    <div ref={focusMe} onClick={onClickEventHandler} style={{ width: "100vw", height: "100vh", overflow: "hidden", cursor: "pointer" }}>
      <Head>
        <title>Anthon Wellsjö</title>
        <meta name="description" content="Curriculum 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy." />
        <link rel="icon" href="/ball.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Trochut:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"></link>
      </Head>

      <PageHeader />
      {page.showProjects && <FullProject />}
      {page.showBalls && page.currentPage == "main" && <BouncingBalls />}
      {page.currentPage == "bio" && <Bio />}


      <footer>

      </footer>
    </div>
  )
}


export async function getStaticProps(context) {
  const { data } = await client.query({
    query: gql`
      query project{
        allProject {
          title
          projectColor
          _id
          descriptionRaw
          slug{current}
          deployUrl
        }
      }
    `,
  });

  return {
    props: { data }, // will be passed to the page component as props
  }
}