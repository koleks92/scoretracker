import Column from "@/components/Column";
import { createClient } from "../utils/supabase/server";
import UL from "@/components/UL";
import LI from "@/components/LI";

type Score = {
    id: number;
    created_at: string;
    score: number;
    player_id: number;
};

type FilteredScore = {
    id: number;
    created_at: string;
    score: number;
    player_name: string;
};

type Player = {
    id: number;
    created_at: string;
    player_name: string;
};

export default async function Page() {
    const supabase = await createClient();

    let scores: Score[] = [];
    let players: Player[] = [];

    const getScores = async () => {
        const { data } = await supabase.from("Scores").select("*");
        if (data) {
            scores = data;
        }
    };

    const getPlayers = async () => {
        const { data } = await supabase.from("Players").select("*");
        if (data) {
            players = data;
        }
    };

    const formatScores = (
        scores: Score[],
        players: Player[]
    ): FilteredScore[] => {
        let formattedScores: FilteredScore[] = [];
        scores.map((score) => {
            // Format date
            const timestamp: string = score.created_at;
            const date: Date = new Date(timestamp);
            const formattedDate = date.toLocaleDateString("en-GB");

            // Format player_id
            const player = players.filter(
                (player) => score.player_id == player.id
            );
            const player_name = player[0].player_name;

            // Add to the array
            formattedScores.push({
                id: score.id,
                created_at: formattedDate,
                score: score.score,
                player_name: player_name,
            });
        });

        return formattedScores;
    };

    await getScores();
    await getPlayers();

    const formattedScores: FilteredScore[] = formatScores(scores, players);

    return (
        <div className="m-4 justify-center">
            <div className="flex justify-center">Players Score List</div>
            <div className="m-6 flex flex-row">
                <div className="flex-1 text-center font-bold">Date</div>
                <div className="flex-1 text-center font-bold">Score</div>
                <div className="flex-1 text-center font-bold">Player</div>
            </div>
            {formattedScores.map((score) => (
                <div className="mx-6 flex flex-row transition-transform duration-300 hover:scale-105 hover:bg-gray-800">
                    <div className="flex-1 text-center">{score.created_at}</div>
                    <div className="flex-1 text-center">{score.score}</div>
                    <div className="flex-1 text-center">
                        {score.player_name}
                    </div>
                </div>
            ))}
        </div>
    );
}
