"use client";

import { ReactNode, ReactPortal, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { classNames } from "@marshallku/utils";
import Typography from "#components/Typography";
import styles from "./index.module.scss";
import Button from "#components/Button";

const PORTAL_ROOT_ID = "modal";

export type ModalPosition = "top" | "center" | "bottom";

export interface ModalProps {
    /** Position */
    position?: ModalPosition;
    /** Title displayed at the top of Modal */
    title?: string;
    /** Nodes displayed after the title */
    headerChildren?: ReactNode;
    /** State of the Modal */
    opened: boolean;
    /** Text displayed at the confirm button */
    confirmText?: ReactNode;
    /** Text displayed at the cancel button */
    cancelText?: ReactNode;
    /** Function called after the modal closes */
    onClose?(): void;
    /** Function called after the modal opens */
    onOpen?(): void;
    /**
     * Function called before the modal closes
     *
     * If this function returns a falsy value, the modal will not close
     */
    onBeforeClose?(): boolean | void | Promise<boolean> | Promise<void>;
    /** Function called when the confirm button is clicked */
    onConfirm?(): void | (() => void);
    /** Function called when the confirm button is clicked */
    onCancel?(): void;
    children?: ReactNode;
}

const cx = classNames(styles, "modal");

function Modal({
    position = "bottom",
    title,
    headerChildren,
    opened,
    confirmText,
    cancelText,
    onClose,
    onOpen,
    onBeforeClose,
    onConfirm,
    onCancel,
    children,
}: ModalProps): ReactPortal | null {
    const [revealed, setRevealed] = useState(false);
    const [willRemove, setWillRemove] = useState(false);
    const containerRef = useRef<HTMLElement>(null);

    const closeModal = useCallback(
        (cb?: ((event: AnimationEvent) => void) | void) => {
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
                <main className={cx("__children")}>{children}</main>
                {(confirmText || cancelText) && (
                    <footer className={cx("__buttons")}>
                        {cancelText && (
                            <Button
                                onClick={() => {
                                    closeModal();
                                    onCancel?.();
                                }}
                            >
                                {cancelText}
                            </Button>
                        )}
                        {confirmText && (
                            <Button
                                variant="primary"
                                onClick={() => {
                                    if (onBeforeClose != null && !onBeforeClose()) {
                                        return;
                                    }

                                    const callback = onConfirm?.();

                                    closeModal(callback);
                                }}
                            >
                                {confirmText}
                            </Button>
                        )}
                    </footer>
                )}
            </section>
        </dialog>,
        document.getElementById(PORTAL_ROOT_ID)!,
    );
}

export default Modal;
