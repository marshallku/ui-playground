import { Icon, IconProps } from "@icon";
import { Meta, StoryObj } from "@storybook/react";
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

export const Default: StoryObj = {
    render() {
        return (
            <div style={{ display: "flex", fontSize: "2rem", gap: 10 }}>
                {icons.map((icon) => (
                    <div key={icon} title={icon}>
                        <Icon name={icon} />
                    </div>
                ))}
            </div>
        );
    },
};
