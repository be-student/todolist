import "../styles/globals.css";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import store from "../features/redux/store";
import Header from "../features/header/Header";
import Footer from "../features/footer/Footer";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";
import Head from "next/head";
import { useEffect } from "react";
export default function MyApp({ Component, pageProps }: AppProps) {
  let persistor = persistStore(store);
  useEffect(() => {
    window.addEventListener("beforeunload", function (e) {
      var confirmationMessage = "o/";

      (e || window.event).returnValue = confirmationMessage; //Gecko + IE
      return confirmationMessage; //Webkit, Safari, Chrome
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
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
