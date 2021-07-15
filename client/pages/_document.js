import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

  render() {
    return (
      <Html>
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
              'cookie_domain': 'none'
            });
          `,
            }}
          />
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
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}