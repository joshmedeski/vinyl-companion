import Image from "next/image";
import React, { useState } from "react";
import { useOfflineDb } from "../offline-db/OfflineDbContext";
import CollectionSortPosition from "./CollectionSortPosition";

const CollectionGrid: React.FC = () => {
  const { collection, setSelectedReleaseIndex } = useOfflineDb();
  const [cols, setCols] = useState<string>("grid-cols-6");

  const getCols = (cols: number): string => {
    switch (cols) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      case 7:
        return "grid-cols-7";
      case 8:
        return "grid-cols-8";
      case 9:
        return "grid-cols-9";
      case 10:
        return "grid-cols-10";
      case 10:
        return "grid-cols-10";
      case 11:
        return "grid-cols-11";
      case 12:
        return "grid-cols-12";
      default:
        return "grid-cols-6";
    }
  };

  if (!collection) return <p>No collection found.</p>;

  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <input
        type="range"
        min="1"
        max="12"
        onChange={(event) => {
          setCols(getCols(Number(event.target.value)));
        }}
      />
      <CollectionSortPosition />
      <div className={`grid gap-4 place-items-center ${cols}`}>
        {collection.releases.map((release, index) => (
          <div key={release.id}>
            <button
              type="button"
              onClick={() => setSelectedReleaseIndex(index)}
            >
              <Image
                src={release.basic_information.cover_image}
                alt="album artwork"
                className="rounded-lg"
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
