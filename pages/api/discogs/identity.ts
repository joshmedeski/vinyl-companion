import type { NextApiResponse } from "next";
import { Client, OAuthCallbackAuth } from "disconnect";
import { NextApiRequestWithAuth, withApiAuth } from "@vc/utils/auth";

const getIdentity = (access: any): Promise<DiscogsTypes.Identity> => {
  const client = new Client(access);

  return new Promise((resolve, reject) => {
    client
      .getIdentity()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const get_identity_api_endpoint = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse<DiscogsTypes.Identity | string>
) => {
  try {
    const access = req.session.get<OAuthCallbackAuth>("access");
    if (!access) throw "No 'access' auth found in session";
    const identity = await getIdentity(access);
    res.status(200).json(identity);
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to get access token");
  }
};

export default withApiAuth(get_identity_api_endpoint);
