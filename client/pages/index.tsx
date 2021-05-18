import { gql } from '@apollo/client'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import client from '../src/apollo/apolloClient'
import BouncingBall from '../src/components/bouncingBall/BouncingBall'
import BouncingBalls from '../src/components/bouncingBalls/BouncingBalls'
import PageHeader from '../src/components/PageHeader'
import { PageContext } from '../src/contexts/pageContext'
import useGetRandomPosition from '../src/hooks/useGetRandomPosition'
import useMaybe from '../src/hooks/useMaybe'


interface props {
  data: AllProjectData
}

export default function Home({ data: projects }: props) {
  const [page, setPage] = useContext(PageContext);

  useEffect(() => {
    console.log("set page", projects);
    // const projectsPlusPosition: ProjectPlus[] = projects.allProject.map((p: Project) => {
    //   const project: ProjectPlus = { ...p, ...useGetRandomPosition() };
    //   return project;
    // })
    // setPage(prev => ({ ...prev, projects: projectsPlusPosition }))

    projects.allProject.forEach((p: Project) => {
      setPage(prev => ({ ...prev, projects: { ...prev.projects, [`${p._id}`]: { ...p, ...useGetRandomPosition() } } }))
    })
  }, [])
  var timeout;
  var flag = false;


  const onMouseMoveEventHandler = (e: MouseEvent) => {

    if (!flag) {
      flag = true
      console.log("setting slowmo to true", page.slowMo);
      setPage(prev => ({ ...prev, slowMo: true }));
      setTimeout(() => { flag = false }, 2000);
    }




    clearTimeout(timeout);
    timeout = setTimeout(function () {
      console.log("setting slowmo to false", page.slowMo);
      setPage(prev => ({ ...prev, slowMo: false }));
    }, 2000);

  }

  useEffect(() => {

    window.addEventListener('mousemove', onMouseMoveEventHandler);
    () => {
      window.removeEventListener('mousemove', onMouseMoveEventHandler);
    }
  }, [])


  return (
    <div>
      <Head>
        <title>Anthon Wellsjö</title>
        <meta name="description" content="Curriculum 2021 for Carl Anthon Wellsjö, swedish web developer, working remote from Perugia, Italy." />
        <link rel="icon" href="/ball.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Trochut:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet"></link>
      </Head>

      <main>
        <PageHeader>Anthon Wellsjö</PageHeader>
        <BouncingBalls />
      </main>

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
        }
      }
    `,
  });

  return {
    props: { data }, // will be passed to the page component as props
  }
}