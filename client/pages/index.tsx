import { gql } from '@apollo/client';
import Head from 'next/head';
import React, { useContext, useEffect, useRef } from 'react';
import client from '../src/apollo/apolloClient';
import BouncingBalls from '../src/components/bouncingBalls/BouncingBalls';
import PageHeader from '../src/components/PageHeader';
import { PageContext } from '../src/contexts/pageContext';
import useGetRandomPosition from '../src/hooks/useGetRandomPosition';
import useSound from 'use-sound';
import FullProject from '../src/components/fullProject/FullProject';
import FullProjectMobile from '../src/components/fullProject/FullProjectMobile';
import Bio from '../src/components/bio/Bio';
import Social from '../src/components/social/Social';
import Work from '../src/components/work/Work';
import SoundBtn from '../src/components/soundBtn/SoundBtn';
import ProjectsButton from '../src/components/projectsButton/ProjectsButton';
import { useViewport } from '../src/hooks/useViewPort';



interface props {
  projects: AllProjectData,
  tech: allTechData
}

export default function Home({ projects, tech }: props) {
  const [page, setPage] = useContext(PageContext);
  const { width, height } = useViewport();
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

  useEffect(() => {
    if (page.currentPage === "main" && page.showHeaderButtons) {
      setPage(prev => ({ ...prev, showHeaderButtons: false }))
      setTimeout(() => {
        setPage(prev => ({ ...prev, renderHeaderButtons: false }))
      }, 400)
    }
  }, [page.currentPage])


  const onClickEventHandler = () => {
    setPage(prev => ({ ...prev, slowMo: !prev.slowMo }));
    if (page.audio) playClick();
    organizeProjects();
  }

  const organizeProjects = () => {
    let projects: ProjectPlus[] = { ...page.projects };
    const length = Object.keys(projects).length;
    Object.keys(projects).forEach((k, i) => {
      setPage(prev => ({
        ...prev,
        projects: {
          ...prev.projects,
          [`${k}`]: {
            ...prev.projects[`${k}`],
            left: "50%",
            top: `${80 / length * i + 30}%`
          }
        }
      }))
    })
    console.log("currently this many projects", Object.keys(projects).length);

  }

  return (
    <div ref={focusMe} onClick={onClickEventHandler} style={{ width: "100vw", height: "100vh", overflow: "hidden", cursor: "pointer" }}>
      <Head>
        <title>Anthon Wellsjö</title>
        <meta name="description" content="Curriculum 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="HandheldFriendly" content="true" />
        <link rel="icon" href="/ball.png" />
      </Head>
      <PageHeader />
      <SoundBtn />
      {page.currentPage == "main" && <ProjectsButton />}
      {page.showProjects && width > 800 && <FullProject />}
      {page.showProjects && width <= 800 && <FullProjectMobile />}
      {page.showBalls && page.currentPage == "main" && <BouncingBalls />}
      {page.currentPage == "bio" && <Bio />}
      {page.currentPage == "social" && <Social />}
      {page.currentPage == "work" && <Work tech={tech} />}
      <footer>

      </footer>
    </div>
  )
}


export async function getStaticProps(context) {
  const { data: projects } = await client.query({
    query: gql`
      query project{
        allProject {
          title
          projectColor
          _id
          descriptionRaw
          slug{current}
          deployUrl
          gifLinkDesktop
          gifLinkMobile
          tech {
            title
            description
            techlogo{asset{url}}
          }
        }
      }
    `,
  });

  const { data: tech } = await client.query({
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
    props: { projects, tech }, // will be passed to the page component as props
  }
}