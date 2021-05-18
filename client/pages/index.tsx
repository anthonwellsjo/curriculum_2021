import Head from 'next/head'
import { useContext, useEffect } from 'react'
import BouncingBall from '../src/components/bouncingBall/BouncingBall'
import PageHeader from '../src/components/PageHeader'
import { PageContext } from '../src/contexts/pageContext'


export default function Home() {
  const [page, setPage] = useContext(PageContext);
  var timeout;
  var flag = false;


  const onMouseMoveEventHandler = (e: MouseEvent) => {

    if (!flag) {
      flag = true
      console.log("setting slowmo to true", page.slowMo);
      setPage(prev => ({ ...prev, slowMo: true }));
      setTimeout(() => { flag = false }, 5000);
    }




    clearTimeout(timeout);
    timeout = setTimeout(function () {
      console.log("setting slowmo to false", page.slowMo);
      setPage(prev => ({ ...prev, slowMo: false }));
    }, 5000);

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
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <BouncingBall color={"red"} />
          <BouncingBall color={"blue"} />
          <BouncingBall color={"yellow"} />
          <BouncingBall color={"green"} />
        </div>


      </main>

      <footer>

      </footer>
    </div>
  )
}
