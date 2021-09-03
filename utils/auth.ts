import * as http from "http";
import { Client, OAuthCallbackAuth } from "disconnect";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { Session, withIronSession } from "next-iron-session";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

const { SECRET_COOKIE_PASSWORD: password, NODE_ENV: env } = process.env;

export type NextIronHandler = (
  req: NextApiRequestWithAuth,
  res: NextApiResponse
) => void | Promise<void>;

export type NextApiRequestWithAuth = NextApiRequest & { session: Session };

export interface GetServerSidePropsContextWithAuth
  extends GetServerSidePropsContext {
  req: http.IncomingMessage & {
    cookies: NextApiRequestCookies;
    session: Session;
  };
}

export type GetServerSidePropsContextWithAuthHandler = (
  context: GetServerSidePropsContextWithAuth
) => Promise<GetServerSidePropsResult<any>>;

export const withPageAuth = (
  handler: GetServerSidePropsContextWithAuthHandler
) =>
  withIronSession(handler, {
    password,
    cookieName: "vinyl-companion",
    cookieOptions: { secure: env === "production" },
  });

export const withApiAuth = (handler: any) =>
  withIronSession(handler, {
    password,
    cookieName: "vinyl-companion",
    cookieOptions: { secure: env === "production" },
  });

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
