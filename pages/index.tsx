import type { NextPage, GetServerSideProps } from "next";
import { getRequestToken, withPageAuth } from "@vc/utils/auth";

const Home: NextPage = () => {
  return <div>Home</div>;
};

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async ({ req }) => {
    const auth = req.session.get("access");

    if (auth === undefined) {
      const request = await getRequestToken();
      req.session.set("request", request);
      await req.session.save();

      return {
        redirect: {
          destination: request.authorizeUrl,
          permanent: false,
        },
      };
    }

    return { props: {} };
  }
);

export default Home;
