import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockEq = jest.fn();
const mockInsert = jest.fn();

jest.mock("@/utils/supabase/client", () => ({
    createClient: () => ({
        from: () => ({
            select: () => ({
                eq: mockEq,
            }),
            insert: mockInsert,
        }),
    }),
}));

import AddPlayer from "@/app/add_player/page";

describe("Add Player page and functions", () => {
    beforeEach(() => {
        // Reset mocks before each test
        mockEq.mockClear();
        mockInsert.mockClear();
    });

    it("Renders", () => {
        render(<AddPlayer />);
        expect(screen.getByText("Enter new player name")).toBeInTheDocument();
        expect(screen.getByText("Go Back")).toBeInTheDocument();
    });

    it("Missing player name", async () => {
        render(<AddPlayer />);

        const button = screen.getByRole("button", { name: "Add Player" });
        fireEvent.click(button);

        expect(
            await screen.findByText("Missing player name!")
        ).toBeInTheDocument();
    });

    it("Player already exist", async () => {
        mockEq.mockResolvedValue({
            data: [{ id: 1, player_name: "Player 1" }],
            error: null,
        });

        render(<AddPlayer />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Player 1" } });

        const button = screen.getByRole("button", { name: "Add Player" });
        fireEvent.click(button);

        expect(
            await screen.findByText("Player 1 already exists!")
        ).toBeInTheDocument();
    });

    it("Player added sucessfully", async () => {
        // Mock: Player does NOT exist (empty array)
        mockEq.mockResolvedValue({
            data: [],
            error: null,
        });

        // Mock: Insert succeeds
        mockInsert.mockResolvedValue({
            data: null,
            error: null,
        });

        render(<AddPlayer />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "Player Test" } });

        const button = screen.getByRole("button", { name: "Add Player" });
        fireEvent.click(button);

        expect(
            await screen.findByText("Player Test added successfully!")
        ).toBeInTheDocument();
    });
});
