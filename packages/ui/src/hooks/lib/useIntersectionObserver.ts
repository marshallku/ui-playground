"use client";

import { useEffect, useState, useRef } from "react";

export default function useIntersectionObserver<T extends HTMLElement>(options?: IntersectionObserverInit) {
    const elementRef = useRef<T | null>(null);
    const [isIntersecting, setIntersecting] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), options);
        const { current: element } = elementRef;

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [elementRef, options]);

    return [elementRef, isIntersecting] as const;
}
