"use client";

import { ReactNode, ReactPortal, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { classNames } from "@marshallku/utils";
import Typography from "#components/Typography";
import styles from "./index.module.scss";

const PORTAL_ROOT_ID = "modal";

export type ModalPosition = "top" | "center" | "bottom";

export interface ModalProps {
    position?: ModalPosition;
    title?: string;
    headerChildren?: ReactNode;
    opened: boolean;
    onClose?(): void;
    onOpen?(): void;
    children?: ReactNode;
}

const cx = classNames(styles, "modal");

function Modal({
    position = "bottom",
    title,
    headerChildren,
    opened,
    onClose,
    onOpen,
    children,
}: ModalProps): ReactPortal | null {
    const [revealed, setRevealed] = useState(false);
    const [willRemove, setWillRemove] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    const closeModal = useCallback(
        (cb?: (event: AnimationEvent) => void) => {
            const { current: container } = containerRef;
            const removeModal = () => {
                onClose?.();
                setRevealed(false);
                container?.removeEventListener("animationend", removeModal);
            };

            setWillRemove(true);
            container?.addEventListener("animationend", removeModal);

            if (cb) {
                container?.addEventListener("animationend", cb);
            }
        },
        [onClose],
    );

    useEffect(() => {
        if (opened) {
            onOpen?.();
            setWillRemove(false);
            setRevealed(true);
        } else if (revealed) {
            closeModal();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [opened]);

    if (!revealed) {
        return null;
    }

    return createPortal(
        <dialog className={cx("", `--position-${position}`, `--${willRemove ? "closed" : "opened"}`)} open={revealed}>
            <button
                type="button"
                aria-label="Close modal"
                className={cx("__dimmed")}
                onClick={() => {
                    closeModal();
                }}
            />
            <section className={cx("__container")} ref={containerRef}>
                {title && (
                    <header className={cx("__header")}>
                        <Typography component="h2" fontWeight={500} className={cx("__title")}>
                            {title}
                        </Typography>
                        {headerChildren}
                    </header>
                )}
                <div className={cx("__children")}>{children}</div>
            </section>
        </dialog>,
        document.getElementById(PORTAL_ROOT_ID)!,
    );
}

export default Modal;
