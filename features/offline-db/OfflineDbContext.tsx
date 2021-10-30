import React, { useContext, useEffect, useState } from "react";
import { set as setToDb, get as getFromDb } from "idb-keyval";
import { saveImgUrlToBlog } from "@vc/utils/image";

type Context = {
  collection: CollectionTypes.ReleasesInstancesResponse | undefined;
  setCollection: (identity: CollectionTypes.ReleasesInstancesResponse) => void;
  selectedReleaseIndex: number | undefined;
  setSelectedReleaseIndex: (index: number | undefined) => void;
};

const OfflineDbContext = React.createContext<Context>({
  collection: undefined,
  setCollection: (_: CollectionTypes.ReleasesInstancesResponse) =>
    console.warn("OfflineDBProvider not found"),
  selectedReleaseIndex: undefined,
  setSelectedReleaseIndex: (_: number | undefined) =>
    console.warn("OfflineDBProvider not found"),
});

const useOfflineDb = () => useContext(OfflineDbContext);

const OfflineDbProvider: React.FC = ({ children }) => {
  const [
    collection,
    setCollection,
  ] = useState<CollectionTypes.ReleasesInstancesResponse>();

  const [selectedReleaseIndex, setSelectedReleaseIndex] = useState<number>();

  const getAndSetCollectionFromDb = async (): Promise<void> => {
    const collection = await getFromDb<CollectionTypes.ReleasesInstancesResponse>(
      "collection"
    );

    if (collection) setCollection(collection);
  };

  useEffect(() => {
    getAndSetCollectionFromDb();
  }, []);

  useEffect(() => {
    if (collection) setToDb("collection", collection);
  }, [collection]);

  // TODO way to wipe offline storage

  return (
    <OfflineDbContext.Provider
      value={{
        collection,
        setCollection,
        selectedReleaseIndex,
        setSelectedReleaseIndex,
      }}
    >
      {children}
    </OfflineDbContext.Provider>
  );
};

export { OfflineDbProvider, useOfflineDb };
