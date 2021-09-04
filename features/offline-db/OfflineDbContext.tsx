import React, { useContext, useEffect, useState } from "react";

type Context = {};

const OfflineDbContext = React.createContext<Context>({});

const useOfflineDb = () => useContext(OfflineDbContext);

const OfflineDbProvider: React.FC = ({ children }) => {
  // TODO store collection of all vinyl releases
  // TODO store images for releases
  // TODO way to wipe offline storage

  return (
    <OfflineDbContext.Provider value={{}}>{children}</OfflineDbContext.Provider>
  );
};

export { OfflineDbProvider, useOfflineDb };
