import "@fortawesome/fontawesome-svg-core/styles.css"; 

import '../styles/globals.css'
import '../styles/reset.scss'


import { PlayerProvider } from '../providers/PlayerProvider'

import type { AppProps } from 'next/app'
import { FooterPlayer } from '../components/FooterPlayer/FooterPlayer'
import { QueryClient, QueryClientProvider } from 'react-query'

function MyApp({ Component, pageProps }: AppProps) {
  return(
	  <QueryClientProvider client={new QueryClient()}>
	  <PlayerProvider>
		  <Component {...pageProps} />
		  <FooterPlayer />
	  </PlayerProvider>
	  </QueryClientProvider>
		  )
  }
export default MyApp
