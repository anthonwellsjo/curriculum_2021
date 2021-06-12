import '../styles/globals.css';
import { PageProvider } from '../src/contexts/pageContext';
import { ViewportProvider } from '../src/hooks/useViewPort';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageProvider>
      <ViewportProvider>
        {typeof window === 'undefined' ? null : <Component {...pageProps} />}
      </ViewportProvider>
    </PageProvider>
  )
}

export default MyApp
