import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import 'keen-slider/keen-slider.min.css';

import "../styles/reset.scss";
import "../styles/globals.scss";

import { PlayerProvider } from "../providers/PlayerProvider";

import type { AppProps, NextWebVitalsMetric } from "next/app";
import { FooterPlayer } from "../components/FooterPlayer/FooterPlayer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import * as FLATTED from 'flatted';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient());
  return (
    <QueryClientProvider client={queryClient.current}>
        <PlayerProvider>
      <Hydrate state={pageProps.dehydratedState && FLATTED.parse(pageProps.dehydratedState)}>
          <Component {...pageProps} />
          <FooterPlayer />
      </Hydrate>
        </PlayerProvider>
    </QueryClientProvider>
  );
}

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
	console.log('id',id, name, value)
	// Use `window.gtag` if you initialized Google Analytics as this example:
	// https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js

	// @ts-expect-error
	window.gtag('event', name, {
	  event_category:
		label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
	  value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
	  event_label: id, // id unique to current page load
	  non_interaction: true, // avoids affecting bounce rate.
	})
  }

export default MyApp;
