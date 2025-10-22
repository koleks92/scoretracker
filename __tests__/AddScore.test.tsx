import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockSelect = jest.fn();
const mockInsert = jest.fn();
const mockEq = jest.fn();

jest.mock("@/utils/supabase/client", () => ({
    createClient: () => ({
        from: () => ({
            select: mockSelect,
            insert: mockInsert,
        }),
    }),
}));

import AddScore from "@/app/add_score/page";

describe("AddScore test", () => {
    beforeEach(() => {
        mockSelect.mockClear();
        mockEq.mockClear();
        mockInsert.mockClear();

        // Default mock for select() - returns players list
        mockSelect.mockReturnValue({
            eq: mockEq,
        });

        // Also make select() directly resolvable for the useEffect call
        mockSelect.mockResolvedValue({
            data: [
                { id: 1, player_name: "Player 1" },
                { id: 2, player_name: "Player 2" },
            ],
            error: null,
        });
    });

    it("Renders", () => {
        render(<AddScore />);
        expect(screen.getByText("Select score")).toBeInTheDocument();
        expect(screen.getByText("Add new score")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("9")).toBeInTheDocument();
        expect(screen.getByText("Select...")).toBeInTheDocument();
        expect(screen.getByText("Go Back")).toBeInTheDocument();
    });

    it("Missing score and player", async () => {
        render(<AddScore />);

        const button = screen.getByRole("button", { name: "Add new score" });
        fireEvent.click(button);

        expect(
            await screen.findByText("Missing score and player!")
        ).toBeInTheDocument();
    });

    it("Missing score", async () => {
        render(<AddScore />);

        const selector = await screen.findByText("Select...");
        fireEvent.click(selector);

        const selectPlayer = await screen.findByText("Player 1");
        fireEvent.click(selectPlayer);

        const button = screen.getByRole("button", { name: "Add new score" });
        fireEvent.click(button);

        expect(await screen.findByText("Missing score!")).toBeInTheDocument();
    });

    it("Missing player", async () => {
        render(<AddScore />);

        const selector = await screen.findByText("2");
        fireEvent.click(selector);

        const button = screen.getByRole("button", { name: "Add new score" });
        fireEvent.click(button);

        expect(await screen.findByText("Missing player!")).toBeInTheDocument();
    });

    it("Success!", async () => {
        // Mock: Insert succeeds
        mockInsert.mockResolvedValue({
            data: null,
            error: null,
        });
        
        render(<AddScore />);

        const selectorPlayer = await screen.findByText("Select...");
        fireEvent.click(selectorPlayer);

        const selectPlayer = await screen.findByText("Player 1");
        fireEvent.click(selectPlayer);

        const selectorNumber = await screen.findByText("2");
        fireEvent.click(selectorNumber);

        const button = screen.getByRole("button", { name: "Add new score" });
        fireEvent.click(button);

        expect(await screen.findByText("Score added :)")).toBeInTheDocument();
    });
});
