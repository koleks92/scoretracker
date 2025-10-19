import { useState } from "react";

type Option = {
    value: number;
    label: string;
};

type SelectProps = {
    options: Option[];
    value: Option | null;
    onChange: (option: Option | null) => void;
    placeholder?: string;
};

function Selector({
    options,
    value,
    onChange,
    placeholder = "Select...",
}: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option: Option) => {
        onChange(option);
        setIsOpen(false);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    return (
        <div className="relative w-64">
            {/* Selected value display */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border-4 rounded-xl px-4 py-2 cursor-pointer bg-gray-900 flex justify-between items-center hover:border-gray-400"
            >
                <span className={value ? "text-gray-100" : "text-gray-400"}>
                    {value ? value.label : placeholder}
                </span>
                <div className="flex gap-2 items-center">
                    {value && (
                        <button
                            onClick={handleClear}
                            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                        >
                            ×
                        </button>
                    )}
                    <span className="text-gray-500 text-xs">
                        {isOpen ? "▲" : "▼"}
                    </span>
                </div>
            </div>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-gray-900 border-4 rounded-xl shadow-lg overflow-hidden">
                    <div className="max-h-60 overflow-auto">
                        {options.length === 0 ? (
                            <div className="px-4 py-2 text-gray-400">
                                No options
                            </div>
                        ) : (
                            options.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleSelect(option)}
                                    className={`px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                                        value?.value === option.value
                                            ? "bg-gray-700 font-semibold"
                                            : ""
                                    }`}
                                >
                                    {option.label}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {/* Click outside to close */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-0"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
}

// Demo
export default Selector;
