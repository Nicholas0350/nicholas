import {
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import superjson from "superjson";

export function makeQueryClient() {
  const isUiOnlyMode = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          (!isUiOnlyMode && query.state.status === "pending"),
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}
