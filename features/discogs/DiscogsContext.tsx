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
