import React from "react";
import Head from "next/head";

const Manifest: React.FC = () => {
  return (
    <Head>
      <title>Vinyl Companion</title>
      {/** {/**-- Must */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="description" content="Description" />
      <meta name="keywords" content="Keywords" />
      <title>Vinyl Companion</title>
      {/**-- Android  -->*/}
      <meta name="theme-color" content="#10b981" />
      <meta name="mobile-web-app-capable" content="yes" />
      {/**-- iOS -->*/}
      <meta name="apple-mobile-web-app-title" content="Vinyl Companion" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      {/**-- Windows  -->*/}
      <meta name="msapplication-navbutton-color" content="red" />
      <meta name="msapplication-TileColor" content="red" />
      <meta name="msapplication-TileImage" content="ms-icon-144x144.png" />
      <meta name="msapplication-config" content="browserconfig.xml" />
      {/**-- Pinned Sites  -->*/}
      <meta name="application-name" content="Vinyl Companion" />
      <meta name="msapplication-tootip" content="Vinyl Companion" />
      <meta name="msapplication-starturl" content="/" />
      {/**-- Tap highlighting  -->*/}
      <meta name="msapplication-tap-highlight" content="no" />
      {/**-- UC Mobile Browser  -->*/}
      <meta name="full-screen" content="yes" />
      <meta name="browsermode" content="application" />
      {/**-- Disable night mode for this page  -->*/}
      <meta name="nightmode" content="enable/disable" />
      {/**-- Fitscreen  -->*/}
      <meta name="viewport" content="uc-fitscreen=yes" />
      {/**-- Layout mode -->*/}
      <meta name="layoutmode" content="fitscreen/standard" />
      {/**-- imagemode - show image even in text only mode  -->*/}
      <meta name="imagemode" content="force" />
      {/**-- Orientation  -->*/}
      <meta name="screen-orientation" content="portrait" />l
      {/**<!-- Main Link Tags  -->*/}
      <link
        href="/icons/vinyl-companion-16x16.png"
        rel="icon"
        type="image/png"
        sizes="16x16"
      />
      <link
        href="/icons/vinyl-companion-32x32.png"
        rel="icon"
        type="image/png"
        sizes="32x32"
      />
      <link
        href="/icons/vinyl-companion-48x48.png"
        rel="icon"
        type="image/png"
        sizes="48x48"
      />
      {/**<!-- iOS  -->*/}
      <link href="touch-icon-iphone.png" rel="apple-touch-icon" />
      <link
        href="/icons/vinyl-companion-76x76.png"
        rel="apple-touch-icon"
        sizes="76x76"
      />
      <link
        href="/icons/vinyl-companion-128x128.png"
        rel="apple-touch-icon"
        sizes="120x120"
      />
      <link
        href="/icons/vinyl-companion-192x192.png"
        rel="apple-touch-icon"
        sizes="152x152"
      />
      {/**<!-- Startup Image  -->*/}
      <link
        href="/icons/touch-icon-start-up-320x480.png"
        rel="apple-touch-startup-image"
      />
      {/**<!-- Android  -->*/}
      <link
        href="/icons/vinyl-companion-192x192.png"
        rel="icon"
        sizes="192x192"
      />
      <link
        href="/icons/vinyl-companion-192x192.png"
        rel="icon"
        sizes="128x128"
      />
      {/**<!-- Others -->*/}
      <link href="favicon.icon" rel="shortcut icon" type="image/x-icon" />
      {/**<!-- UC Browser  -->*/}
      <link
        href="images/icon-52x52.png"
        rel="apple-touch-icon-precomposed"
        sizes="57x57"
      />
      <link href="images/icon-72x72.png" rel="apple-touch-icon" sizes="72x72" />
      {/**<!-- Manifest.json  -->*/}
      <link href="/manifest.json" rel="manifest" />
    </Head>
  );
};

export default Manifest;
