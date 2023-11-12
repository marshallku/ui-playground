import { Button, Modal, ModalProps, Typography } from "@ui";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const story: Meta<ModalProps> = {
    component: Modal,
    title: "Modal/Modal",
    parameters: {
        docs: {
            description: {
                component: "Displays popup on screen",
            },
        },
    },
};

export default story;

export const Default: StoryObj<Omit<ModalProps, "opened">> = {
    args: {
        title: "",
        confirmText: "",
        cancelText: "",
    },
    render: function Render(args) {
        const [opened, setOpened] = useState(false);

        return (
            <>
                <Button
                    onClick={() => {
                        setOpened((prev) => !prev);
                    }}
                >
                    Open
                </Button>
                <Modal
                    onClose={() => {
                        setOpened(false);
                    }}
                    {...args}
                    opened={opened}
                >
                    <Typography>Hi there!</Typography>
                </Modal>
            </>
        );
    },
};
