import { useState } from "react";

type Option = {
    value: number;
    label: string;
};

type SelectProp = {
    value: Option | null;
    onChange: (option: Option | null) => void;
};

function ScoreSelector({ value, onChange }: SelectProp) {
    const [selected, setSelected] = useState<Option>({value: 0, label: '0'});

    const handleSelect = (option: Option) => {
        console.log(option);
        setSelected(option);
        onChange(option);
    };

    const options: Option[] = [
        { value: 0, label: "0" },
        { value: 1, label: "1" },
        { value: 2, label: "2" },
        { value: 3, label: "3" },
        { value: 4, label: "4" },
        { value: 5, label: "5" },
        { value: 6, label: "6" },
        { value: 7, label: "7" },
        { value: 8, label: "8" },
        { value: 9, label: "9" },
    ];

    return (
        <div className="flex flex-wrap w-auto">
            {options.map((option) => (
                <div
                    key={option.value}
                    className={`flex m-1 p-2 border-4 rounded-xl hover:border-gray-400 ${
                        selected?.value === option.value
                            ? "bg-gray-700"
                            : "bg-gray-900"
                    }`}
                    onClick={() => {
                        handleSelect(option);
                    }}
                >
                    {option.value}
                </div>
            ))}
        </div>
    );
}

export default ScoreSelector;
