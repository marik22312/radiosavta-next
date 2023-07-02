import React from "react";
import { NextSeo } from "next-seo";
import {SITE_OPEN_GRAPH_IMAGE} from '../../config/images';

interface SeoProps {
	  title?: string;
	  description?: string;
	  imageUrl?: string;
	  imageAlt?: string;
}
export const Seo: React.FC<SeoProps> = (props) => {
  return (
    <>
      <NextSeo
        title={props.title ?? "רדיוסבתא - שומעים אותך"}
        description={props.description ?? "רדיוסבתא - תחנת רדיו אינטרנטית, שומעים אותך!"}
        openGraph={{
          title: props.title ?? "רדיוסבתא - שומעים אותך",
          description: props.description ?? "רדיוסבתא - תחנת רדיו אינטרנטית, שומעים אותך!",
          images: [
            {
              url: props.imageUrl ?? SITE_OPEN_GRAPH_IMAGE,
              width: 800,
              height: 600,
              alt: props.imageAlt ?? "רדיוסבתא - שומעים אותך",
            },
          ],
          site_name: "רדיוסבתא",
        }}
      />
    </>
  );
};
