import type { NextPage } from "next";
import Head from "next/head";
import Feed from "../components/Feed";
import PostBox from "../components/PostBox";
import TopCommunities from "../components/TopCommunities";

const Home: NextPage = () => {
  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Post Box */}
      <PostBox />
      <div className="flex">
        <Feed />
        <TopCommunities />
      </div>
    </div>
  );
};

export default Home;
