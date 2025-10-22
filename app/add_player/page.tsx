"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function AddPlayer() {
    const [playerName, setPlayerName] = useState<string>("");
    const [message, setMessage] = useState("");
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setMessage("");

        if (playerName != "") {
            const { data: existing } = await supabase
                .from("Players")
                .select("*")
                .eq("player_name", playerName);

            console.log(playerName);

            if (existing && existing.length > 0) {
                setMessage(`${playerName} already exists!`);
                setPlayerName("")
                return;
            }
            const { error } = await supabase
                .from("Players")
                .insert({ player_name: playerName });

            if (error) {
                console.error("Error addig player: ", error);
                setMessage("Failed to add player.");
            } else {
                setMessage(`${playerName} added successfully!`);
            }

            setPlayerName("");
        } else {
            setMessage("Missing player name!");
        }
    };

    return (
        <div className="flex-1 m-4 justify-center align-center">
            <div className="flex m-2 justify-center text-3xl font-bold">
                Add Player
            </div>

            <div className="flex justify-center">
                <a href="/">Go Back</a>
            </div>
            <div className="flex my-20 flex-col items-center">
                <form
                    onSubmit={handleSubmit}
                    className="border p-6 rounded-xl border-4"
                >
                    <div className="my-2 text-center">
                        Enter new player name
                    </div>
                    <div className="my-2">
                        <input
                            className="px-2 py-1"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="text-3xl p-3 rounded-xl transition-transform duration-300 hover:bg-gray-800"
                        >
                            Add Player
                        </button>
                    </div>
                    {message && <div className="text-center">{message}</div>}
                </form>
            </div>
        </div>
    );
}
