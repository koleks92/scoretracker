import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("@/utils/supabase/server", () => ({
    createSimpleClient: () => ({
        from: (table: string) => ({
            select: () => {
                // Return different data based on the table
                if (table === "Players") {
                    return Promise.resolve({
                        data: [
                            { id: 1, player_name: "Player 1" },
                            { id: 2, player_name: "Player 2" },
                        ],
                        error: null,
                    });
                }

                if (table === "Scores") {
                    return Promise.resolve({
                        data: [
                            {
                                id: 1,
                                player_id: 1,
                                score: 5,
                                created_at: "2025-01-01",
                            },
                            {
                                id: 2,
                                player_id: 2,
                                score: 8,
                                created_at: "2025-01-02",
                            },
                            {
                                id: 3,
                                player_id: 2,
                                score: 5,
                                created_at: "2025-01-02",
                            },
                        ],
                        error: null,
                    });
                }

                // Default fallback
                return Promise.resolve({
                    data: [],
                    error: null,
                });
            },
        }),
    }),
}));

import Page from "@/app/page";

describe("Index page", () => {
    it("renders the page", async () => {
        let container;
        await act(async () => {
            container = await Page(); // Await async component!
        });

        render(container); // Render its result

        expect(screen.getByText("Players Score List")).toBeInTheDocument();
        expect(screen.getByText("Add Player")).toBeInTheDocument();
        expect(screen.getByText("Add Score")).toBeInTheDocument();
    });

    it("Renders the score list", async () => {
        let container;
        await act(async () => {
            container = await Page(); // Await async component!
        });

        render(container); // Render its result

        expect(screen.getByText("Player 1")).toBeInTheDocument();
        expect(screen.getByText("8")).toBeInTheDocument();
        expect(screen.getAllByText("02/01/2025")).toHaveLength(2);
    });
});
