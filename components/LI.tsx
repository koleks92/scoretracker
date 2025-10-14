import { Limelight } from "next/font/google";

type LIProps = {
    children: React.ReactNode;
    key?: number
    bold?: boolean;
};

function LI({ children, key, bold }: LIProps) {
    return <li key={key} className={bold ? "font-bold" : "font-normal"}>{children}</li>;
};

export default LI;
