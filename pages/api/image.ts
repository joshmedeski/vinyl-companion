import { NextApiRequestWithAuth, withApiAuth } from "@vc/utils/auth";
import { Client, OAuthCallbackAuth } from "disconnect";
import type { NextApiRequest, NextApiResponse } from "next";

const getImage = async (
  access: OAuthCallbackAuth,
  release: number
): Promise<string> => {
  const db = new Client(access).database();

  return new Promise<string>((resolve, reject) => {
    db.getRelease(release, function (err, data) {
      if (err) return reject(err);
      const url = data?.images?.[0].resource_url as string;
      resolve(url);
    });
  });
};

const api_image_endpoint = async (
  req: NextApiRequestWithAuth,
  res: NextApiResponse<string>
) => {
  const access = req.session.get<OAuthCallbackAuth>("access");
  const release = req.query?.["release"];
  const image = await getImage(
    access as OAuthCallbackAuth,
    Number(release as string)
  );
  res.status(200).send(image);
};

export default withApiAuth(api_image_endpoint);
