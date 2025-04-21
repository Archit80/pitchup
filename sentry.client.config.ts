// This file configures the initialization of Sentry on the client.
// The config you add here will be used on the client side.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d03a523073f875a1267e69f6dd885636@o4509185529675776.ingest.de.sentry.io/4509185550975060",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,
  
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});