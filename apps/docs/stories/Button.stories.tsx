import { Button, ButtonProps } from "../../../packages/core/src/index";
import { Meta, StoryObj } from "@storybook/react";

const story: Meta<ButtonProps> = {
    component: Button,
    title: "Components/Button",
    parameters: {
        docs: {
            description: {
                component: "버튼입니다.",
            },
        },
    },
};

export default story;

export const StringChildren: StoryObj<ButtonProps> = {
    args: {
        children: "안녕하세요",
    },
};
