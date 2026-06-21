"use client";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    hasNextPage: boolean;
    isLoading: boolean;
    onLoadMore: () => void;
}

export default function LoadMoreButton({
    hasNextPage,
    isLoading,
    onLoadMore,
}: Props) {
    if (!hasNextPage) return null;

    return (
        <div className="mt-12 flex justify-center">
            <Button
                size="lg"
                onClick={onLoadMore}
                disabled={isLoading}
                className="min-w-44 rounded-full"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                    </>
                ) : (
                    "Load More"
                )}
            </Button>
        </div>
    );
}