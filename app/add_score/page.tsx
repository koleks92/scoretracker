"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Selector from "@/components/Selector";
import ScoreSelector from "@/components/ScoreSelector";

type Option = {
    value: number;
    label: string;
};

export default function AddScore() {
    const [selectedScore, setSelectedScore] = useState<Option | null>(null);
    const [message, setMessage] = useState<string>("");
    const [selectedPlayer, setSelectedPlayer] = useState<Option | null>(null);

    const [playersList, setPlayersList] = useState<Option[]>([]);

    const supabase = createClient();

    useEffect(() => {
        const getPlayers = async () => {
            const { data, error } = await supabase.from("Players").select("*");

            if (error) {
                console.error("Error fetching players:", error);
            }

            if (data) {
                let formattedData: Option[] = [];
                data.forEach((data) => {
                    formattedData.push({
                        value: data.id,
                        label: data.player_name,
                    });
                });
                setPlayersList(formattedData);
            }
        };

        getPlayers();
    }, []);

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        // Reset the message
        setMessage("");

        if (selectedPlayer && selectedScore) {
            const { data, error } = await supabase.from("Scores").insert({
                score: selectedScore?.value,
                player_id: selectedPlayer?.value,
            });

            if (error) {
                console.error("Error while puting data: ", error);
                setMessage("There was an error. Try again!");
                return;
            }

            setMessage("Score added :)");
        } else {
            if (selectedPlayer) {
                setMessage("Missing score!");
            } else if (selectedScore) {
                setMessage("Missing player!");
            } else {
                setMessage("Missing score and player!");
            }
        }
    };

    return (
        <div className="m-4 justify-center align-center">
            <div className="flex m-2 justify-center text-3xl font-bold">
                Add Score
            </div>
            <div className="flex justify-center">
                <a href="/">Go Back</a>
            </div>
            <div className="flex my-20 flex-col items-center">
                <form
                    onSubmit={handleSubmit}
                    className="border p-6 rounded-xl border-4"
                >
                    <div className="my-2 text-center">Select score</div>
                    <div className="flex justify-center">
                        <ScoreSelector
                            value={selectedScore}
                            onChange={(option) => setSelectedScore(option)}
                        />
                    </div>
                    <div className="my-2 text-center">Select player</div>
                    <div className="flex justify-center">
                        <Selector
                            value={selectedPlayer}
                            options={playersList}
                            onChange={(option) => setSelectedPlayer(option)}
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="text-3xl p-3 rounded-xl transition-transform duration-300 hover:bg-gray-800"
                        >
                            Add new score
                        </button>
                    </div>
                    {message && <div className="text-center">{message}</div>}
                </form>
            </div>
        </div>
    );
}
