import Image from "next/image";
import React, { useState } from "react";
import { useOfflineDb } from "../offline-db/OfflineDbContext";
import CollectionSortPosition from "./CollectionSortPosition";

const CollectionGrid: React.FC = () => {
  const { collection, setSelectedReleaseIndex } = useOfflineDb();

  if (!collection) return <p>No collection found.</p>;

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <CollectionSortPosition />
      <div className="grid grid-cols-8 gap-4 place-items-center">
        {collection.releases.map((release, index) => (
          <div key={release.id} className="text-center bg-gray-100 rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedReleaseIndex(index)}
            >
              <Image
                src={release.basic_information.cover_image}
                alt="album artwork"
                width="500"
                height="500"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionGrid;
