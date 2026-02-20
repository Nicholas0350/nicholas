import "server-only";

import type { AppRouter } from "@midday/api/trpc/routers/_app";
import { getCountryCode, getLocale, getTimezone } from "@midday/location";
import { createClient } from "@midday/supabase/server";
import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink, loggerLink } from "@trpc/client";
import {
  type TRPCQueryOptions,
  createTRPCOptionsProxy,
} from "@trpc/tanstack-react-query";
import { cache } from "react";
import superjson from "superjson";
import { makeQueryClient } from "./query-client";

const isUiOnlyMode = process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true";

function getProcedurePath(queryKey: unknown): string {
  if (!Array.isArray(queryKey) || queryKey.length === 0) {
    return "";
  }

  const first = queryKey[0];

  if (Array.isArray(first)) {
    return first.join(".");
  }

  return typeof first === "string" ? first : "";
}

function getUiOnlyFallback(queryKey: unknown): unknown {
  const path = getProcedurePath(queryKey);

  switch (path) {
    case "user.me":
      return {
        id: "00000000-0000-0000-0000-000000000001",
        fullName: "Local Dev User",
        teamId: "00000000-0000-0000-0000-000000000001",
        email: "local-dev@midday.ai",
      };
    case "team.current":
      return {
        id: "00000000-0000-0000-0000-000000000001",
        name: "Local Dev Team",
      };
    case "team.list":
    case "team.invitesByEmail":
    case "team.teamInvites":
    case "user.invites":
    case "bankAccounts.get":
    case "bankAccounts.balances":
    case "bankConnections.get":
    case "inbox.get":
    case "inboxAccounts.get":
    case "invoice.get":
    case "invoice.paymentStatus":
    case "invoiceProducts.get":
    case "oauthApplications.authorized":
    case "oauthApplications.list":
    case "search.global":
    case "transactionCategories.get":
    case "transactions.get":
      return [];
    default:
      if (path.startsWith("reports.")) {
        return [];
      }
      return null;
  }
}

function createSafeQueryClient() {
  const queryClient = makeQueryClient();

  if (!isUiOnlyMode) {
    return queryClient;
  }

  const patchedQueryClient = queryClient as typeof queryClient & {
    __uiOnlyPatched?: boolean;
  };

  if (patchedQueryClient.__uiOnlyPatched) {
    return patchedQueryClient;
  }

  const originalFetchQuery = queryClient.fetchQuery.bind(queryClient);
  const originalFetchInfiniteQuery =
    queryClient.fetchInfiniteQuery.bind(queryClient);

  patchedQueryClient.fetchQuery = (async (options: any) => {
    try {
      return await originalFetchQuery(options);
    } catch {
      return getUiOnlyFallback(options?.queryKey);
    }
  }) as typeof queryClient.fetchQuery;

  patchedQueryClient.fetchInfiniteQuery = (async (options: any) => {
    try {
      return await originalFetchInfiniteQuery(options);
    } catch {
      return {
        pages: [],
        pageParams: [],
      };
    }
  }) as typeof queryClient.fetchInfiniteQuery;

  patchedQueryClient.__uiOnlyPatched = true;

  return patchedQueryClient;
}

// IMPORTANT: Create a stable getter for the query client that
//            will return the same client during the same request.
export const getQueryClient = cache(createSafeQueryClient);

const apiUrl =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:3003";

export const trpc = createTRPCOptionsProxy<AppRouter>({
  queryClient: getQueryClient,
  client: createTRPCClient({
    links: [
      httpBatchLink({
        url: `${apiUrl}/trpc`,
        transformer: superjson,
        async headers() {
          // DEV BYPASS: Use dev token for local development
          if (process.env.NEXT_PUBLIC_DEV_AUTH_BYPASS === "true") {
            return {
              Authorization: "Bearer dev-local-token",
              "x-user-timezone": await getTimezone(),
              "x-user-locale": await getLocale(),
              "x-user-country": await getCountryCode(),
            };
          }

          const supabase = await createClient();

          const {
            data: { session },
          } = await supabase.auth.getSession();

          return {
            Authorization: `Bearer ${session?.access_token}`,
            "x-user-timezone": await getTimezone(),
            "x-user-locale": await getLocale(),
            "x-user-country": await getCountryCode(),
          };
        },
      }),
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === "development" ||
          (opts.direction === "down" && opts.result instanceof Error),
      }),
    ],
  }),
});

export function HydrateClient(props: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {props.children}
    </HydrationBoundary>
  );
}

export function prefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) {
  if (isUiOnlyMode) {
    return;
  }

  const queryClient = getQueryClient();

  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
}

export function batchPrefetch<T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptionsArray: T[],
) {
  if (isUiOnlyMode) {
    return;
  }

  const queryClient = getQueryClient();

  for (const queryOptions of queryOptionsArray) {
    if (queryOptions.queryKey[1]?.type === "infinite") {
      void queryClient.prefetchInfiniteQuery(queryOptions as any);
    } else {
      void queryClient.prefetchQuery(queryOptions);
    }
  }
}
