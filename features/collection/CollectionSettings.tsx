import React from "react";
import { useOfflineDb } from "../offline-db/OfflineDbContext";

const CollectionSettings: React.FC = () => {
  const { collection } = useOfflineDb();

  // TODO add ability to "sync" data again
  // TODO add ability to wipe out offline db storage

  return (
    <div>
      There are {collection?.releases?.length || 0} vinyls stored in your
      offline database.
    </div>
  );
};

export default CollectionSettings;
