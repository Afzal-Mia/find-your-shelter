"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

type QueryProviderProps = {
    children: ReactNode;
};

export default function QueryProvider({
    children,
}: QueryProviderProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 1000 * 60 * 5, // prevents unnecessary refetching for relatively static data like property listings.
                        gcTime: 1000 * 60 * 30, // keeps cached data for 10 minutes after it's no longer used.
                        retry: 2, // retries once on failure.
                        refetchOnWindowFocus: false, //  avoids automatic refetches when users switch back to the tab.
                        networkMode: "online",
                        refetchOnReconnect: true,
                    },
                    mutations: {
                        retry: 1, // retries once on failure.
                        networkMode: "online",
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}