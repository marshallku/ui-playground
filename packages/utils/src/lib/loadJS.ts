interface LoadJSOption {
    id?: string;
    crossOrigin?: string;
    defer?: boolean;
    injectInHead?: boolean;
}

export default function loadJS(src: string, { id, crossOrigin, defer, injectInHead }: LoadJSOption = {}) {
    return new Promise<void>((res, rej) => {
        if ((id && document.getElementById(id)) || document.querySelector(`script[src*="${src}"]`)) {
            res();
            return;
        }

        const script = document.createElement("script");
        const setAttribute = <T extends keyof typeof script>(key: T, value?: (typeof script)[T]) => {
            if (value == null) {
                return;
            }

            try {
                script[key] = value;
            } catch {
                script.setAttribute(key, `${value}`);
            }
        };

        setAttribute("id", id);
        setAttribute(defer ? "defer" : "async", true);
        setAttribute("src", src);
        setAttribute("crossOrigin", crossOrigin);

        script.addEventListener(
            "load",
            () => {
                res();
            },
            { once: true },
        );

        script.addEventListener(
            "error",
            () => {
                rej();
            },
            { once: true },
        );

        document[injectInHead ? "head" : "body"].append(script);
    });
}
