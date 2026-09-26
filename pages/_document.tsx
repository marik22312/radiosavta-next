import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="commit-sha" content={process.env.COMMIT_SHA} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
