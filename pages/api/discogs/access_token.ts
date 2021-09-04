import type { NextApiResponse } from "next";
import { Client, OAuthCallbackAuth } from "disconnect";
import { NextApiRequestWithAuth, withApiAuth } from "@vc/utils/auth";

export const getAccessToken = (
  requestAuth: OAuthCallbackAuth,
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

const getIdentity = (access: any): Promise<DiscogsTypes.Identity> => {
  const client = new Client(access);

  return new Promise((resolve, reject) => {
    client
      .getIdentity()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const access_token_api_endpoint = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse<DiscogsTypes.Identity | string>
) => {
  try {
    const { oauth_verifier } = req.query;
    if (!oauth_verifier) throw "Oauth Verifier param missing";

    const request = req.session.get<OAuthCallbackAuth>("request");
    if (!request) throw "No 'request' auth found in session";

    const access = await getAccessToken(request, oauth_verifier as string);
    req.session.set("access", access);

    const identity = await getIdentity(access);
    req.session.set("identity", identity);
    await req.session.save();

    res.status(200).json(identity);
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to get access token");
  }
};

export default withApiAuth(access_token_api_endpoint);
