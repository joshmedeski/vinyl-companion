import { apiGetCollection, apiGetIdentity } from "@vc/utils/api";
import React, { useContext, useEffect, useState } from "react";
import { useOfflineDb } from "../offline-db/OfflineDbContext";

type Context = {
  identity: DiscogsTypes.Identity | undefined;
  setIdentity: (identity: DiscogsTypes.Identity) => void;
};

const DiscogsContext = React.createContext<Context>({
  identity: undefined,
  setIdentity: (_: DiscogsTypes.Identity) =>
    console.warn("DiscogsProvider not found"),
});

const useDiscogs = () => useContext(DiscogsContext);

const DiscogsProvider: React.FC = ({ children }) => {
  const { setCollection } = useOfflineDb();
  const [identity, setIdentity] = useState<DiscogsTypes.Identity>();

  // TODO allow user to disconnect manually

  const checkIdentity = async (): Promise<void> => {
    try {
      const identity = await apiGetIdentity();
      if (!identity) throw "Identity not found";
      setIdentity(identity);
    } catch (e: any) {
      return;
    }
  };

  const getCollection = async (): Promise<void> => {
    try {
      const collection = await apiGetCollection();
      setCollection(collection);
    } catch (e: any) {
      console.error(e);
      return;
    }
  };

  useEffect(() => {
    checkIdentity();
  }, []);

  useEffect(() => {
    if (identity) getCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [identity]);

  return (
    <DiscogsContext.Provider
      value={{
        identity,
        setIdentity,
      }}
    >
      {children}
    </DiscogsContext.Provider>
  );
};

export { DiscogsProvider, useDiscogs };
