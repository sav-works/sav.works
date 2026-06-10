import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://534731f14465651a8e8ac265cb36544d@o4511541335556096.ingest.de.sentry.io/4511541399846992",
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,
  enableLogs: true,
  integrations: [
    Sentry.replayIntegration(),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
