import { Icon, IconProps } from "@ui";
import { Meta, StoryFn } from "@storybook/react";
import icons from "@icon/constants";

const story: Meta<IconProps> = {
    component: Icon,
    title: "Display/Icon",
    parameters: {
        docs: {
            description: {
                component: "Display icons",
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
