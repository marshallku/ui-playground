import Link from "next/link";
import { Button as BaseButton, ButtonProps } from "@marshallku/ui";

function Button<T extends object>(props: ButtonProps<T>) {
    if ("href" in props) {
        return <BaseButton component={Link} {...props} />;
    }

    return <BaseButton {...props} />;
}

export default Button;
