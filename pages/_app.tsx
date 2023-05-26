import React, { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "keen-slider/keen-slider.min.css";

import "../styles/reset.scss";
import "../styles/globals.scss";

import type { AppProps, NextWebVitalsMetric } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import * as FLATTED from "flatted";
import NextNProgress from "nextjs-progressbar";
import { logWebVitals } from "../api/Mixpanel.api";
import { AudioPlayerProvider } from "../providers/PlayerProvider/PlayerProviderV2";
import { useRouter } from "next/router";
import { AppPropsWithLayout } from "../domain/AppProps";
import PlayerWrapper from "../components/FooterPlayer/PlayerWrapper/PlayerWrapper";
import { Page, Navbar } from "../components/ui/Page";
import { motion, AnimatePresence } from "framer-motion";

const FB_PIXEL_ID = process.env.FB_PIXEL_ID;

mixpanel.init(process.env.MIXPANEL_API_KEY!, { debug: true });

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = React.useRef(new QueryClient());
  const router = useRouter();

  useEffect(() => {
    import("react-facebook-pixel")
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(FB_PIXEL_ID!);
        ReactPixel.pageView();

        router.events.on("routeChangeComplete", () => {
          ReactPixel.pageView();
        });
      });
  }, [router.events]);

  const getLayout = Component.getLayout;

  return (
    <QueryClientProvider client={queryClient.current}>
      <AudioPlayerProvider>
        <Page>
          <NextNProgress color="#ded15b" />
          <Hydrate
            state={
              // @ts-expect-error
              pageProps.dehydratedState &&
              // @ts-expect-error
              FLATTED.parse(pageProps.dehydratedState)
            }
          >
            <AnimatePresence exitBeforeEnter initial={false}>
              {getLayout ? (
                getLayout(<Component {...pageProps} key={router.route} />)
              ) : (
                <Component {...pageProps} key={router.route} />
              )}
            </AnimatePresence>
            <PlayerWrapper />
          </Hydrate>
        </Page>
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
  window.gtag &&
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
