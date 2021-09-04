import { getAccessToken, withPageAuth } from "@vc/utils/auth";
import { OAuthCallbackAuth } from "disconnect";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";

const CallbackPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router) return;
    const { oauth_token, oauth_verifier } = router.query;
    if (oauth_token && oauth_verifier) {
      getAccessToken(oauth_token as string, oauth_verifier as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div className="p-4">Connecting to Discogs</div>;
};

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async ({ req, query }) => {
    const oauth_verifier = query?.["oauth_verifier"];
    const request = req.session.get<OAuthCallbackAuth>("request");
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
