const DEFAULT_TIMEOUT = 3000;
const CLASS_NAME = "toast";

export interface ToastOption {
    timeout?: number;
    removable?: boolean;
    bottom?: number;
}

export default function toast(
    message: string,
    { timeout = DEFAULT_TIMEOUT, removable = false, bottom = 24 }: ToastOption = {},
) {
    let removed = false;
    const div = document.createElement("div");
    const removeElement = () => {
        if (removed) {
            return;
        }

        removed = true;
        div.addEventListener(
            "transitionend",
            () => {
                div.remove();
            },
            { once: true },
        );
        div.style.removeProperty("opacity");
        div.style.removeProperty("transform");
    };

    document.querySelectorAll(`.${CLASS_NAME}`).forEach((elt) => elt.remove());

    div.classList.add(CLASS_NAME);
    div.innerText = message;
    div.style.bottom = `${bottom}px`;

    if (removable) {
        const button = document.createElement("button");

        button.classList.add(`${CLASS_NAME}__confirm`);
        button.type = "button";
        button.innerText = "확인";

        button.addEventListener("click", removeElement);

        div.append(button);
    }

    document.body.append(div);
    setTimeout(() => {
        requestAnimationFrame(() => {
            div.style.opacity = "1";
            div.style.transform = "translate3d(0, 0, 0)";

            setTimeout(removeElement, timeout);
        });
    });
}
