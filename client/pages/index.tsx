import { gql } from '@apollo/client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import client from '../src/apollo/apolloClient';
import BouncingBalls from '../src/components/bouncingBalls/BouncingBalls';
import PageHeaderMobile from '../src/components/PageHeaderMobile';
import PageHeaderDesktop from '../src/components/PageHeaderDesktop';
import { PageContext } from '../src/contexts/pageContext';
import useSound from 'use-sound';
import FullProject from '../src/components/fullProject/FullProject';
import FullProjectMobile from '../src/components/fullProject/FullProjectMobile';
import Bio from '../src/components/bio/Bio';
import Social from '../src/components/social/Social';
import Work from '../src/components/work/Work';
import SoundBtn from '../src/components/soundBtn/SoundBtn';
import ProjectsButton from '../src/components/projectsButton/ProjectsButton';
import { useViewport } from '../src/hooks/useViewPort';
import useRedirect from '../src/hooks/useRedirect';
import useGetRandomPosition from '../src/hooks/useGetRandomPosition';
import Background from '../src/components/background/Background';
import * as ga from '../lib/ga';
import Head from 'next/head'



interface props {
  projects: AllProjectData,
  tech: allTechData
}

export default function Home({ projects, tech }: props) {
  const [page, setPage] = useContext(PageContext);
  const [isMobile, setIsMobile] = useState(false);
  const { width, height } = useViewport();
  const focusMe = useRef(null);
  const [playClick] = useSound("/click.wav");

  useRedirect();

  const popState = () => {
    console.log("pop state!", "new state", { ...history.state });
    if (page.audio) { playClick() }
    const url: string = history.state.as;
    console.log("this is the page", url);
    if (url == null) {
      console.log("url is first page and is us undefined");
    } else if (url == "/main" || url == "/") {
      console.log("url is first page and is main");
    }

    setPage(prev=>({ ...history.state, audio: prev.audio }));
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("logging to ga");
      ga.pageview("main");
    }
  }, [])

  useEffect(() => {
    if (!page.firstStartDone) {
      console.log("setting first state", page);
      const newState = { ...page }
      window.history.pushState({ ...newState }, "main", `/main`);
      setPage(({ ...newState, firstStartDone: true }))
      console.log("histoyry", window.history.state)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('popstate', popState);
    return () => {
      window.removeEventListener('popstate', popState);
    }
  }, [])

  useEffect(() => {
    if (page.showBalls && !page.slowMo) {
      projects.allProject.forEach((p: Project) => {
        setPage(prev => ({ ...prev, projects: { ...prev.projects, [`${p._id}`]: { ...p, ...useGetRandomPosition() } } }))
      })
    }
  }, [page.showBalls, page.slowMo])

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

  useEffect(() => {
    if (width <= 800) {
      setIsMobile(true);
    } else { setIsMobile(false); }
  }, [width])


  const onClickEventHandler = () => {
    const newState = { ...page, slowMo: !page.slowMo, projects: getOrganizedProjects() };
    setPage(prev => ({ ...newState }));
    window.history.pushState({ ...newState }, page.currentPage, `/${page.currentPage}`);
    console.log("state pushed", window.history.state);
    if (page.audio) { playClick(); }
  }

  const getOrganizedProjects = () => {
    let projects: ProjectPlus[] = { ...page.projects };
    const length = Object.keys(projects).length;

    let orderedProjects = {};

    Object.keys(projects).forEach((k, i) => {
      orderedProjects[`${k}`] = {
        ...page.projects[`${k}`],
        left: "50%",
        top: `${50 / length * i + 40}%`
      }
    });
    return orderedProjects;
  }


  return (

    <div ref={focusMe} onClick={onClickEventHandler} style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", cursor: "pointer", overflowY: "hidden" }}>
      <Head>
        <meta name="twitter:card" content="Curriculum/portfolio web site 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy." />
        <meta name="twitter:site" content="@Anthon_Wellsjo" />
        <meta name="twitter:title" content="Anthon Wellsjö Portfolio" />
        <meta name="twitter:description" content="Curriculum 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy." />
        <meta name="twitter:image" content="https://pbs.twimg.com/profile_images/778947258117152768/LjuuB1T8_400x400.jpg" />

        <meta property="og:url" content={"https://curriculum-2021.vercel.app/"} key="ogurl" />
        <meta property="og:image" content={"https://pbs.twimg.com/profile_images/778947258117152768/LjuuB1T8_400x400.jpg"} key="ogimage" />
        <meta property="og:site_name" content="Anthon Wellsjö Portfolio" key="ogsitename" />
        <meta name="title" property="og:title" content={"main"} key="ogtitle" />
        <meta property="og:description" content="Curriculum 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy." key="ogdesc" />

        <title>Anthon Wellsjö Portfolio</title>
        <meta name="description" content="Curriculum 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="HandheldFriendly" content="true" />
        <link rel="icon" href="/laptop.png" />
      </Head>
      <Background />

      {page.currentPage != "project" && isMobile && <PageHeaderMobile />}
      {page.currentPage != "project" && !isMobile && <PageHeaderDesktop />}
      <SoundBtn />
      {page.currentPage == "main" && <ProjectsButton />}
      {page.showProjects && !isMobile && <FullProject />}
      {page.showProjects && isMobile && <FullProjectMobile />}
      {page.showBalls && page.currentPage == "main" && <BouncingBalls />}
      {page.showBalls && page.currentPage == "main" && <div style={{ position: "absolute", width: "10px", height: "10px", left: `${(width / 2) - 4}px`, top: `${(height / 2) - 30}px`, zIndex: 2 }} />}
      {page.currentPage == "bio" && <Bio />}
      {page.currentPage == "social" && <Social />}
      {page.currentPage == "work" && <Work tech={tech} />}
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
          tech {
            title
            description
            techlogo{asset{url}}
          }
          videoDesktop {
            asset {
              url
            }
          }
          videoMobile {
            asset {
              url
            }
          }
          mainImage {
            asset {
              url
            }
          }
          githubRepositoryLink
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
          link
        }
      }
    `,
  });

  return {
    props: { projects, tech }, // will be passed to the page component as props
  }
}