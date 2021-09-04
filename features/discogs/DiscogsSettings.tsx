import { apiOauthRequestToken } from "@vc/utils/api";
import { useRouter } from "next/dist/client/router";
import React from "react";

const DiscogsSettings: React.FC = () => {
  const router = useRouter();

  const connectToDiscogs = async () => {
    const { authorizeUrl } = await apiOauthRequestToken();
    router.push(authorizeUrl);
  };

  return (
    <button
      type="button"
      onClick={() => connectToDiscogs()}
      className="bg-discogs text-white px-3 py-2 rounded-lg"
    >
      Connect to Discogs
    </button>
  );
};

export default DiscogsSettings;
