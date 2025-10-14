import { createClient } from "../utils/supabase/server";

type Scores = {
    id: number;
    created_at: string;
    score: number;
    player_id: number;
};

export default async function Page() {
    const supabase = await createClient();

    const { data } = await supabase.from("Scores").select("*");

    const scores: Scores[] = data ?? [];

    return (
        <div className="m-4 justify-center">
            <div className="flex justify-center">Players Score List</div>
            <div className="m-6">
                <ul>
                    {scores.map((score) => (
                        <li key={score.id}>
                            {score.created_at} {score.score} {score.player_id}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
