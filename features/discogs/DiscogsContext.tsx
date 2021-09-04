import React, { useContext, useEffect, useState } from "react";

type Context = {};

const DiscogsContext = React.createContext<Context>({});

const useDiscogs = () => useContext(DiscogsContext);

const DiscogsProvider: React.FC = ({ children }) => {
  // TODO store identity object

  return (
    <DiscogsContext.Provider value={{}}>{children}</DiscogsContext.Provider>
  );
};

export { DiscogsProvider, useDiscogs };
