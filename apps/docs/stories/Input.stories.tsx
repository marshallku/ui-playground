import { Input, InputProps } from "@ui";
import { Meta, StoryObj } from "@storybook/react";

const story: Meta<InputProps> = {
    component: Input,
    title: "Input/Input",
    parameters: {
        docs: {
            description: {
                component: "Allows users to input data",
            },
        },
    },
};

export default story;

export const Default: StoryObj<InputProps> = {
    args: {},
};
