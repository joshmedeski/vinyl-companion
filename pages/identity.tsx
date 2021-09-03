import type { GetServerSideProps, NextPage } from "next";
import { Client } from "disconnect";
import { withPageAuth } from "@vc/utils/auth";

const getIdentity = (access: any) => {
  const client = new Client(access);

  return new Promise((resolve, reject) => {
    client
      .getIdentity()
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

const CallbackPage: NextPage<{ identity: any }> = ({ identity }) => {
  return (
    <div className="">
      <h1>Identity</h1>
      {JSON.stringify(identity)}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async ({ req }) => {
    const access = req.session.get("access");
    const identity = await getIdentity(access);
    return { props: { identity } };
  }
);

export default CallbackPage;
