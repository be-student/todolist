import "../styles/globals.css";

import { Provider } from "react-redux";
import type { AppProps } from "next/app";

import store from "../app/store";
import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
      `}</style>
      <div className="content">
        <Header />
        <Component {...pageProps} />
        {/* <Footer /> */}
      </div>
    </Provider>
  );
}
