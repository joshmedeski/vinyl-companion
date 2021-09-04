import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { OfflineDbProvider } from "@vc/features/offline-db/OfflineDbContext";
import { DiscogsProvider } from "@vc/features/discogs/DiscogsContext";
import Manifest from "@vc/ui/manifest";
import Settings from "@vc/ui/settings";

function VinylCompanionApp({ Component, pageProps }: AppProps) {
  return (
    <OfflineDbProvider>
      <DiscogsProvider>
        <Manifest />
        <div className="dark dark:bg-black">
          <header className="p-4">
            <div className="flex align-center justify-between gap-4">
              <h1 className="dark:text-white font-extrabold uppercase tracking-wider">
                Vinyl Companion
              </h1>

              <div className="flex gap-6">
                <Settings />
              </div>
            </div>
          </header>

          <main className="min-h-screen pb-20">
            <Component {...pageProps} />
          </main>
        </div>
      </DiscogsProvider>
    </OfflineDbProvider>
  );
}
export default VinylCompanionApp;
