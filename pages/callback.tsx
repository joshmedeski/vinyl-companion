import { useEffect } from "react";
import type { NextPage } from "next";
import { apiGetAccessToken } from "@vc/utils/api";
import { useRouter } from "next/dist/client/router";
import { useDiscogs } from "@vc/features/discogs/DiscogsContext";

const CallbackPage: NextPage = () => {
  const router = useRouter();
  const { setIdentity } = useDiscogs();

  const getIdentity = async (
    oauth_token: string,
    oauth_verifier: string
  ): Promise<void> => {
    const identity = await apiGetAccessToken(
      oauth_token as string,
      oauth_verifier as string
    );

    setIdentity(identity);
    router.push("/");
  };

  useEffect(() => {
    if (!router) return;
    const { oauth_token, oauth_verifier } = router.query;
    if (oauth_token && oauth_verifier) {
      getIdentity(oauth_token as string, oauth_verifier as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  return <div className="p-4">Connecting to Discogs</div>;
};

export default CallbackPage;
