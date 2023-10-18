import { useEffect, useRef, useState } from "react";

function parse(value: unknown) {
    if (value == null) {
        return value;
    }

    try {
        return JSON.parse(`${value}`);
    } catch {
        return value;
    }
}

export default function useLocalStorage<T = string>(key: string, initialState?: T) {
    const [state, setState] = useState(initialState as T);
    const mounted = useRef(false);

    useEffect(() => {
        const item = parse(window.localStorage.getItem(key));

        if (item != null && typeof item === typeof initialState) {
            setState(parse(item));
        }

        return () => {
            mounted.current = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [key]);

    useEffect(() => {
        if (mounted.current) {
            window.localStorage.setItem(key, JSON.stringify(state));
        } else {
            mounted.current = true;
        }
    }, [key, state]);

    return [state, setState] as const;
}
