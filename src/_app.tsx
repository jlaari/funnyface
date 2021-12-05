import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Vittuilukamera</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default App;
