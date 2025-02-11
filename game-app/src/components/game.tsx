"use client";
import React, { useState } from "react";
import ItemTypes from "./items";
import Players from "./players";
import { IItem } from "@/lib/rock-paper-scissor-prototype";
const mock_items = [
  { id: "rock", name: "Rock", strengths: ["scissor"], weaknesses: ["paper"] },
  {
    id: "paper",
    name: "Paper",
    strengths: ["rock"],
    weaknesses: ["scissor"],
  },
  {
    id: "scissor",
    name: "Scissor",
    strengths: ["paper"],
    weaknesses: ["rock"],
  },
];

export type ItemType = IItem & {
  id: string;
};

const Game = () => {
  const [mockItems, setItems] = useState<ItemType[]>(mock_items);
  const handlerItems = (data: ItemType) => {
    console.log("new data", data);
    console.log("prev items", mockItems);
    setItems((prev) => [...prev, data]);
    console.log("new items", mockItems);
  };

  return (
    <div className="flex flex-col gap-10 w-full md:flex-row">
      <ItemTypes handlerItems={handlerItems} mockItems={mockItems} />
      <Players mockItems={mockItems} />
    </div>
  );
};

export default Game;
