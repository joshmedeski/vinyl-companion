import type { NextApiRequest, NextApiResponse } from "next";
import { Client, OAuthCallbackAuth } from "disconnect";

export const getRequestToken = (): Promise<OAuthCallbackAuth> => {
  const {
    DISCOGS_CONSUMER_KEY: consumerKey,
    DISCOGS_CONSUMER_SECRET: consumerSecret,
    NEXT_PUBLIC_APP_URL: appUrl,
  } = process.env;

  const callbackUrl = `${appUrl}/callback`;
  const oauth = new Client().oauth();

  return new Promise((resolve, reject) => {
    oauth.getRequestToken(
      consumerKey,
      consumerSecret,
      callbackUrl,
      (err, auth) => {
        err ? reject(err) : resolve(auth);
      }
    );
  });
};

const request_token_api_endpoint = async (
  _: NextApiRequest,
  res: NextApiResponse<OAuthCallbackAuth | string>
) => {
  try {
    const auth = await getRequestToken();
    res.status(200).json(auth);
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to get request token");
  }
};

export default request_token_api_endpoint;
