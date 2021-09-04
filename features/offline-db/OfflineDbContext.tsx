import React, { useContext, useEffect, useState } from "react";
import { set as setToDb, get as getFromDb } from "idb-keyval";

type Context = {
  collection: CollectionTypes.ReleasesInstancesResponse | undefined;
  setCollection: (identity: CollectionTypes.ReleasesInstancesResponse) => void;
};

const OfflineDbContext = React.createContext<Context>({
  collection: undefined,
  setCollection: (_: CollectionTypes.ReleasesInstancesResponse) =>
    console.warn("OfflineDBProvider not found"),
});

const useOfflineDb = () => useContext(OfflineDbContext);

const OfflineDbProvider: React.FC = ({ children }) => {
  const [
    collection,
    setCollection,
  ] = useState<CollectionTypes.ReleasesInstancesResponse>();

  const getCollectionFromDb = async (): Promise<void> => {
    const collection = await getFromDb<CollectionTypes.ReleasesInstancesResponse>(
      "collection"
    );
    console.log("collection: ", collection);
    if (collection) setCollection(collection);
  };

  useEffect(() => {
    getCollectionFromDb();
  }, []);

  useEffect(() => {
    setToDb("collection", collection);
  }, [collection]);

  // TODO store images for releases
  // TODO way to wipe offline storage

  return (
    <OfflineDbContext.Provider
      value={{
        collection,
        setCollection,
      }}
    >
      {children}
    </OfflineDbContext.Provider>
  );
};

export { OfflineDbProvider, useOfflineDb };
