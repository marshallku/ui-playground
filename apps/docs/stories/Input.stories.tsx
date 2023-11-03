import { Input, InputProps } from "@core";
import { Meta, StoryObj } from "@storybook/react";

const story: Meta<InputProps> = {
    component: Input,
    title: "Input/Input",
    parameters: {
        docs: {
            description: {
                component: "ADD_YOUR_DESCRIPTION",
            },
        },
    },
};

export default story;

export const Default: StoryObj<InputProps> = {
    args: {},
};
