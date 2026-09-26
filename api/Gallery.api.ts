// Gallery photos (MAR-50): every image tagged radiosavta:gallery in
// Cloudinary, listed through the Admin API. Server-side only — call it from
// getStaticProps, never from client code: it needs the API secret, and the
// Admin API is rate-limited, so it's fetched at build / ISR revalidation
// rather than per request.

const CLOUD_NAME = "marik-shnitman";
const TAG = "radiosavta:gallery";

// The largest collage slot is ~360px wide; 800 covers 2x screens.
const DELIVERY_TRANSFORMATION = "c_limit,w_800,f_auto,q_auto";

interface CloudinaryResource {
  secure_url: string;
}

interface ResourcesByTagResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

const fetchPage = async (auth: string, cursor?: string) => {
  const url = new URL(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image/tags/${encodeURIComponent(
      TAG
    )}`
  );
  url.searchParams.set("max_results", "500");
  if (cursor) url.searchParams.set("next_cursor", cursor);

  const response = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    throw new Error(`Cloudinary responded ${response.status}`);
  }
  return (await response.json()) as ResourcesByTagResponse;
};

const toDeliveryUrl = ({ secure_url }: CloudinaryResource) =>
  secure_url.replace(
    "/image/upload/",
    `/image/upload/${DELIVERY_TRANSFORMATION}/`
  );

// Fisher–Yates. Shuffled per build / revalidation, so the collage opens on
// a different set of photos each time without any client-side randomness.
const shuffle = <T>(items: T[]) => {
  const result = items.slice();
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

// Delivery URLs of the gallery photos, shuffled. On any failure, logs and
// returns [] so the gallery falls back to its placeholder slots.
export const getGalleryPhotos = async (): Promise<string[]> => {
  const { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;
  if (!CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    console.error("Gallery: CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET unset");
    return [];
  }
  const auth = Buffer.from(
    `${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`
  ).toString("base64");

  try {
    const resources: CloudinaryResource[] = [];
    let cursor: string | undefined;
    do {
      const page = await fetchPage(auth, cursor);
      resources.push(...page.resources);
      cursor = page.next_cursor;
    } while (cursor);
    return shuffle(resources.map(toDeliveryUrl));
  } catch (error) {
    console.error("Gallery: couldn't list photos from Cloudinary", error);
    return [];
  }
};
