type Function<T extends any[]> = (...args: T) => any;

const DEFAULT_WAIT = 500;

export function fit<T extends any[]>(func: Function<T>) {
    let ticking = false;

    return (...args: T) => {
        if (!ticking) {
            ticking = true;
            requestAnimationFrame(() => {
                func(...args);
                ticking = false;
            });
        }
    };
}

export function throttle<T extends any[]>(func: Function<T>, wait = DEFAULT_WAIT) {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: T) => {
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func(...args);
            }, wait);
        }
    };
}

export function debounce<T extends any[]>(func: Function<T>, wait = DEFAULT_WAIT) {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: T) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, wait);
    };
}

export function onNextRender(func: () => void | Promise<void>) {
    setTimeout(() => {
        requestAnimationFrame(func);
    });
}
