import type { NextApiRequest, NextApiResponse } from "next";
import { Client, OAuth, OAuthCallbackAuth } from "disconnect";

export const getAccessToken = (
  requestAuth: any,
  verifier: string
): Promise<OAuthCallbackAuth> => {
  const oauth = new Client(requestAuth).oauth();

  return new Promise((resolve, reject) => {
    oauth.getAccessToken(verifier, (err, auth) => {
      console.log("err: ", err);
      err ? reject(err) : resolve(auth);
    });
  });
};

const request_token_api_endpoint = async (
  req: NextApiRequest,
  res: NextApiResponse<OAuthCallbackAuth | string>
) => {
  try {
    const { request_auth, oauth_verifier } = req.query;
    const auth = await getAccessToken(
      JSON.parse(request_auth as string) as OAuth,
      oauth_verifier as string
    );
    res.status(200).json(auth);
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to get access token");
  }
};

export default request_token_api_endpoint;
