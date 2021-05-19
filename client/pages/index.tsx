import { gql } from '@apollo/client'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import client from '../src/apollo/apolloClient'
import BouncingBalls from '../src/components/bouncingBalls/BouncingBalls'
import Knapp from '../src/components/knapp/Knapp'
import PageHeader from '../src/components/PageHeader'
import { PageContext } from '../src/contexts/pageContext'
import useGetRandomPosition from '../src/hooks/useGetRandomPosition'


interface props {
  data: AllProjectData
}

export default function Home({ data: projects }: props) {
  const [page, setPage] = useContext(PageContext);

  useEffect(() => {
    projects.allProject.forEach((p: Project) => {
      setPage(prev => ({ ...prev, projects: { ...prev.projects, [`${p._id}`]: { ...p, ...useGetRandomPosition() } } }))
    })
  }, [])
  var timeout;
  var flag = false;





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
        <Knapp aktiv={page.slowMo} clicky={() => { setPage(prev => ({ ...prev, slowMo: !prev.slowMo })) }}>
          <h1>X</h1>
        </Knapp>
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