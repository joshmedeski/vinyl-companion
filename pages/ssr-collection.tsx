import type { NextPage, GetServerSideProps } from "next";
import { getRequestToken, withPageAuth } from "@vc/utils/auth";
import { Client, OAuthCallbackAuth } from "disconnect";
import { useEffect, useState } from "react";
import { apiGetImage } from "@vc/utils/api";
import Image from "next/image";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getCollection = (
  access: OAuthCallbackAuth
): Promise<CollectionTypes.ReleasesInstancesResponse> => {
  const client = new Client(access);

  return new Promise(async (resolve, reject) => {
    try {
      const inventory = await client
        .user()
        .collection()
        .getReleases("joshmedeski", 0, {
          per_page: 100,
          sort: "artist",
          sort_order: "desc",
        });

      resolve(inventory);
    } catch (e) {
      console.error(e);
      reject("error happy");
    }
  });
};

type ReleaseImg = {
  id: number;
  imgSrc: string;
};

const Home: NextPage<{
  collection: CollectionTypes.ReleasesInstancesResponse;
}> = ({ collection }) => {
  const [images, setImages] = useState<ReleaseImg[]>([]);

  useEffect(() => {
    collection.releases.forEach(async ({ id }, index) => {
      if (index > 20) return;
      const imgSrc = await apiGetImage(id);
      setImages((prev) => [...prev, { id, imgSrc }]);
      await sleep(10000);
      console.log("go to next for each");
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findImgSrc = (id: number): string => {
    const found = images.find((image) => image.id === id);
    return found?.imgSrc || "";
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-4">
        {collection.releases.map((release) => (
          <div key={release.id} className="p-4 text-center bg-gray-100">
            {findImgSrc(release.id) && (
              <Image
                src={findImgSrc(release.id)}
                alt={`${release.basic_information.title} album artwork`}
                layout="responsive"
                width={500}
                height={500}
              />
            )}

            <h2 className="font-bold text-2xl">
              {release.basic_information.title}
            </h2>
            <p>{release.basic_information.artists[0].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = withPageAuth(
  async ({ req }) => {
    const access = req.session.get<OAuthCallbackAuth>("access");

    if (access === undefined) {
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

    const collection = await getCollection(access);

    return { props: { collection } };
  }
);

export default Home;
