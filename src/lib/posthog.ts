import { PostHog } from "posthog-node";

export default function PostHogClient() {
  const posthogClient = new PostHog(
    "phc_mVW0mXBpnNPvZ4vzsfWIbsxnMMjLG7rPpwvy5niWdHV",
    {
      host: "https://eu.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    }
  );
  return posthogClient;
}
