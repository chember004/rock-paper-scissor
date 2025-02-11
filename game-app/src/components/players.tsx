"use client";
import React, { useState } from "react";

import { PlayerCard } from "./player-card";
import { ItemType } from "./game";

const Players = ({ mockItems }: { mockItems: ItemType[] }) => {
  const [listPlayers, setListPlayers] = useState([1]);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex gap-6 mt-4">
        <button
          className="p-2 border rounded-lg bg-blue-300 text-white font-extrabold"
          onClick={() =>
            setListPlayers((prev) => [...prev, listPlayers.length + 1])
          }
        >
          Add player
        </button>
        <button
          className="p-2 border rounded-lg bg-red-300 text-gray-700 font-extrabold"
          onClick={() => setListPlayers([])}
        >
          Delete all players
        </button>
      </div>
      <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 xl:grid-rows-3   gap-6">
        {listPlayers.map((id) => (
          <PlayerCard
            key={id}
            playerName={id as number}
            mockItems={mockItems}
          />
        ))}
      </div>
    </div>
  );
};

export default Players;
