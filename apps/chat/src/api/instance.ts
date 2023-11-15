"use server";

import { redirect } from "next/navigation";
import { httpClient, HTTPClient } from "#utils";
import { cookies } from "next/headers";

/**
 * Redirects if the response status is 401.
 */
export const request: HTTPClient<unknown> = httpClient({
    baseUrl: process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    interceptors: {
        request(init) {
            init.headers = {
                ...init.headers,
                Cookie: cookies().toString(),
            };
            return init;
        },
        async response(response) {
            if (response.status === 401) {
                redirect("/login");
            }

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

export const simpleRequest: HTTPClient = httpClient({
    baseUrl: process.env.NEXT_PUBLIC_CHAT_SERVER_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    credentials: "include",
    cache: "no-store",
    interceptors: {
        request(init) {
            init.headers = {
                ...init.headers,
                Cookie: cookies().toString(),
            };
            return init;
        },
    },
});
