import { render, screen, fireEvent } from "@testing-library/react";
import Selector from "@/components/Selector";
import '@testing-library/jest-dom'



describe("Selector Component", () => {
    const mockOptions = [
        { value: 1, label: "Option 1" },
        { value: 2, label: "Option 2" },
    ];

    it("renders with placeholder", () => {
        const mockOnChange = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value={null}
                onChange={mockOnChange}
                placeholder="Select..."
            />
        );

        expect(screen.getByText("Select...")).toBeInTheDocument();
    });

    it("opens dropdown when clicked", () => {
        const mockOnChange = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value={null}
                onChange={mockOnChange}
            />
        );

        const selector = screen.getByText("Select...");
        fireEvent.click(selector);

        expect(screen.getByText("Option 1")).toBeInTheDocument();
        expect(screen.getByText("Option 2")).toBeInTheDocument();
    });

    it("calls onChange when option is selected", () => {
        const mockOnChange = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value={null}
                onChange={mockOnChange}
            />
        );

        fireEvent.click(screen.getByText("Select..."));
        fireEvent.click(screen.getByText("Option 1"));

        expect(mockOnChange).toHaveBeenCalledWith(mockOptions[0]);
    });

    it("displays selected value", () => {
        const mockOnChange = jest.fn();
        render(
            <Selector
                options={mockOptions}
                value={mockOptions[0]}
                onChange={mockOnChange}
            />
        );

        expect(screen.getByText("Option 1")).toBeInTheDocument();
    });
});
