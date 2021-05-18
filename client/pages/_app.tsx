import '../styles/globals.css';
import {PageProvider} from '../src/contexts/pageContext';

function MyApp({ Component, pageProps }) {
  return (
    <PageProvider>
      <Component {...pageProps} />
    </PageProvider>
  )
}

export default MyApp
