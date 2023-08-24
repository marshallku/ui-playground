import { Icon, IconProps } from "@core";
import { Meta, StoryFn } from "@storybook/react";
import icons from "@marshallku/icon/dist/constants";

const story: Meta<IconProps> = {
    component: Icon,
    title: "Components/Icon",
    parameters: {
        docs: {
            description: {
                component: "ADD_YOUR_DESCRIPTION",
            },
        },
    },
};

export default story;

export const Default: StoryFn = () => (
    <div style={{ display: "flex", fontSize: "2rem", gap: 10 }}>
        {icons.map((icon) => (
            <Icon key={icon} name={icon} />
        ))}
    </div>
);
