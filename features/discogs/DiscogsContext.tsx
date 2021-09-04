import { apiGetIdentity } from "@vc/utils/api";
import React, { useContext, useEffect, useState } from "react";

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
  const [identity, setIdentity] = useState<DiscogsTypes.Identity>();
  // TODO allow user to discconect manually

  const checkIdentity = async (): Promise<void> => {
    try {
      const identity = await apiGetIdentity();
      if (!identity) throw "Identity not found";
      setIdentity(identity);
    } catch (e: any) {
      return;
    }
  };

  useEffect(() => {
    checkIdentity();
  }, []);

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
