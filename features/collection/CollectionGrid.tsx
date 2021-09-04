import React from "react";
import { useOfflineDb } from "../offline-db/OfflineDbContext";

const CollectionGrid: React.FC = () => {
  const { collection } = useOfflineDb();

  if (!collection) return <p>No collection found.</p>;

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-4">
        {collection.releases.map((release) => (
          <div key={release.id} className="p-4 text-center bg-gray-100">
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

export default CollectionGrid;
