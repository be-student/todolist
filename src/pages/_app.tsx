import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../app/store";
import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
export default function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <style global jsx>{`
          html,
          body,
          body > div:first-child,
          div#__next,
          div#__next > div {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;
            overflow: scroll;
            justify-content: space-between;
          }
        `}</style>

        <Head>
          <title>Redux Toolkit</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="content">
          <Header />
          <Component {...pageProps} />
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}
