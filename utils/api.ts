import axios from "axios";
import { OAuth, OAuthCallbackAuth } from "disconnect";

const baseURL = process.env.NEXT_PUBLIC_APP_URL + "/api";

const api = axios.create({ baseURL });

/**
 * @returns the Discogs Oauth authorize URl
 */
export const apiOauthRequestToken = async (): Promise<string> => {
  const { data } = await api.get<string>("/oauth/request_token");
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
