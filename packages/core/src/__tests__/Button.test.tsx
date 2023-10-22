import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../components";

describe("TEST", () => {
    it("Should render button", async () => {
        render(<Button>Click me</Button>);
        expect(await screen.findByText(/Click me/)).not.toBeNull();
    });
});
