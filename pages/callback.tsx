import { apiOauthAccessToken } from "@vc/utils/api";
import { getAccessToken, withPageAuth } from "@vc/utils/auth";
import { OAuthCallbackAuth } from "disconnect";
import type { GetServerSideProps, NextPage } from "next";
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

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async ({ req, query }) => {
    const oauth_verifier = query?.["oauth_verifier"];
    console.log("oauth verifiery: ", oauth_verifier);
    const request = req.session.get<OAuthCallbackAuth>("request");
    console.log("request: ", request);
    const access = await getAccessToken(
      request as OAuthCallbackAuth,
      oauth_verifier as string
    );
    req.session.set("access", access);
    await req.session.save();

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
);

export default CallbackPage;
