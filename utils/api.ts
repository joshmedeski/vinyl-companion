import axios from "axios";
import { OAuthCallbackAuth } from "disconnect";

const api = axios.create({ baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api` });

export const apiGetImage = async (release: number): Promise<string> => {
  try {
    const { data } = await api.get<string>("/image", { params: { release } });
    console.log("data: ", data);
    return data;
  } catch (e: any) {
    console.log("e: ", e);
    throw e;
  }
};

export const apiOauthRequestToken = async (): Promise<OAuthCallbackAuth> => {
  const { data } = await api.get<OAuthCallbackAuth>("/discogs/request_token");
  return data;
};

export const apiGetAccessToken = async (
  oauth_token: string,
  oauth_verifier: string
): Promise<DiscogsTypes.Identity> => {
  const { data } = await api.get<DiscogsTypes.Identity>(
    "/discogs/access_token",
    {
      params: { oauth_token, oauth_verifier },
    }
  );
  return data;
};

export const apiGetIdentity = async (): Promise<DiscogsTypes.Identity> => {
  const { data } = await api.get<DiscogsTypes.Identity>("/discogs/identity");
  return data;
};
