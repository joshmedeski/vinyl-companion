import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { Client } from "disconnect";

const getCollection = (access: any) => {
  const client = new Client(access);

  return new Promise(async (resolve) => {
    try {
      const inventory = await client
        .user()
        .collection()
        .getReleases("joshmedeski", 0, {
          per_page: 100,
          sort: "artist",
          sort_order: "asc",
        });
      console.log(inventory);
      resolve(inventory);
    } catch (e) {
      console.log(e);
      resolve("error happy");
    }
  });
};

const CollectionPage: NextPage<{
  collection: CollectionTypes.ReleasesInstancesResponse;
}> = ({ collection }) => {
  return (
    <div className="">
      <h1>Collection</h1>
      <div className="grid grid-cols-4 gap-4">
        {collection.releases.map((release) => (
          <div key={release.id} className="p-4">
            <h2>{release.basic_information.title}</h2>
            <p>{release.basic_information.artists[0].name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const collection = await getCollection();
    console.log("collection: ", collection);
    return { props: { collection } };
  } catch (e) {
    console.error("e: ", e);
    return { props: {} };
  }
};

export default CollectionPage;
