import { apiOauthAccessToken } from "@vc/utils/api";
import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const CallbackPage: NextPage = () => {
  const router = useRouter();

  const getAccessToken = async (token: string, verifier: string) => {
    await apiOauthAccessToken(token, verifier);
    router.push("/identity");
  };

  useEffect(() => {
    if (!router) return;
    const { oauth_token, oauth_verifier } = router.query;
    if (oauth_token && oauth_verifier) {
      getAccessToken(oauth_token as string, oauth_verifier as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div>Callback</div>;
};

export default CallbackPage;
