import "../styles/globals.css";
import type { AppProps } from "next/app";

function VinylCompanionApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen justify-center align-center">
      <Component {...pageProps} />
    </div>
  );
}
export default VinylCompanionApp;
