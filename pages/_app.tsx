import React, { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "keen-slider/keen-slider.min.css";

import "../styles/reset.scss";
import "../styles/globals.scss";

import type { AppProps, NextWebVitalsMetric } from "next/app";
import { FooterPlayer } from "../components/FooterPlayer/FooterPlayer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import * as FLATTED from "flatted";
import NextNProgress from "nextjs-progressbar";
import { logWebVitals } from "../api/Mixpanel.api";
import { AudioPlayerProvider } from "../providers/PlayerProvider/PlayerProviderV2";

mixpanel.init(process.env.MIXPANEL_API_KEY!, { debug: true });

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = React.useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <NextNProgress color="#ded15b" />
        <AudioPlayerProvider>
          <Hydrate
            state={
              pageProps.dehydratedState &&
              FLATTED.parse(pageProps.dehydratedState)
            }
          >
            <Component {...pageProps} />
            <FooterPlayer />
          </Hydrate>
        </AudioPlayerProvider>
    </QueryClientProvider>
  );
}

export function reportWebVitals({
  id,
  name,
  label,
  value,
}: NextWebVitalsMetric) {
  // Use `window.gtag` if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js

  // @ts-expect-error
  window.gtag("event", name, {
    event_category:
      label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  });

  logWebVitals({
    eventName: name,
    value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
  });
}

export default MyApp;
