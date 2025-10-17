import { createSimpleClient } from "@/utils/supabase/server";

export default function AddScore() {
    const supabase = createSimpleClient();

    return (
        <div className="m-4 justify-center align-center">
            <div className="flex m-2 justify-center text-3xl font-bold">
                Add Score
            </div>
            <div className="flex justify-center">
                <a href="/">Go Back</a>
            </div>

        </div>
    );
}
