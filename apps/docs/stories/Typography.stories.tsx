import { Typography, TypographyProps } from "@core";
import { Meta, StoryObj } from "@storybook/react";

const story: Meta<TypographyProps> = {
    component: Typography,
    title: "Components/Typography",
    tags: ["autodocs"],
    parameters: {
        docs: {
            description: {
                component: "Ensure fonts are rendered consistently and legibly across the app",
            },
        },
    },
    argTypes: {
        variant: {
            control: "select",
            options: ["h1", "h2", "h3", "h4", "h5", "h6", "b1", "b2", "c1"],
            defaultValue: "b1",
        },
        fontWeight: {
            control: "select",
            options: [100, 200, 300, 400, 500, 600, 700, 800, 900],
            defaultValue: 400,
        },
        marginTop: {
            control: {
                type: "range",
                min: 2,
                max: 32,
            },
            defaultValue: 16,
            description: "You can also set this to `false` to remove margin",
        },
        marginBottom: {
            control: {
                type: "range",
                min: 2,
                max: 32,
            },
            defaultValue: 16,
            description: "You can also set this to `false` to remove margin",
        },
    },
};

export default story;

export const Default: StoryObj<TypographyProps> = {
    args: {
        variant: "b1",
        fontWeight: 400,
        children: "Hello world!",
    },
};
