import { Button, ButtonProps } from "@core";
import { Meta, StoryObj } from "@storybook/react";

const story: Meta<ButtonProps> = {
    component: Button,
    title: "Components/Button",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Allows for user interaction and can trigger specific actions",
            },
        },
    },
};

export default story;

export const StringChildren: StoryObj<ButtonProps> = {
    args: {
        children: "Click me!",
        disabled: false,
    },
};
