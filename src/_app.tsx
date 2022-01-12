import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import WindowContextProvider from "./common/WindowContextProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Vittuilukamera</title>
      </Head>
      <WindowContextProvider>
        <Component {...pageProps} />
      </WindowContextProvider>
    </>
  );
}
export default App;
