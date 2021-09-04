import type { NextApiResponse } from "next";
import { Client, OAuthCallbackAuth } from "disconnect";
import { NextApiRequestWithAuth, withApiAuth } from "@vc/utils/auth";

const getCollection = (
  access: OAuthCallbackAuth,
  username: string
): Promise<CollectionTypes.ReleasesInstancesResponse> => {
  const client = new Client(access);

  return new Promise(async (resolve, reject) => {
    try {
      const inventory = await client
        .user()
        .collection()
        .getReleases(username, 0, {
          per_page: 100,
          sort: "artist",
          sort_order: "desc",
        });

      resolve(inventory);
    } catch (e) {
      console.error(e);
      reject("Could not get collection");
    }
  });
};

const get_collection_api_endpoint = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse<CollectionTypes.ReleasesInstancesResponse | string>
) => {
  try {
    const access = req.session.get<OAuthCallbackAuth>("access");
    console.log("access: ", access);
    if (!access) throw "No 'access' auth found in session";
    const identity = req.session.get<DiscogsTypes.Identity>("identity");
    console.log("identity: ", identity);
    if (!identity) throw "No 'identity' found in session";

    const collection = await getCollection(access, identity.username);
    console.log("collection: ", collection);
    res.status(200).json(collection);
  } catch (e) {
    console.error(e);
    res.status(500).send("Failed to get access token");
  }
};

export default withApiAuth(get_collection_api_endpoint);
