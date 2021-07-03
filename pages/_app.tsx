import React from "react";

import "@fortawesome/fontawesome-svg-core/styles.css";
import 'keen-slider/keen-slider.min.css';

import "../styles/reset.scss";
import "../styles/globals.scss";

import { PlayerProvider } from "../providers/PlayerProvider";

import type { AppProps } from "next/app";
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
export default MyApp;
