"use server";

import { cookies, headers } from "next/headers";
import { httpClient, HTTPClient } from "#utils";

const initializeHeaders = (initHeaders?: RequestInit["headers"]) => ({
    "User-Agent": headers().get("User-Agent") ?? "",
    "x-forwarded-for": headers().get("x-forwarded-for") ?? "",
    "x-real-ip": headers().get("x-real-ip") ?? "",
    referer: headers().get("referer") ?? "",
    Cookie: cookies().toString(),
    ...initHeaders,
});

/**
 * Redirects if the response status is 401.
 */
export const request: HTTPClient<unknown> = httpClient({
    baseUrl: process.env.NEXT_PUBLIC_BLOG_ORIGIN,
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    interceptors: {
        request(_, init) {
            init.headers = initializeHeaders(init.headers);
            return init;
        },
        async response(response) {
            try {
                return await response.json();
            } catch {
                // eslint-disable-next-line no-console
                console.error("Failed to parse response body as JSON.");
                return null;
            }
        },
    },
});
