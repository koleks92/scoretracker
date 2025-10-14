import { createSimpleClient } from "@/utils/supabase/server"


export default function AddPlayer() {
    const supabase = createSimpleClient()

    return (
        <div className="m-6 justify-center align-center">
            Add Player
            <a href="/">Go Back</a>
        </div>
    )
};