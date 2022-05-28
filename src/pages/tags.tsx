import type { NextPage } from "next";
import Head from "next/head";

import Counter from "../features/counter/Counter";
import Footer from "../features/footer/Footer";
// import styles from "../styles/Home.module.css";

const IndexPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Redux Toolkit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Footer />
    </div>
  );
};

export default IndexPage;
