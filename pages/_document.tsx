import Navbar from "components/Navbar";
import { Head, Html, Main, NextScript } from "next/document";

export default function RootLayout() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Car Maintenance Tracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
				<NextScript />
      </body>
    </Html>
  );
}
