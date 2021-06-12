import { gql } from '@apollo/client';
import Head from 'next/head';
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
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import useRedirect from '../src/hooks/useRedirect';



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
    console.log("pop state!")
    setPage({ ...history.state });
  }

  useEffect(() => {
    window.addEventListener('popstate', popState);
    return () => {
      window.removeEventListener('popstate', popState);
    }
  }, [])

  useEffect(() => {
    if (page.currentProject != null) {
      // setPage(prev => ({...prev, currentPage: "project"}))
      window.history.pushState({ ...page }, page.currentPage, `/project/${page.currentProject.slug.current}`);
    } else {
      console.log("current state", history.state, "next state", { ...page });
      console.log("pushing state!");
      window.history.pushState({ ...page }, page.currentPage, `/${page.currentPage}`);
    }
  }, [page.currentPage, page.currentProject])

  useEffect(() => {
    window.history.pushState({ ...page }, page.currentPage, `/main`);
  }, [])

  useEffect(() => {
    if (page.showBalls && !page.slowMo) {
      projects.allProject.forEach((p: Project) => {
        setPage(prev => ({ ...prev, projects: { ...prev.projects, [`${p._id}`]: { ...p, left: "50%", top: "50%" } } }))
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

  const title = "Anthon Wellsjö Portfolio";
  const description = "Curriculum 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy.";

  return (
    <Router>
      <Switch>
        <Route path="/">
          <div ref={focusMe} onClick={onClickEventHandler} style={{ width: "100vw", height: "100vh", overflow: "hidden", cursor: "pointer", overflowY: "hidden" }}>
            <Head>
              <meta name="twitter:card" content="summary" />
              <meta name="twitter:site" content="@nytimesbits" />
              <meta name="twitter:creator" content="@nickbilton" />
              <meta property="og:url" content="http://bits.blogs.nytimes.com/2011/12/08/a-twitter-for-my-sister/" />
              <meta property="og:title" content="A Twitter for My Sister" />
              <meta property="og:description" content="In the early days, Twitter grew so quickly that it was almost impossible to add new features because engineers spent their time trying to keep the rocket ship from stalling." />
              <meta property="og:image" content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg" />

              <title>{title}</title>
              <meta name="description" content={description} />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
              <meta name="HandheldFriendly" content="true" />


              <link rel="icon" href="/laptop.png" />
            </Head>

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
        </Route>
      </Switch>
    </Router>
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
        }
      }
    `,
  });

  return {
    props: { projects, tech }, // will be passed to the page component as props
  }
}