import axios from "axios";
import { OAuth, OAuthCallbackAuth } from "disconnect";

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

export const apiOauthAccessToken = async (
  oauth_token: string,
  oauth_verifier: string
): Promise<OAuth> => {
  // TODO properly check
  const request_auth = JSON.parse(
    localStorage.getItem("request_auth") as string
  );

  const { data } = await api.get<OAuth>("/oauth/access_token", {
    params: { request_auth, oauth_token, oauth_verifier },
  });

  localStorage.removeItem("request_auth");
  localStorage.setItem("access_auth", JSON.stringify(data));
  return data;
};
