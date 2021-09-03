import { apiOauthRequestToken } from "@vc/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();

  const getRequestToken = async () => {
    const res = await apiOauthRequestToken();
    router.push(res.authorizeUrl);
  };

  useEffect(() => {
    getRequestToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>Home</div>;
};

export default Home;
