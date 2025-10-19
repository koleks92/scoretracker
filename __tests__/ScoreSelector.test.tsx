import { render, screen, fireEvent } from "@testing-library/react";
import ScoreSelector from "@/components/ScoreSelector";
import "@testing-library/jest-dom";

describe("ScoreSelector Component", () => {
    it("renders object", () => {
        const mockOnChange = jest.fn();
        render(<ScoreSelector value={null} onChange={mockOnChange} />);

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("9")).toBeInTheDocument();
    });

    it("on click gives correct value", () => {
        const mockOnChange = jest.fn();
        render(<ScoreSelector value={null} onChange={mockOnChange} />);

        fireEvent.click(screen.getByText("1"));

        expect(mockOnChange).toHaveBeenCalledWith({ value: 1, label: "1" });

        fireEvent.click(screen.getByText("9"));

        expect(mockOnChange).toHaveBeenCalledWith({ value: 9, label: "9" });
    });
});
