import Document, { Html, Head, Main, NextScript } from "next/document";
import { font } from "./styles/theme";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href={
              "https://fonts.googleapis.com/css2?family=Kavoon&family=Roboto&display=swap"
            }
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
            as="style"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <style jsx global>{`
            html {
              font-family: ${font.roboto};
            }
          `}</style>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
