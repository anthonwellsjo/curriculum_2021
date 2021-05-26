import '../styles/globals.css';
import { PageProvider } from '../src/contexts/pageContext';
import { ViewportProvider } from '../src/hooks/useViewPort';

function MyApp({ Component, pageProps }) {
  return (
    <PageProvider>
      <ViewportProvider>
        <Component {...pageProps} />
      </ViewportProvider>
    </PageProvider>
  )
}

export default MyApp
