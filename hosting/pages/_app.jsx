import Head from "next/Head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
    </>
  );
}
