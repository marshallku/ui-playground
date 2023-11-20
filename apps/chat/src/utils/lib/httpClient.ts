type FetchParameters = Parameters<typeof fetch>;
type Promiseable<T> = T | Promise<T>;
export type HTTPClient<R = Response> = ReturnType<typeof httpClient<R>>;

export interface HTTPClientOption<T = Response> extends Omit<NonNullable<FetchParameters[1]>, "body"> {
    baseUrl?: string;
    interceptors?: {
        request?(
            input: NonNullable<FetchParameters[0]>,
            init: NonNullable<FetchParameters[1]>,
        ): Promiseable<FetchParameters[1]>;
        response?(response: Response): Promiseable<T>;
    };
}

const applyBaseUrl = (input: FetchParameters[0], baseUrl?: string) => {
    if (!baseUrl) {
        return input;
    }

    if (typeof input === "object" && "url" in input) {
        return new URL(input.url, baseUrl);
    }

    return new URL(input, baseUrl);
};

export default function httpClient<T = Response>({
    baseUrl,
    interceptors = {},
    ...requestInit
}: HTTPClientOption<T> = {}) {
    return async function <R = T extends Response ? Response : T>(
        input: FetchParameters[0],
        init?: FetchParameters[1],
    ): Promise<R> {
        const url = applyBaseUrl(input, baseUrl);
        const option = { ...requestInit, ...init };
        const interceptorAppliedOption = interceptors.request ? await interceptors.request(url, option) : option;
        const response = await fetch(url, interceptorAppliedOption);

        if (interceptors.response) {
            return (await interceptors.response(response)) as R;
        }

        return response as R;
    };
}
