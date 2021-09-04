import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";

import { OfflineDbProvider } from "@vc/features/offline-db/OfflineDbContext";
import { DiscogsProvider } from "@vc/features/discogs/DiscogsContext";
import Footer from "@vc/ui/footer";
import Manifest from "@vc/ui/manifest";

function VinylCompanionApp({ Component, pageProps }: AppProps) {
  return (
    <OfflineDbProvider>
      <DiscogsProvider>
        <Manifest />
        <main className="min-h-screen pb-20">
          <Component {...pageProps} />
        </main>
        <Footer />
      </DiscogsProvider>
    </OfflineDbProvider>
  );
}
export default VinylCompanionApp;
