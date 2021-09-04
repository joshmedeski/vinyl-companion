import { apiOauthRequestToken } from "@vc/utils/api";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useDiscogs } from "./DiscogsContext";

const DiscogsSettings: React.FC = () => {
  const router = useRouter();
  const { identity } = useDiscogs();

  const connectToDiscogs = async () => {
    const { authorizeUrl } = await apiOauthRequestToken();
    router.push(authorizeUrl);
  };

  if (identity)
    return (
      <p>
        You are connect as <code>{identity.username}</code>
      </p>
    );

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
